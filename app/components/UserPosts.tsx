"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostType } from "../utils/types";
import Posts from "./Posts";

const fetchUserPosts = async () => {
  const { data } = await axios.get("/api/posts/getUserPosts");
  return data;
};

export const UserPosts = () => {
  const { data, isLoading, isError } = useQuery<PostType[]>(["userPosts"], fetchUserPosts);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      {data?.map((post) => (
        <Posts
          key={post.id}
          post={post}
          allowEdit={true}
        />
      ))}
    </div>
  );
};
