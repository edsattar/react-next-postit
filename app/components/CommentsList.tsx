import { PostType } from "../utils/types";
import Image from "next/image";



export default function CommentsList({data}: {data: PostType}) {
  return (
    <>
      {data.comments?.map((comment) => (
        <div key={comment.id} className="bg-white my-8 p-8 rounded-lg ">
            <p className="text-gray-700 pb-4">{comment.text}</p>
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={24}
              height={24}
              src={comment.user.image}
              alt="avatar"
            />
            <h3 className="text-sm font-bold text-gray-700">{comment.user.name}</h3>
            <h2 className="text-xs">{comment.createdAt}</h2> 
            </div>
        </div>
      ))}
    </>
  );
}
