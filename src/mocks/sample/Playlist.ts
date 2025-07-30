export type PlayList = {
  id: number;
  title: string;
  bio: string;
  tags: string[];
  coverURL: string;
  like: { isLiked: boolean; cnt: number };
  comment: number;
  share: number;
  digging: number;
};

export const PlayListSample: PlayList = {
  id: 150907,
  title:
    "밥은 안 먹어도 데이식스는 맨날 들어야 사람 구실합니다 데이식스 노래 듣다가 눈물 흘려서 방금 방바닥 물바다 됨 신고함 얘들아 이거 보면 얼른 쉬지말고 데이식스 노래 들어라 콩츄부터 듣고 아거살도 듣도록 하여라 얼른 들어라 내가 항시 지켜보고 있다",
  bio: "밴드의 지배자. 밴드의 권위자. 밴드의 황제. 밴드의 제왕. 밴드의 군림자. 밴드의 마스터. 밴드의 신. 밴드의 대마왕. 밴드의 대명사. 밴드의 정석. 밴드의 전설. 밴드의 표본. 밴드의 종결자. 밴드계의 끝판왕. 밴드계의 시작과 끝. 밴드의 혁명. 밴드계의 이정표. 밴드의 기준. 밴드의 척도. 밴드의 화신. 밴드계의 살아있는 역사. 밴드계에 한 획을 그은 이름. 밴드의 찬란한 교과서. 밴드의 최종 보스. 악기도 잘 하고 노래도 잘하면서 얼굴까지 잘생겼으면 나보고 뭐 어떡하라고, 어떻하라고, 우뜩하라고, 어뜩하라고, 어떠콰라고,우뜨콰라고, 어떡하라고, 어떻하라고, 엉뜨켜라고, 우뜩하라고, 어뜩하라고, 어떠콰라고, 우뜨콰라고, 어뜨콰라고, 어떻하라고, 우뜩하라고, 어뜩하라고, 어떠콰라고,우뜨콰라고, 어떡하라고, 어떻하라고, 엉뜨켜라고, 우뜩하라고, 어뜩하라고, 어떠콰라고, 우뜨콰라고, 어뜨콰라고",
  tags: ["데이식스", "최고야", "짱이야"],
  coverURL: "https://via.placeholder.com/150",
  like: { isLiked: false, cnt: 100 },
  comment: 11,
  share: 25,
  digging: 30,
};

export type DetailList = {
  id: number;
  title: string;
  artist: string;
  time: string;
  image: string;
};

export const DetailList: DetailList[] = [
  {
    id: 1,
    title: "HAPPY",
    artist: "데이식스",
    time: "3:30",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/114/44/397/11444397_20240318115810_500.jpg?8cb5c0486469bbe05f7dd895ec073d72/melon/resize/282/quality/80/optimize",
  },
  {
    id: 2,
    title: "녹아내려요",
    artist: "데이식스",
    time: "3:45",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/115/80/616/11580616_20240830171855_500.jpg?fe64370b201724a4a854615765ed6b71/melon/resize/282/quality/80/optimize",
  },
  {
    id: 3,
    title: "Welcome to the Show",
    artist: "데이식스",
    time: "4:05",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/114/44/397/11444397_20240318115810_500.jpg?8cb5c0486469bbe05f7dd895ec073d72/melon/resize/282/quality/80/optimize",
  },
  {
    id: 4,
    title: "한 페이지가 될 수 있게",
    artist: "데이식스",
    time: "3:55",
    image:
      "https://cdnimg.melon.co.kr/cm/album/images/103/07/346/10307346_500.jpg?84c9c2f6f52301ab6327b78cf41efe82/melon/resize/282/quality/80/optimize",
  },
  {
    id: 5,
    title: "예뻤어",
    artist: "데이식스",
    time: "3:50",
    image:
      "https://cdnimg.melon.co.kr/cm/album/images/100/36/099/10036099_500.jpg?7374810860bfc17f2a70dc7a39124ead/melon/resize/282/quality/80/optimize",
  },
  {
    id: 6,
    title: "Congratulations",
    artist: "데이식스",
    time: "3:25",
    image: "https://cdnimg.melon.co.kr/cm/album/images/026/38/778/2638778_500.jpg/melon/resize/282/quality/80/optimize",
  },
  {
    id: 7,
    title: "Zombie",
    artist: "데이식스",
    time: "3:35",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/104/28/497/10428497_20200511134253_500.jpg?19660516aa86598ffe431579a1695f9c/melon/resize/282/quality/80/optimize",
  },
  {
    id: 8,
    title:
      "Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me",
    artist: "데이식스",
    time: "3:40",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/104/28/497/10428497_20200511134253_500.jpg?19660516aa86598ffe431579a1695f9c/melon/resize/282/quality/80/optimize",
  },
  {
    id: 9,
    title: "장난아닌데",
    artist: "데이식스",
    time: "3:20",
    image:
      "https://cdnimg.melon.co.kr/cm/album/images/100/52/301/10052301_500.jpg?62dae32cb292ff81692aac74c831cec0/melon/resize/282/quality/80/optimize",
  },
  {
    id: 10,
    title: "놓아 놓아 놓아",
    artist: "데이식스",
    time: "3:55",
    image: "https://cdnimg.melon.co.kr/cm/album/images/026/76/264/2676264_500.jpg/melon/resize/282/quality/80/optimize",
  },
  {
    id: 11,
    title: "Maybe Tomorrow",
    artist: "데이식스",
    time: "3:45",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/117/96/328/11796328_20250502150840_500.jpg?da597adcbfc297d7e33207a82c3d19e5/melon/resize/282/quality/80/optimize",
  },
  {
    id: 12,
    title: "괴물",
    artist: "데이식스",
    time: "3:50",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/115/80/616/11580616_20240830171855_500.jpg?fe64370b201724a4a854615765ed6b71/melon/resize/282/quality/80/optimize",
  },
  {
    id: 13,
    title: "Better Better",
    artist: "데이식스",
    time: "3:30",
    image:
      "https://cdnimg.melon.co.kr/cm/album/images/101/17/508/10117508_500.jpg?a20e3de2e8041c488f107cfd6d900c38/melon/resize/282/quality/80/optimize",
  },
  {
    id: 14,
    title: "그녀가 웃었다",
    artist: "데이식스",
    time: "3:35",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/115/80/616/11580616_20240830171855_500.jpg?fe64370b201724a4a854615765ed6b71/melon/resize/282/quality/80/optimize",
  },
  {
    id: 15,
    title: "아픈 길",
    artist: "데이식스",
    time: "3:45",
    image:
      "https://cdnimg.melon.co.kr/cm/album/images/102/31/033/10231033_500.jpg?f1682c72de7588b147ee3c086127b40c/melon/resize/282/quality/80/optimize",
  },
  {
    id: 16,
    title: "그게 너의 사랑인지 몰랐어",
    artist: "데이식스",
    time: "3:25",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/114/44/397/11444397_20240318115810_500.jpg?8cb5c0486469bbe05f7dd895ec073d72/melon/resize/282/quality/80/optimize",
  },
  {
    id: 17,
    title: "아직 거기 살아",
    artist: "데이식스",
    time: "3:40",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/115/80/616/11580616_20240830171855_500.jpg?fe64370b201724a4a854615765ed6b71/melon/resize/282/quality/80/optimize",
  },
  {
    id: 18,
    title: "Beautiful Feeling",
    artist: "데이식스",
    time: "3:50",
    image:
      "https://cdnimg.melon.co.kr/cm/album/images/102/31/033/10231033_500.jpg?f1682c72de7588b147ee3c086127b40c/melon/resize/282/quality/80/optimize",
  },
  {
    id: 19,
    title: "1 to 10",
    artist: "데이식스",
    time: "4:00",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/104/28/497/10428497_20200511134253_500.jpg?19660516aa86598ffe431579a1695f9c/melon/resize/282/quality/80/optimize",
  },
  {
    id: 20,
    title: "끝났지",
    artist: "데이식스",
    time: "3:35",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/117/96/328/11796328_20250502150840_500.jpg?da597adcbfc297d7e33207a82c3d19e5/melon/resize/282/quality/80/optimize",
  },
  {
    id: 21,
    title: "쏟아진다",
    artist: "데이식스",
    time: "3:30",
    image:
      "https://cdnimg.melon.co.kr/cm/album/images/101/17/508/10117508_500.jpg?a20e3de2e8041c488f107cfd6d900c38/melon/resize/282/quality/80/optimize",
  },
  {
    id: 22,
    title: "버릇이 됐어",
    artist: "데이식스",
    time: "3:20",
    image:
      "https://cdnimg.melon.co.kr/cm/album/images/101/17/508/10117508_500.jpg?a20e3de2e8041c488f107cfd6d900c38/melon/resize/282/quality/80/optimize",
  },
  {
    id: 23,
    title: "My Day",
    artist: "데이식스",
    time: "3:45",
    image:
      "https://cdnimg.melon.co.kr/cm/album/images/100/36/099/10036099_500.jpg?7374810860bfc17f2a70dc7a39124ead/melon/resize/282/quality/80/optimize",
  },
  {
    id: 24,
    title: "사랑하게 해주라",
    artist: "데이식스",
    time: "3:25",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/114/44/397/11444397_20240318115810_500.jpg?8cb5c0486469bbe05f7dd895ec073d72/melon/resize/282/quality/80/optimize",
  },
  {
    id: 25,
    title: "Sing Me",
    artist: "데이식스",
    time: "3:55",
    image: "https://cdnimg.melon.co.kr/cm/album/images/026/76/264/2676264_500.jpg/melon/resize/282/quality/80/optimize",
  },
  {
    id: 26,
    title: "First Time",
    artist: "데이식스",
    time: "3:40",
    image: "https://cdnimg.melon.co.kr/cm/album/images/026/76/264/2676264_500.jpg/melon/resize/282/quality/80/optimize",
  },
  {
    id: 27,
    title: "나만 슬픈 엔딩",
    artist: "데이식스",
    time: "3:25",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/114/44/397/11444397_20240318115810_500.jpg?8cb5c0486469bbe05f7dd895ec073d72/melon/resize/282/quality/80/optimize",
  },
  {
    id: 28,
    title: "365247",
    artist: "데이식스",
    time: "3:35",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/103/42/108/10342108_500.jpg?a76fb0d7401e27617baa2eba78e82fe2/melon/resize/282/quality/80/optimize",
  },
  {
    id: 29,
    title: "Sweet Chaos",
    artist: "데이식스",
    time: "3:50",
    image:
      "https://cdnimg.melon.co.kr/cm2/album/images/103/42/108/10342108_500.jpg?a76fb0d7401e27617baa2eba78e82fe2/melon/resize/282/quality/80/optimize",
  },
  {
    id: 30,
    title: "바래",
    artist: "데이식스",
    time: "3:30",
    image: "https://cdnimg.melon.co.kr/cm/album/images/026/76/264/2676264_500.jpg/melon/resize/282/quality/80/optimize",
  },
];
