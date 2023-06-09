"use client";
import axios from "axios";
import SinglePost from "./SinglePost";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../utils/types";

export const UserPosts = () => {
  const fetchUserPosts = async () => {
    const { data } = await axios.get("/api/posts/getUserPosts");
    return data;
  };
  
  const { data, isLoading, isError } = useQuery<PostType[]>(
    ["userPosts"],
    fetchUserPosts
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      {data?.map((post) => (
        <SinglePost key={post.id} post={post} allowEdit={true} />
      ))}
    </div>
  );
};
