"use client";

import SinglePost from "@/app/components/SinglePost";
import { PostType } from "@/app/utils/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDetails = async (slug: string) => {
  const { data } = await axios.get(`/api/posts/${slug}`);
  return data;
};

type URL = {
  params: {
    slug: string;
  };
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>(["postDetail"], () =>
    fetchDetails(url.params.slug)
  );

  if (isLoading) return <div>Loading...</div>;

  return data ? <SinglePost post={data} /> : <p>Post not found</p>;
}
