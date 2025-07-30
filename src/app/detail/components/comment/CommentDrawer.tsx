import { useEffect, useState } from "react";

import { getCommentList } from "../../api/playListApi";
import Drawer from "../Drawer";

import CommentContainer from "./CommentContainer";

import Icon from "@/app/_common/icon/Icon";
import { Comment, CommentList } from "@/mocks/sample/Comment";

/**
 * 댓글 목록 API 호출
 */
function useCommentList() {
  const [comments, setComments] = useState<Comment[]>(CommentList);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const { data } = await getCommentList();

        if (!ignore) {
          setComments(data);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return { comments } as const;
}

export default function CommentDrawer({ onClose }: { onClose: () => void }) {
  const { comments } = useCommentList();

  const [commentInput, setCommentInput] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (!commentInput) return;
    // 임시
    alert(`${commentInput} 올리기~`);
  };

  return (
    <Drawer
      title="댓글"
      onClose={onClose}
    >
      <div className="custom-scrollbar mt-[6px] mb-[16px] flex flex-1 flex-col gap-[24px] overflow-y-auto pt-[16px]">
        {comments.map((comment) => (
          <CommentContainer
            key={comment.id}
            comment={comment}
          />
        ))}
      </div>
      <div className="bg-gray-10 h-max-[145px] -mx-[20px] flex items-center gap-[10px] px-[20px] py-[14px]">
        {/* 📑 임시 Input */}
        <input
          className="w-full border border-yellow-50"
          onChange={(e) => handleOnChange(e)}
        />
        {/* 📑 button border 피그마에는 #525252인데 컬러 차트에 없음 */}
        <button
          className="border-gray-30 bg-gray-5 h-[40px] w-[40px] rounded-[46px] border p-[8px]"
          onClick={handleCommentSubmit}
          disabled={!commentInput}
        >
          <Icon name="arrowUp" />
        </button>
      </div>
    </Drawer>
  );
}
