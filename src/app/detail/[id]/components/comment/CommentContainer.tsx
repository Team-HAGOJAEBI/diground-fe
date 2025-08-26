import Image from "next/image";

import Icon from "@/app/_common/icon/Icon";
import { defaultProfile2x } from "@/assets/images";
import { Comment } from "@/mocks/sample/Comment";

interface CommentProps {
  comment: Comment;
}

export default function CommentContainer({ comment }: CommentProps) {
  return (
    <div>
      <div className="mb-[6px] flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <Image
            src={comment.profileURL || defaultProfile2x}
            alt="comment profile"
            width={26}
            height={26}
            style={{ borderRadius: "50%" }}
          />
          <span className="text-gray-60 py-[6px] text-xs">
            {comment.writer} {comment.date}
          </span>
        </div>
        <Icon
          name="moreFilled"
          className="py-[5px]"
        />
      </div>
      <div className="text-sm text-gray-100">{comment.comment}</div>
    </div>
  );
}
