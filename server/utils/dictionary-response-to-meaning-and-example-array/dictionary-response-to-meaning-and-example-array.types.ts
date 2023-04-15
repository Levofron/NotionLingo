export interface MeaningWithExamples {
  examples: string[];
  meaning: string;
}

export interface DictionaryResponse {
  additionalExamples: string[];
  meaningAndExamples: MeaningWithExamples[];
  word: string;
}
