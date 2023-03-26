"use client";
import axios from "axios";
import CreatePost from "./components/CreatePost";
import { useQuery } from "@tanstack/react-query";
import Posts from "./components/Posts";
import { PostType } from "./utils/types";

//Fetch all posts
const allPosts = async () => {
  const res = await axios.get("/api/posts/getPost");
  return res.data;
};

export default function Home() {
  const { data, isLoading, isError } = useQuery<PostType[]>(["allPosts"], allPosts);
  if (isLoading) {<p>Loading...</p>};
  if (isError) return <p>Error</p>;

  return (
    <main>
      <CreatePost />
      {data?.map((post) => (
        <Posts
          key={post.id}
          post={post}
        />
      ))}
    </main>
  );
}
