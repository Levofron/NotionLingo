export interface INotionWordResponseItem {
  exampleSentence: string;
  exampleSentenceSuggestion?: string;
  id: string;
  ipa: string | null;
  meaning: string;
  meaningSuggestion?: string;
  type: string | string[] | null;
  word: string;
}
