export default interface playlist {
  /** 플레이리스트의 고유 ID */
  id: number;
  /** 플레이리스트 제목 */
  title: string;
  /** 플레이리스트 커버 이미지 URL */
  coverImageUrl?: string;
  /** 작성자 닉네임 */
  nickName: string;
  /** 플레이리스트가 받은 'dig' 수 */
  digCount: string;
  /** 플레이리스트가 공유된 횟수 */
  shareCount: string;
}
