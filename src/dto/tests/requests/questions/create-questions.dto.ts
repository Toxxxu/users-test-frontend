export interface CreateQuestionDto {
  question: string;
  options: string[];
  correctOption: number;
}