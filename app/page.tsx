"use client";
import CreatePost from "./components/CreatePost";
import { AllPosts } from "./components/AllPosts";

export default function Home() {
  return (
    <main>
      <CreatePost />
      <AllPosts />
    </main>
  );
}
