"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type Props = {
  postId: string;
};

type Data = {
  text: string;
  postId: string;
};

export default function CreatePost({ postId }: Props) {
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async ({ text, postId }: Data) =>
      await axios.post("/api/posts/addComment", { text, postId }),
    {
      // on Error toast error message
      onError: (err) => {
        if (err instanceof AxiosError) {
          toast.dismiss();
          toast.error("ERROR");
        }
      },
      // On success toast success message and clear input
      onSuccess: () => {
        queryClient.invalidateQueries(["postDetail"]);
        toast.dismiss();
        toast.success("Comment added");
        setText("");
      },
    }
  );

  // Form submit handler
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ text, postId });
    toast.loading("Adding your comment");
  };

  return (
    <>
      {/* Input Form Card */}
      <form onSubmit={submitHandler} className="bg-white mb-8 p-8 rounded-md">
        {/* Text input Area */}
        <div className="flex flex-col mb-4">
          <input
            disabled={false}
            onChange={(e) => setText(e.target.value)}
            name="title"
            value={text}
            type="text"
            placeholder="Enter your comment here"
            className="p-4 text-lg rounded-md my-2 bg-gray-200"
          />
        </div>
        {/* Character counter and Button*/}
        <div className=" flex items-center justify-between gap-2">
          {/* Character counter */}
          <p
            className={`font-bold text-sm ${
              text.length > 300 ? "text-red-700" : "text-gray-700"
            }`}>
            {`${text.length}/300`}
          </p>
          {/* Submit button */}
          <button
            disabled={text.length > 300 || text.trim().length < 1}
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            type="submit">
            Add Comment
          </button>
        </div>
      </form>
    </>
  );
}
