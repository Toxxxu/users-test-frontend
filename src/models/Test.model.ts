import { GetTestQuestionsDto } from "../dto/tests/responses/viewer/get-test-questions.dto";

export interface Test {
  _id: string;
  title: string;
  questions: GetTestQuestionsDto[];
  completedBy: string[];
}