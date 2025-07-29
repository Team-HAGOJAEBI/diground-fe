import { useEffect, useState } from "react";

import { getCommentList } from "../../api/playListApi";
import Drawer from "../Drawer";

import CommentContainer from "./CommentContainer";

import Icon from "@/app/_common/icon/Icon";
import { Comment, CommentList } from "@/mocks/sample/Comment";

export default function CommentDrawer({ onClose }: { onClose: () => void }) {
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
    <Drawer
      title="댓글"
      onClose={onClose}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar pt-[16px] flex flex-col gap-[24px] mt-[6px]">
        {comments.map((comment) => (
          <CommentContainer
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
      <div className="bottom-0 w-[100vw] -mx-[20px] opacity-100 h-min-[78px] h-max-[145px] bg-gray-10 py-[14px] px-[20px] flex gap-[10px] items-center">
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
    </Drawer>
  );
}
