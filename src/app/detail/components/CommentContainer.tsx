import Image from "next/image";

import Icon from "@/app/_common/icon/Icon";
import { defaultProfile } from "@/assets/images";
import { Comment } from "@/mocks/sample/Comment";

interface CommentProps {
  comment: Comment;
}

export default function CommentContainer({ comment }: CommentProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-[6px]">
        <div className="flex gap-[8px] items-center">
          <Image
            src={comment.profileURL || defaultProfile}
            alt="comment profile"
            width={26}
            height={26}
            style={{ borderRadius: "50%" }}
          />
          <span className="py-[6px] text-xs text-gray-60">
            {comment.writer} {comment.date}
          </span>
        </div>
        <Icon
          name="moreFilled"
          className="py-[5px]"
        />
      </div>
      <div className="text-gray-100 text-sm">{comment.comment}</div>
    </div>
  );
}
