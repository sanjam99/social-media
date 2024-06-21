export interface Post {
    _id: string;
  text: string;
  user: {
    _id: string;
    username: string;
  };
  likes: string[];
  comments: {
    _id: string;
    text: string;
    user: {
      _id: string;
      username: string;
    };
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  }
  