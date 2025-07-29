import { useEffect, useState } from "react";

import CommentContainer from "./CommentContainer";

import Icon from "@/app/_common/icon/Icon";
import { getCommentList } from "@/app/detail/api/playListApi";
import { Comment, CommentList } from "@/mocks/sample/Comment";

interface DrawerProps {
  onClose: () => void;
}

export default function Drawer({ onClose }: DrawerProps) {
  const [comments, setComments] = useState<Comment[]>(CommentList);
  const [comment, setComment] = useState<string>("");

  const fetchCommentList = async () => {
    try {
      const { data } = await getCommentList();

      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCommentList();
  }, []);

  const handleOnClose = () => {
    onClose();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      alert("대충 내용 입력하라는 소리~");

      return;
    }
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    // 임시
    alert(`${comment} 올리기~`);
  };

  return (
    <div className="w-[inherit] h-[100vh] absolute inset-0">
      <div
        className="absolute inset-0 bg-gray-5 opacity-[60%]"
        onClick={handleOnClose}
      />
      <div className="w-[inherit] h-[50vh] bg-gray-15 absolute bottom-0 left-0 right-0 max-h-[80%] bg-white rounded-t-[20px] pt-[14px] px-[20px] ">
        <div className="mb-[6px]">
          <span className="text-gray-80 text-sm font-bold ">댓글</span>
          <Icon
            name="close"
            className="absolute top-[14px] right-[20px]"
            onClick={() => handleOnClose()}
          />
        </div>
        <div className="h-[calc(80%-100px)] overflow-y-auto pt-[16px] flex flex-col gap-[24px]">
          {comments.map((comment) => (
            <CommentContainer
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 w-full opacity-100 h-[78px] h-max-[145px] bg-gray-10 py-[14px] px-[20px] flex gap-[10px] items-center">
        <input
          className="w-full border border-yellow-50"
          onChange={(e) => handleOnChange(e)}
        />
        <button
          className="w-[40px] h-[40px] rounded-[46px] p-[8px] border border-gray-30 bg-gray-5"
          onClick={handleCommentSubmit}
        >
          {/* button border 피그마에는 #525252인데 컬러 차트에 없음 */}
          <Icon name="arrowUp" />
        </button>
      </div>
    </div>
  );
}
