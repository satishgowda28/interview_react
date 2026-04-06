export interface Comment {
  id: number;
  text: string;
  replies?: Comment[]
}