export interface Photo {
  allowComments: boolean;
  description: string;
  url: string;
  id: number;
  comments: number;
  likes: number;
  postDate: Date;
  userId: number;
}