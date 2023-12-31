export interface IQuestion {
  text: string;
  answers: IAnswer[];
}

export interface IAnswer {
  text: string;
  isCorrect: boolean;
  idx: number;
}

export interface IResponse {
  seq: number;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}
export enum QuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  MATCHING = 'MATCHING',
  FILL_IN = 'FILL_IN',
  ORDER = 'ORDER',
}
