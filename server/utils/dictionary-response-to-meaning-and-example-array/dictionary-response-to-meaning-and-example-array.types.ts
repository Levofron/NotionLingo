export interface IMeaningWithExamples {
  examples: string[];
  meaning: string;
}

export interface IDictionaryResponse {
  additionalExamples: string[];
  meaningAndExamples: IMeaningWithExamples[];
  word: string;
}
