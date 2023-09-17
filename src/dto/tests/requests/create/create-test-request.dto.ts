import { CreateQuestionDto } from "../questions/create-questions.dto";

export interface CreateTestRequestDto {
  title: string;
  questions: CreateQuestionDto[];
}