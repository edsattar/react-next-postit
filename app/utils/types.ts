export type UserType = {
  id: string;
  email: string;
  name: string;
  image: string;
};

export type PostType = {
  id: string;
  title: string;
  createdAt: string;
  user: UserType;
  comments?: {
    id: string;
    text: string;
    createdAt: string;
    postId: string;
    user: UserType;
  }[];
}

export type UserPostsType = {
  id: string;
  email: string;
  name: string;
  image: string;
  posts: PostType[];
};

