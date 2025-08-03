import Frame80 from "./components/frame80";
import Header from "./components/header";
import NoPlaylists from "./components/NoPlaylists";

export default function PlaylistsPage() {
  const popularPlayList = [
    {
      id: 1,
      url: "https://example.com/image.jpg",
      dominantColor: "#fcc003",
      title: "찜통 더위 날려버릴 노래, 인데 말줄임표 어떻게 되나 궁금하지?",
      digCount: 150,
      shareCount: 3,
    },
    {
      id: 29,
      url: "https://example.com/popular-image.jpg",
      dominantColor: "#ff5733",
      title: "테오의 발제는 정말 길다",
      digCount: 200,
      shareCount: 5,
    },
    {
      id: 291,
      url: "https://example.com/popular-image.jpg",
      dominantColor: "#292929",
      title: "왜 밖에서도 43인치 모니터가 쓰고싶지? 널 알기 전으로 돌아갈래",
      digCount: 4,
      shareCount: 5932,
    },
  ];

  return (
    <div
      id="playlistsPage"
      className="bg-gray-20 flex w-screen flex-col justify-center overflow-hidden"
    >
      <Header />

      <div
        id="지금_인기있는_플레이리스트"
        className="absolute top-[72px] flex h-[47px] w-full flex-col gap-[7px] pl-[20px]"
      >
        <div className="h-[24px] text-[20px] leading-[100%] font-bold tracking-[0%] text-gray-100">
          지금 인기있는 플레이리스트
        </div>
        <div className="text-gray-70 text-[13px] font-[400]">DIGROUND 유저들이 많이 듣고 있는 플레이리스트에요.</div>
      </div>

      <div
        id="poularPlayListContainer"
        className="absolute top-[141px] h-[226px] w-full overflow-hidden"
      >
        <div
          id="popularPlayListDiv1"
          className="scrollbar-none absolute inline-flex h-full w-full gap-[16px] overflow-x-auto p-[0_20px]"
        >
          {popularPlayList.map((playlist) => (
            <Frame80
              key={playlist.id}
              title={playlist.title}
              digCount={playlist.digCount}
              shareCount={playlist.shareCount}
              pliArt={{ id: playlist.id, url: playlist.url, dominantColor: playlist.dominantColor }}
            />
          ))}
        </div>
      </div>

      <div
        id="playlists"
        className="absolute top-[407px] w-full"
      >
        <NoPlaylists />
      </div>
    </div>
  );
}
