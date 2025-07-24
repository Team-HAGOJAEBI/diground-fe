export type PlayList = {
  id: number;
  title: string;
  bio: string;
  tags: string[];
  coverURL: string;
  like: { isLiked: boolean; cnt: number };
  comment: { cnt: number };
  share: { cnt: number };
};

export const PlayListSample: PlayList = {
  id: 150907,
  title: "데이식스의 노래를 들어보자 데이식스의 노래를 들어보자 데이식스의 노래를 들어보자",
  bio: `데이식스 노래는 어쩜 질리지가 않아. 데이식스 노래는 어쩜 질리지가 않아.데이식스 노래는 어쩜 질리지가 않아.데이식스 노래는 어쩜 질리지가 않아.데이식스 노래는 어쩜 질리지가 않아.데이식스 노래는 어쩜 질리지가 않아.데이식스 노래는 어쩜 질리지가 않아 데이식스 노래는 어쩜 질리지가 않아.`,
  tags: ["데이식스", "최고야", "짱이야"],
  coverURL: "https://via.placeholder.com/150",
  like: { isLiked: false, cnt: 100 },
  comment: { cnt: 11 },
  share: { cnt: 25 },
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
      "Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me Love me or Leave me",
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
