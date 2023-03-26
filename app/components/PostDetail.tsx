"use client";
import SinglePost from "./SinglePost";
import AddComment from "./AddComment";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../utils/types";
import CommentsList from "./CommentsList";

type Props = {
  slug: string;
  enableComments?: boolean;
};

export default function PostDetail({slug, enableComments=true}: Props) {
  const fetchDetails = async (slug: string) => {
    const { data } = await axios.get(`/api/posts/${slug}`);
    return data;
  };

  const { data, isLoading } = useQuery<PostType>(["postDetail"], () =>
    fetchDetails(slug)
  );

  if (isLoading) return <div>Loading...</div>;

  if (data) {
    return (
      <>
        <SinglePost post={data} />
        {enableComments ? <AddComment postId={data.id}/> : <p>Login to post comments</p> }
        <CommentsList data={data} />
      </>
    );
  } else {
    return <h1>Post not found</h1>;
  }
}
