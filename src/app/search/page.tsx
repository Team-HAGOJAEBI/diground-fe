"use client";

import { useMemo, useState } from "react";

// Configuration Constants - 설정값들을 상단으로 이동하여 가독성 향상
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;
const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;
const REQUEST_INTERVAL_MS = 250 as const;

// Audio Duration Limits - 매직 넘버를 상수로 분리
const MINIMUM_AUDIO_DURATION_SECONDS = 45;
const MAXIMUM_AUDIO_DURATION_SECONDS = 600;

// Scoring Thresholds - 점수 임계치들을 상수로 분리
const AUTOMATIC_MATCH_THRESHOLD = 0.82;
const BORDERLINE_MATCH_THRESHOLD = 0.65;
const TITLE_SIMILARITY_WEIGHT = 0.48;
const ARTIST_SIMILARITY_WEIGHT = 0.48;
const BASE_SCORE_BONUS = 0.04;
const NEGATIVE_PENALTY_SCORE = 0.15;
const KOREAN_TITLE_WEIGHT = 0.75;
const ENGLISH_TITLE_WEIGHT = 0.25;

// Type Definitions - 타입 정의들을 논리적 그룹으로 분류
interface YouTubeSnippet {
  title: string;
  description: string;
  videoOwnerChannelTitle?: string;
}

interface YouTubeContentDetails {
  duration?: string; // ISO8601 format (e.g. PT3M42S)
}

interface YouTubePlaylistItem {
  snippet: YouTubeSnippet;
  contentDetails?: YouTubeContentDetails;
}

interface SongInformation {
  title: string;
  artist: string;
}

interface KakaoWebDocument {
  url: string;
  title: string;
}

interface MelonCandidate {
  songId: string;
  title: string;
  url: string;
}

interface ParsedMelonTitle {
  title: string;
  artist: string;
}

interface MatchResult {
  automatic: boolean;
  borderline: boolean;
  topCandidate?: any;
  rankedCandidates?: any[];
}

interface SearchResultRow {
  youtubeTitle: string;
  songInformation?: SongInformation;
  queryTried?: string;
  melonCandidates?: MelonCandidate[];
  matchResult?: MatchResult;
  errorMessage?: string;
}

// Regular Expression Constants - 정규식들을 상수로 분리하고 의미있는 이름 부여
const EXCLUDE_VIDEO_CONTENT_REGEX = /(mv|뮤직비디오|live|fancam|stage|lyrics?|가사|teaser|shorts?|교차편집)/i;
const NEGATIVE_SCORING_KEYWORDS_REGEX =
  /(live|fancam|stage\s*mix|stage|inst(?:rumental)?|remix|lyrics?|가사|teaser|shorts?)/i;
const ARTIST_FEATURING_REGEX = /\b(feat|featuring|ft)\.?[\s:]*[^,()/]+/gi;
const ARTIST_TOPIC_SUFFIX_REGEX = /-?\s*topic$/i;
const BRACKET_CONTENT_REGEX = /[()\[\]{}]/g; /// \s*[\(\[\{][\)\]\}]\s*/g;
const PUNCTUATION_TO_SPACE_REGEX = /[,\uFF0C;\/\\|]+/g;
const EDGE_JUNK_CHARACTERS_REGEX = /^[·•:;,\-–]+|[·•:;,\-–]+$/g;

// Utility Functions
const delay = (milliseconds: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, milliseconds));

/**
 * ISO8601 duration을 초 단위로 변환 (예: PT3M42S → 222초)
 */
function convertIsoToSeconds(isoDuration?: string): number {
  if (!isoDuration) return 0;

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const hours = Number(match?.[1] || 0);
  const minutes = Number(match?.[2] || 0);
  const seconds = Number(match?.[3] || 0);

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * 검색 쿼리용 텍스트 정규화
 * - 따옴표 통일, 특수문자 정리, 공백 정리
 */
function normalizeQueryText(text: string): string {
  // console.log("🌀🌀🌀normalizeQueryText = ", text);

  return (text || "")
    .replace(/["""'']/g, "'") // 다양한 따옴표를 일반 따옴표로 통일
    .replace(/[·•]/g, " ") // 중점 기호들을 공백으로 변환
    .replace(/\s+/g, " ") // 연속된 공백을 하나로 압축
    .replace(/\s*,\s*/g, ",") // 쉼표 주변 공백 정리
    .replace(/,\s*$/g, "") // 문자열 끝의 쉼표 제거
    .trim();
}

/**
 * 괄호 안의 보조 표기 제거
 */
function removeBracketContent(text: string): string {
  return (text || "").replace(BRACKET_CONTENT_REGEX, "").replace(/\s+/g, " ").trim();
}

/**
 * 스코어링용 텍스트 정규화
 * - 발음 기호 제거, 대소문자 통일 등 정확한 비교를 위한 처리
 */
function normalizeForScoring(text: string): string {
  return (text || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "") // 발음 기호(다이어크리틱) 제거
    .replace(/["""'']/g, "'")
    .replace(/[·•]/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * 한글 텍스트만 추출
 */
function extractKoreanText(text: string): string {
  const matches = (text || "").match(/[가-힣\s''&·.,!?：:()-]+/g);

  return (matches || [])
    .join(" ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * 영문 텍스트만 추출
 */
function extractEnglishText(text: string): string {
  const matches = (text || "").match(/[A-Za-z0-9\s''&·.,!?():-]+/g);

  return (matches || [])
    .join(" ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * 제목을 한글과 영문으로 분리
 */
function splitKoreanAndEnglishTitle(title: string): { korean: string; english: string } {
  const korean = extractKoreanText(title);
  const restText = (title || "").replace(/[가-힣]/g, " ");
  const english = extractEnglishText(restText);

  return { korean, english };
}

/**
 * 아티스트명에 한글이 포함되어 있는지 확인
 */
function isKoreanArtist(artistName: string): boolean {
  return /[가-힣]/.test(artistName);
}

/**
 * 검색 쿼리용 아티스트명 정리
 * - 피처링 정보 제거, Topic 접미사 제거 등
 */
function sanitizeArtistForQuery(artistName: string): string {
  const withoutBrackets = removeBracketContent(artistName);
  let cleaned = withoutBrackets.replace(ARTIST_FEATURING_REGEX, ""); // feat. 관련 텍스트 제거

  cleaned = cleaned.replace(ARTIST_TOPIC_SUFFIX_REGEX, ""); // "- Topic" 접미사 제거
  cleaned = cleaned.replace(PUNCTUATION_TO_SPACE_REGEX, " "); // 구두점을 공백으로 변환
  cleaned = normalizeQueryText(cleaned)
    .replace(/\s{2,}/g, " ")
    .trim();

  return cleaned;
}

/**
 * 검색 쿼리용 제목 정리
 */
function sanitizeTitleForQuery(title: string): {
  koreanOnly: string;
  englishOnly: string;
  recombined: string;
} {
  // console.log("🔥sanitizeTitleForQuery");
  const normalized = normalizeQueryText(title);
  const withoutBrackets = removeBracketContent(extractKoreanText(normalized) || normalized);
  const withoutPunctuation = withoutBrackets.replace(PUNCTUATION_TO_SPACE_REGEX, " ");
  const trimmedEdges = withoutPunctuation.replace(EDGE_JUNK_CHARACTERS_REGEX, " ");
  const compacted = trimmedEdges.replace(/\s{2,}/g, " ").trim();

  // console.log("🔔compacted = ", compacted);

  return {
    koreanOnly: extractKoreanText(compacted),
    englishOnly: extractEnglishText(compacted),
    recombined: normalizeQueryText(compacted),
  };
}

/**
 * 키워드를 큰따옴표로 감싸서 정확한 검색을 위한 처리
 */
function wrapWithQuotes(keyword: string): string {
  const compacted = keyword
    .replace(/\s{2,}/g, " ")
    .replace(/[()\[\]{}_\-]/g, "")
    .trim();

  return `"${compacted}"`;
}

/**
 * YouTube 공식 음원 여부 판단
 * - 길이 제한, 제목 키워드 필터링, 채널명 확인 등
 */
function isOfficialAudioTrack(item: YouTubePlaylistItem): boolean {
  const title = (item.snippet.title || "").toLowerCase();
  const description = (item.snippet.description || "").toLowerCase();
  const channelOwner = (item.snippet.videoOwnerChannelTitle || "").toLowerCase();
  const audioDurationSeconds = convertIsoToSeconds(item.contentDetails?.duration);

  // 길이 제한: 45초 미만이거나 10분 초과시 제외
  if (
    audioDurationSeconds &&
    (audioDurationSeconds < MINIMUM_AUDIO_DURATION_SECONDS || audioDurationSeconds > MAXIMUM_AUDIO_DURATION_SECONDS)
  ) {
    return false;
  }

  // 뮤직비디오, 라이브 등 제외
  if (EXCLUDE_VIDEO_CONTENT_REGEX.test(title)) {
    return false;
  }

  // Topic 채널이거나 YouTube Music에서 제공하는 공식 음원
  if (/- topic$/.test(channelOwner)) {
    return true;
  }

  if (description.startsWith("provided to youtube by")) {
    return true;
  }

  return false;
}

/**
 * YouTube 설명에서 곡 정보 추출
 */
function extractSongInfoFromDescription(description: string): SongInformation | null {
  if (!description) return null;

  const lines = (description || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const providedLineIndex = lines.findIndex((line) => /^Provided to Youtube by/i.test(line));

  if (providedLineIndex === -1) return null;

  // 메타데이터 라인들을 제외하고 실제 곡 정보가 있는 라인들만 추출
  const candidateLines = lines
    .slice(providedLineIndex + 1, providedLineIndex + 7)
    .filter(
      (line) => !/^(released on|auto-generated by youtube|℗|composer|lyricist|arranger|music\s+publisher)/i.test(line)
    );

  // console.log("🍀candidateLines", candidateLines);
  // 케이스 1: "제목 · 아티스트" 형태
  const dottedLine = candidateLines.find((line) => line.includes("·"));

  if (dottedLine) {
    const [title, ...artistParts] = dottedLine.split("·");
    const titleText = (title || "").trim();
    const artistText = artistParts.join("·").trim();

    // console.log("🍀titleText", titleText);
    // console.log("🍀artistText", artistText);

    if (titleText && artistText) {
      return { title: titleText, artist: artistText };
    }
  }

  // 케이스 2: 두 줄로 분리된 형태 (첫 번째 줄: 제목, 두 번째 줄: 아티스트)
  if (candidateLines.length >= 2) {
    const [title, artist] = candidateLines;

    if (title && artist) {
      return { title, artist };
    }
  }

  return null;
}

/**
 * 멜론 검색 쿼리 생성
 * - 우선순위에 따른 다양한 검색 쿼리 조합 생성
 */
function buildMelonSearchQueries(
  rawTitle: string,
  rawArtist: string
): {
  artistStrictQueries: string[];
  strictQueries: string[];
  artistLooseQueries: string[];
  looseQueries: string[];
} {
  const originalTitle = normalizeQueryText(rawTitle);

  // console.log("🐻🐻🐻originalTitle ----> ", originalTitle);
  const originalArtist = normalizeQueryText(rawArtist);

  const { koreanOnly, englishOnly, recombined } = sanitizeTitleForQuery(originalTitle);
  const artistWithoutBrackets = removeBracketContent(originalArtist);
  const artistSanitized = sanitizeArtistForQuery(originalArtist);
  const artistSanitizedWithoutBrackets = sanitizeArtistForQuery(artistWithoutBrackets);

  const { korean, english } = splitKoreanAndEnglishTitle(originalTitle);
  const isKoreanSinger = isKoreanArtist(originalArtist);

  // 아티스트 변형들 (정리 단계별)
  const artistVariants = Array.from(
    new Set([originalArtist, artistWithoutBrackets, artistSanitized, artistSanitizedWithoutBrackets].filter(Boolean))
  );

  const artistPriorityQueries: string[] = [];
  const otherQueries: string[] = [];

  // 우선순위 1: 아티스트 + 한글 제목 (가장 높은 정확도 기대)
  if (koreanOnly) {
    for (const artist of artistVariants) {
      artistPriorityQueries.push(wrapWithQuotes(`${artist} ${koreanOnly}`));
    }
  }

  // 우선순위 2: 아티스트 + 영문 제목
  if (englishOnly) {
    for (const artist of artistVariants) {
      artistPriorityQueries.push(wrapWithQuotes(`${artist} ${englishOnly}`));
    }
  }

  // 우선순위 3: 아티스트 + 혼합 제목
  if (recombined) {
    for (const artist of artistVariants) {
      artistPriorityQueries.push(wrapWithQuotes(`${artist} ${recombined}`));
    }
  }

  // 폴백 쿼리들 (검색 실패시를 위한 보조 쿼리들)
  otherQueries.push(wrapWithQuotes(`${originalArtist} ${originalTitle}`));

  if (korean) otherQueries.push(wrapWithQuotes(korean));
  if (korean && english) otherQueries.push(wrapWithQuotes(`${korean} ${english}`));
  if (!korean && english) otherQueries.push(wrapWithQuotes(english));
  if (korean && !isKoreanSinger) otherQueries.push(wrapWithQuotes(english));

  // 아티스트 포함 보조 쿼리
  if (korean) {
    otherQueries.push(wrapWithQuotes(`${originalArtist} ${korean}`));
    otherQueries.push(wrapWithQuotes(`${artistWithoutBrackets} ${korean}`));
  }
  if (english) {
    otherQueries.push(wrapWithQuotes(`${originalArtist} ${english}`));
    otherQueries.push(wrapWithQuotes(`${artistWithoutBrackets} ${english}`));
  }

  // 괄호 제거된 제목 관련 쿼리
  const titleWithoutBrackets = removeBracketContent(originalTitle);

  if (titleWithoutBrackets && titleWithoutBrackets !== originalTitle) {
    otherQueries.push(wrapWithQuotes(titleWithoutBrackets));
    otherQueries.push(wrapWithQuotes(`${titleWithoutBrackets} ${originalArtist}`));
    otherQueries.push(wrapWithQuotes(`${titleWithoutBrackets} ${artistWithoutBrackets}`));
  }

  // 중복 제거
  const deduplicatedArtistQueries = Array.from(new Set(artistPriorityQueries.map(normalizeQueryText))).filter(Boolean);
  const deduplicatedOtherQueries = Array.from(new Set(otherQueries.map(normalizeQueryText))).filter(Boolean);

  // site: 필터 적용하여 최종 쿼리 생성
  const artistStrictQueries = deduplicatedArtistQueries.map((query) => `${query} site:melon.com/song`);
  const artistLooseQueries = deduplicatedArtistQueries.map((query) => `${query} site:melon.com`);
  const strictQueries = deduplicatedOtherQueries.map((query) => `${query} site:melon.com/song`);
  const looseQueries = deduplicatedOtherQueries.map((query) => `${query} site:melon.com`);

  return { artistStrictQueries, strictQueries, artistLooseQueries, looseQueries };
}

/**
 * 카카오 웹 검색 API 호출
 */
async function searchKakaoWeb(query: string): Promise<{ documents: KakaoWebDocument[] }> {
  const searchUrl = `https://dapi.kakao.com/v2/search/web?query=${encodeURIComponent(query)}&size=10&sort=accuracy`;
  const response = await fetch(searchUrl, {
    headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
  });

  if (!response.ok) {
    throw new Error(`Kakao API Error: ${response.status}`);
  }

  return await response.json();
}

/**
 * 멜론 URL에서 songId 추출
 */
function extractSongIdFromUrl(urlString: string): string {
  try {
    const url = new URL(urlString);
    const songId = url.searchParams.get("songId");

    if (songId && /^\d+$/.test(songId)) {
      return songId;
    }
  } catch {
    // URL 파싱 실패시 정규식으로 대체
  }

  const match = urlString.match(/songId=(\d+)/);

  return match?.[1] || "";
}

/**
 * 카카오 검색 결과를 멜론 후보로 변환
 */
function convertToMelonCandidates(documents: KakaoWebDocument[]): MelonCandidate[] {
  const candidates = documents
    .filter((document) => /melon\.com\/song/.test(document.url))
    .map((document) => ({
      songId: extractSongIdFromUrl(document.url),
      title: document.title.replace(/<[^>]+>/g, ""), // HTML 태그 제거
      url: document.url,
    }))
    .filter((candidate) => candidate.songId);

  // songId 기준으로 중복 제거
  const uniqueCandidates: Record<string, MelonCandidate> = {};

  for (const candidate of candidates) {
    if (!uniqueCandidates[candidate.songId]) {
      uniqueCandidates[candidate.songId] = candidate;
    }
  }

  return Object.values(uniqueCandidates);
}

/**
 * 폴백 전략을 사용한 멜론 검색
 * - 우선순위에 따라 단계적으로 검색 시도
 */
async function searchMelonWithFallback(
  rawTitle: string,
  rawArtist: string
): Promise<{ queryTried: string; melonCandidates: MelonCandidate[] }> {
  const { artistStrictQueries, strictQueries, artistLooseQueries, looseQueries } = buildMelonSearchQueries(
    rawTitle,
    rawArtist
  );

  // console.log("🍀artistStrictQueries", artistStrictQueries);
  // console.log("🍀strictQueries", strictQueries);
  // console.log("🍀artistLooseQueries", artistLooseQueries);
  // console.log("🍀looseQueries", looseQueries);

  // 1단계: 아티스트 포함 엄격 검색
  for (const query of artistStrictQueries) {
    try {
      const data = await searchKakaoWeb(query);
      const melonCandidates = convertToMelonCandidates(data.documents);

      if (melonCandidates.length) {
        return { queryTried: query, melonCandidates };
      }
    } catch (error) {
      console.error("[Kakao Strict/Artist] error:", query, error);
    }
    await delay(REQUEST_INTERVAL_MS);
  }

  // 2단계: 기타 엄격 검색
  for (const query of strictQueries) {
    try {
      const data = await searchKakaoWeb(query);
      const melonCandidates = convertToMelonCandidates(data.documents);

      if (melonCandidates.length) {
        return { queryTried: query, melonCandidates };
      }
    } catch (error) {
      console.error("[Kakao Strict/Other] error:", query, error);
    }
    await delay(REQUEST_INTERVAL_MS);
  }

  // 3단계: 아티스트 포함 느슨한 검색
  for (const query of artistLooseQueries) {
    try {
      const data = await searchKakaoWeb(query);
      const melonCandidates = convertToMelonCandidates(data.documents);

      if (melonCandidates.length) {
        return { queryTried: `${query} (loose)`, melonCandidates };
      }
    } catch (error) {
      console.error("[Kakao Loose/Artist] error:", query, error);
    }
    await delay(REQUEST_INTERVAL_MS);
  }

  // 4단계: 기타 느슨한 검색
  for (const query of looseQueries) {
    try {
      const data = await searchKakaoWeb(query);
      const melonCandidates = convertToMelonCandidates(data.documents);

      if (melonCandidates.length) {
        return { queryTried: `${query} (loose)`, melonCandidates };
      }
    } catch (error) {
      console.error("[Kakao Loose/Other] error:", query, error);
    }
    await delay(REQUEST_INTERVAL_MS);
  }

  return {
    queryTried: artistStrictQueries.at(-1) || "",
    melonCandidates: [],
  };
}

/**
 * 텍스트를 토큰 집합으로 변환 (유사도 계산용)
 */
function convertToTokenSet(text: string): Set<string> {
  return new Set(
    normalizeForScoring(text)
      .split(/[\s/]+/)
      .filter(Boolean)
  );
}

/**
 * 자카드 유사도 계산 (교집합 / 합집합)
 */
function calculateJaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (!setA.size || !setB.size) return 0;

  let intersectionCount = 0;

  setA.forEach((token) => {
    if (setB.has(token)) intersectionCount++;
  });

  const unionSize = new Set([...setA, ...setB]).size;

  return intersectionCount / unionSize;
}

/**
 * 멜론 검색 결과 제목 파싱 ("제목 - 아티스트" 형태 가정)
 */
function parseMelonDisplayTitle(melonTitle: string): ParsedMelonTitle {
  const cleanedText = (melonTitle || "")
    .replace(/<[^>]+>/g, "") // HTML 태그 제거
    .replace(/&amp;/g, "&") // HTML 엔티티 변환
    .trim();

  const parts = cleanedText.split(/\s-\s/);

  if (parts.length >= 2) {
    const artist = parts.pop()!.trim();
    const title = parts.join(" - ").trim();

    return { title, artist };
  }

  return { title: cleanedText, artist: "" };
}

/**
 * 후보 곡의 매칭 점수 계산
 */
function calculateCandidateScore(
  youtubeSong: SongInformation,
  melonCandidate: Pick<MelonCandidate, "title">
): {
  score: number;
  parts: {
    titleSimilarity: number;
    artistSimilarity: number;
    negativePenalty: number;
    parsed: ParsedMelonTitle;
  };
} {
  const parsed = parseMelonDisplayTitle(melonCandidate.title);

  // 제목 유사도 계산 (한글 가중치 높게, 영어 보조)
  const youtubeKoreanEnglish = splitKoreanAndEnglishTitle(youtubeSong.title);
  const melonKoreanEnglish = splitKoreanAndEnglishTitle(parsed.title);

  const titleKoreanSimilarity = calculateJaccardSimilarity(
    convertToTokenSet(youtubeKoreanEnglish.korean),
    convertToTokenSet(melonKoreanEnglish.korean)
  );
  const titleEnglishSimilarity = calculateJaccardSimilarity(
    convertToTokenSet(youtubeKoreanEnglish.english),
    convertToTokenSet(melonKoreanEnglish.english)
  );

  const titleSimilarity = Math.max(
    KOREAN_TITLE_WEIGHT * titleKoreanSimilarity + ENGLISH_TITLE_WEIGHT * titleEnglishSimilarity,
    calculateJaccardSimilarity(convertToTokenSet(youtubeSong.title), convertToTokenSet(parsed.title))
  );

  // 아티스트 유사도 계산
  const artistSimilarity = calculateJaccardSimilarity(
    convertToTokenSet(youtubeSong.artist),
    convertToTokenSet(parsed.artist)
  );

  // 라이브/리믹스 등 버전 차이로 인한 감점
  const negativePenalty = NEGATIVE_SCORING_KEYWORDS_REGEX.test(parsed.title) ? NEGATIVE_PENALTY_SCORE : 0;

  // 최종 점수 계산 (0~1 범위로 정규화)
  const score = Math.max(
    0,
    Math.min(
      1,
      TITLE_SIMILARITY_WEIGHT * titleSimilarity +
        ARTIST_SIMILARITY_WEIGHT * artistSimilarity +
        BASE_SCORE_BONUS -
        negativePenalty
    )
  );

  return {
    score,
    parts: {
      titleSimilarity,
      artistSimilarity,
      negativePenalty,
      parsed,
    },
  };
}

/**
 * 후보들을 점수순으로 정렬하고 자동 매칭 여부 결정
 */
function rankAndSelectBestMatch(
  youtubeSong: SongInformation,
  melonCandidates: MelonCandidate[]
): {
  topCandidate: any;
  automatic: boolean;
  borderline: boolean;
  rankedCandidates: any[];
} {
  const rankedCandidates = melonCandidates
    .map((candidate) => ({
      ...candidate,
      ...calculateCandidateScore(youtubeSong, candidate),
    }))
    .sort((a, b) => b.score - a.score);

  const topCandidate = rankedCandidates[0];
  const automatic = topCandidate && topCandidate.score >= AUTOMATIC_MATCH_THRESHOLD;
  const borderline = topCandidate && topCandidate.score >= BORDERLINE_MATCH_THRESHOLD && !automatic;

  return { topCandidate, automatic, borderline, rankedCandidates };
}

function applyToPlatform(songId: string, platform: string) {
  let url = "";

  if (platform === "melon") {
    url = `melonapp://play?cType=1&cList=${songId}`;
  }
  // } else if (platform === "appleMusic") {
  //   return `applemusic://play?menuid=0&ctype=1&cid=${songId}`;
  // } else if (platform === "spotify") {
  //   return `spotify://play?menuid=0&ctype=1&cid=${songId}`;
  // } else {
  //   return `melonapp://play?menuid=0&ctype=1&cid=${songId}`;
  // }

  window.open(url, "_blank");
}

export default function YouTubeMelonSearchPage() {
  const [playlistLink, setPlaylistLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultRow[]>([]);

  // 상위 후보들의 songId를 집계하여 쉼표로 구분된 문자열 생성
  const aggregatedSongIds = useMemo(
    () =>
      searchResults
        .map((result) => result.matchResult?.topCandidate?.songId)
        .filter(Boolean)
        .join(","),
    [searchResults]
  );

  /**
   * YouTube 플레이리스트에서 곡 정보를 가져와 멜론과 매칭하는 메인 처리 함수
   */
  async function handleFetchAndMatchPlaylist() {
    if (!playlistLink) {
      return alert("플레이리스트 링크를 입력하세요.");
    }

    setIsLoading(true);
    setSearchResults([]);

    try {
      // YouTube 플레이리스트 ID 추출
      const playlistId = new URL(playlistLink).searchParams.get("list") || "";

      if (!playlistId) {
        return alert("올바른 YouTube 플레이리스트 링크가 아닙니다. (?list=... 형태여야 합니다)");
      }

      // YouTube API 호출을 위한 URL 구성
      const youtubeApiUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");

      youtubeApiUrl.searchParams.set("part", "snippet,contentDetails");
      youtubeApiUrl.searchParams.set("maxResults", "50");
      youtubeApiUrl.searchParams.set("playlistId", playlistId);
      youtubeApiUrl.searchParams.set("key", YOUTUBE_API_KEY);

      // YouTube API 호출
      const youtubeResponse = await fetch(youtubeApiUrl.toString());

      if (!youtubeResponse.ok) {
        throw new Error(`YouTube API 오류: ${youtubeResponse.status}`);
      }

      const youtubeData = await youtubeResponse.json();
      const playlistItems: YouTubePlaylistItem[] = youtubeData?.items || [];

      // 공식 음원만 필터링
      const officialAudioTracks = playlistItems.filter(isOfficialAudioTrack);
      const processedResults: SearchResultRow[] = [];

      // console.log("🍀officialAudioTracks", officialAudioTracks);
      // 각 공식 음원에 대해 멜론 매칭 수행
      for (const audioTrack of officialAudioTracks) {
        const { title: youtubeTitle, description: rawDescription } = audioTrack.snippet;

        // YouTube 설명에서 곡 정보 추출
        const songInfo = extractSongInfoFromDescription(rawDescription);

        if (!songInfo) {
          processedResults.push({
            youtubeTitle,
            errorMessage: "곡 제목과 아티스트 정보를 추출할 수 없습니다",
          });
          continue;
        }

        // console.log("🍀songInfo", songInfo);
        try {
          // 멜론 검색 (폴백 전략 사용)
          const { melonCandidates, queryTried } = await searchMelonWithFallback(songInfo.title, songInfo.artist);

          // 13:47 요까지~~~~
          // console.log("🍀melonCandidates", melonCandidates);
          // console.log("🍀queryTried", queryTried);
          // 후보 점수 계산 및 순위 결정
          const matchResult = rankAndSelectBestMatch(songInfo, melonCandidates);

          processedResults.push({
            youtubeTitle,
            songInformation: songInfo,
            queryTried,
            melonCandidates,
            matchResult: {
              automatic: matchResult.automatic,
              borderline: matchResult.borderline,
              topCandidate: matchResult.topCandidate,
              rankedCandidates: matchResult.rankedCandidates.slice(0, 5), // 상위 5개만 표시
            },
          });
        } catch (error) {
          console.error(`멜론 검색 중 오류 발생:`, error);
          processedResults.push({
            youtubeTitle,
            songInformation: songInfo,
            errorMessage: `멜론 검색 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`,
          });
        }

        // API 호출 간격 조절 (Rate Limit 방지)
        await delay(REQUEST_INTERVAL_MS);
      }

      setSearchResults(processedResults);
    } catch (error: any) {
      console.error("플레이리스트 처리 중 전체 오류:", error);
      alert(`오류가 발생했습니다: ${error?.message || "알 수 없는 오류"}`);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * 개별 후보 곡 정보 표시 컴포넌트
   */
  function CandidateListItem({ candidate }: { candidate: any }) {
    const { songId, parts, score, url } = candidate;
    const { parsed, titleSimilarity, artistSimilarity } = parts;

    return (
      <li className="text-gray-700">
        <div>
          <strong className="text-blue-600">{songId}</strong> — {parsed.title} / {parsed.artist}
        </div>
        <div className="mt-0.5 text-xs text-gray-500">
          제목 유사도: {Math.round(titleSimilarity * 100)}% | 아티스트 유사도: {Math.round(artistSimilarity * 100)}% |
          종합 점수: {Math.round(score * 100)}%{" "}
          <a
            className="text-blue-600 underline hover:text-blue-800"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            확인
          </a>
        </div>
      </li>
    );
  }

  /**
   * 수동 검토가 필요한 매칭 결과 표시 컴포넌트
   */
  function ManualReviewResult({ borderline, rankedCandidates }: { borderline: boolean; rankedCandidates: any[] }) {
    return (
      <div className="mt-2 text-xs">
        <div className={`font-medium ${borderline ? "text-yellow-700" : "text-red-700"}`}>
          {borderline ? "🟡 수동 검토 필요 - 유력한 후보들:" : "❌ 자동 매칭 실패 - 검색된 후보들:"}
        </div>
        <ul className="mt-1 ml-5 list-disc space-y-1">
          {rankedCandidates.map((candidate: any) => (
            <CandidateListItem
              key={candidate.songId}
              candidate={candidate}
            />
          ))}
        </ul>
      </div>
    );
  }

  /**
   * 자동 확정된 매칭 결과 표시 컴포넌트
   */
  function AutomaticMatchResult({ topCandidate }: { topCandidate: any }) {
    const { songId, parts, score, url } = topCandidate;
    const { parsed } = parts;

    return (
      <div className="mt-2 rounded bg-green-50 p-2 text-xs">
        <div className="font-medium text-green-800">✅ 자동 확정 (신뢰도: {Math.round(score * 100)}%)</div>
        <div className="mt-1 text-green-700">
          <strong>멜론 ID:</strong> {songId} <br />
          <strong>곡명:</strong> {parsed.title} <br />
          <strong>아티스트:</strong> {parsed.artist} <br />
          <a
            className="text-blue-600 underline hover:text-blue-800"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            멜론에서 확인 →
          </a>
        </div>
      </div>
    );
  }

  /**
   * 개별 검색 결과를 표시하는 카드 컴포넌트
   */
  function SearchResultCard({ result }: { result: SearchResultRow }) {
    const { youtubeTitle, songInformation, queryTried, matchResult, errorMessage } = result;

    return (
      <div className="rounded border bg-white p-3 shadow-sm">
        {/* YouTube 제목 */}
        <div className="font-medium text-gray-900">{youtubeTitle}</div>

        {/* 추출된 곡 정보 */}
        {songInformation && (
          <div className="mt-1 text-sm text-gray-700">
            🎵 <span className="font-medium">{songInformation.title}</span> / 👤{" "}
            <span className="font-medium">{songInformation.artist}</span>
          </div>
        )}

        {/* 사용된 검색 쿼리 */}
        {queryTried && (
          <div className="mt-1 text-xs text-gray-500">
            검색 쿼리: <code className="rounded px-1">{queryTried}</code>
          </div>
        )}

        {/* 매칭 결과 */}
        {matchResult?.automatic ? (
          <AutomaticMatchResult topCandidate={matchResult.topCandidate} />
        ) : matchResult?.rankedCandidates && matchResult.rankedCandidates.length > 0 ? (
          <ManualReviewResult
            borderline={matchResult.borderline}
            rankedCandidates={matchResult.rankedCandidates}
          />
        ) : matchResult ? (
          <div className="mt-2 text-xs text-gray-600">멜론에서 매칭되는 곡을 찾을 수 없습니다</div>
        ) : null}

        {/* 오류 메시지 */}
        {errorMessage && <div className="mt-2 rounded bg-red-50 px-2 py-1 text-sm text-red-600">⚠️ {errorMessage}</div>}
      </div>
    );
  }

  /**
   * 멜론으로 플레이리스트 적용
   */
  function handleApplyToMelon() {
    if (!aggregatedSongIds) {
      return alert("멜론으로 전송할 곡이 없습니다.");
    }

    applyToPlatform(aggregatedSongIds, "melon");
  }

  return (
    <div className="space-y-4 p-5">
      <h1 className="text-xl font-bold">YouTube 플레이리스트 → 멜론 자동 매칭 도구</h1>

      {/* 입력 및 액션 버튼 영역 */}
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2"
          placeholder="https://music.youtube.com/playlist?list=... (YouTube Music 플레이리스트 링크)"
          value={playlistLink}
          onChange={(e) => setPlaylistLink(e.target.value)}
          disabled={isLoading}
        />
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
          onClick={handleFetchAndMatchPlaylist}
        >
          {isLoading ? "매칭 진행 중..." : "매칭 시작"}
        </button>
        <button
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
          disabled={!aggregatedSongIds}
          onClick={handleApplyToMelon}
        >
          멜론으로 전송
        </button>
      </div>

      {/* 결과 표시 영역 */}
      <div className="h-[calc(100vh-200px)] space-y-3 overflow-y-auto">
        {searchResults.map((result, index) => (
          <SearchResultCard
            key={index}
            result={result}
          />
        ))}

        {/* songId 집계 결과 */}
        {searchResults.length > 0 && (
          <div className="mt-5 rounded border bg-gray-50 p-3 text-sm">
            <div className="mb-1 font-bold">
              매칭된 곡들의 멜론 songId 목록 ({aggregatedSongIds.split(",").filter(Boolean).length}곡)
            </div>
            <div className="break-words whitespace-pre-wrap text-gray-700">
              {aggregatedSongIds || "(매칭된 곡이 없습니다)"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
