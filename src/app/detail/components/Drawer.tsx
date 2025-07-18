import { useEffect, useState } from "react";

import CommentContainer from "./CommentContainer";

import { getCommentList } from "@/app/_api/playListApi";
import Icon from "@/app/_common/icon/Icon";
import { Comment, CommentList } from "@/mocks/sample/Comment";

interface DrawerProps {
  onClose: () => void;
}

export default function Drawer({ onClose }: DrawerProps) {
  const [comments, setComments] = useState<Comment[]>(CommentList);

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

  return (
    <div className="w-[inherit] h-[100vh] absolute inset-0">
      <div
        className="absolute inset-0 bg-gray-5 opacity-[60%]"
        onClick={handleOnClose}
      />
      <div className="w-[inherit] h-[60vh] bg-gray-15 absolute bottom-0 left-0 right-0 max-h-[90%] bg-white rounded-t-[20px] pt-[14px] px-[20px] ">
        <div className="mb-[6px]">
          <span className="text-gray-80 text-sm font-bold ">댓글</span>
          <Icon
            name="close"
            className="absolute top-[14px] right-[20px]"
            onClick={() => handleOnClose()}
          />
        </div>
        <div className="h-[calc(90%-100px)] overflow-y-auto pt-[16px] flex flex-col gap-[24px]">
          {comments.map((comment) => (
            <CommentContainer
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
