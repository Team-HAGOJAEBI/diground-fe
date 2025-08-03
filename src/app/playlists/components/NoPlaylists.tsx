export default function NoPlaylists() {
  return (
    <div className="flex h-[154px] w-full items-center justify-center p-[20px_0px]">
      <div className="p-[16px 20px] flex h-[142px] w-[320px] flex-col gap-[18px]">
        <div className="flex h-[48px] flex-col gap-[12px]">
          <div className="text-gray-80 text-center text-[14px] leading-[15px] font-[400]">
            아직 업로드한 플레이리스트가 없어요.
          </div>
          <div className="text-gray-95 text-center text-[20px] leading-[15px] font-[700]">지금 하나 만들어볼까요?</div>
        </div>

        <div className="flex h-[50px] w-full items-center justify-center">
          <button className="bg-yellow-80 text-gray-5 h-[50px] w-[260px] rounded-[90px] pr-[36px] pl-[36px] text-[16px] leading-[20px] font-[700]">
            플레이리스트 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
