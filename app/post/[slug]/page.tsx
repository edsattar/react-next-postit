import PostDetail from "@/app/components/PostDetail";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/auth/[...nextauth]";

type URL = {
  params: {
    slug: string;
  };
};

export default async function PostSlug(url: URL) {
  const session = await getServerSession(authOptions);
  return (
    <PostDetail
      slug={url.params.slug}
      enableComments={session ? true : false}
    />
  );
}
