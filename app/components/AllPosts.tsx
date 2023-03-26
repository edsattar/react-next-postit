"use client";
import axios from "axios";
import SinglePost from "./SinglePost";
import { useQuery } from "@tanstack/react-query";
import { PostType } from "../utils/types";

export const AllPosts = () => {
  const fetchAllPosts = async () => {
    const { data } = await axios.get("/api/posts/getAllPost");
    return data;
  };

  const { data, isLoading, isError } = useQuery<PostType[]>(
    ["allPosts"],
    fetchAllPosts
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <>
      {data?.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </>
  );
}
