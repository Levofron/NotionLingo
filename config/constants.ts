export const SUPPORTED_EXAMPLE_SENTENCE_COLUMN_NAMES = [
  'example',
  'Example',
  'Sentence',
  'sentence',
  'Example sentence',
  'example sentence',
];
export const SUPPORTED_MEANING_COLUMN_NAMES = ['Meaning', 'meaning'];
export const SUPPORTED_WORD_COLUMN_NAMES = ['Word', 'word', 'Name', 'name'];
export const SUPPORTED_TYPE_COLUMN_NAMES = ['Type', 'type', 'Category', 'category'];

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const API_ROUTE_SECRET = process.env.NEXT_PUBLIC_API_ROUTE_SECRET;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const UNSPLASH_BASE_URL = process.env.NEXT_PUBLIC_UNSPLASH_BASE_URL;
export const APPLICATION_ENVIRONMENT = process.env.NEXT_PUBLIC_APP_ENV || 'local';

export const { CRYPTO_ALGORITHM, CRYPTO_SECRET_KEY, SUPABASE_SERVICE_ROLE } = process.env;

export const GITHUB_LINK = 'https://github.com/playerony';
export const CONTACT_EMAIL = 'pawel.wojtasinski.1995@gmail.com;';
export const TWITTER_LINK = 'https://twitter.com/wojtasinskipawe';
export const LINKEDIN_LINK = 'https://linkedin.com/in/pwojtasinski';
export const BUY_ME_A_COFFEE_LINK = 'https://buymeacoffee.com/playerony';
export const PAYPAL_LINK = 'https://www.paypal.com/donate/?hosted_button_id=XQC5QN5G4JJW2';

export const DEFAULT_SPEECH_SYNTHESIS_PITCH = 1;
export const DEFAULT_SPEECH_SYNTHESIS_VOLUME = 1;
export const DEFAULT_SPEECH_SYNTHESIS_RATE = 0.8;
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

export const LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE = 'speechSynthesisRate';
export const LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE = 'speechSynthesisVoice';
export const LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH = 'speechSynthesisPitch';
export const LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME = 'speechSynthesisVolume';

export const QUESTIONS_AND_ANSWERS = [
  {
    question: 'What is NotionLingo?',
    answer:
      "NotionLingo is a cutting-edge app that allows users to easily learn new words and phrases from their own Notion database. Our intuitive platform integrates with the user's Notion database and provides a seamless experience for enhancing their vocabulary.",
  },
  {
    headerBalancer: true,
    question: 'What are the benefits of using NotionLingo?',
    answer:
      'NotionLingo offers customizable language learning through features such as text-to-speech APIs, auto-generated images and IPA text generation for each word, basic statistics, and an intuitive interface for finding, creating, and updating words. It also has a fast API ideal for large libraries of words. These features make NotionLingo a great choice for language learners who want to personalize their vocabulary lists and track their progress in an engaging and efficient way.',
  },
  {
    headerBalancer: true,
    question: 'What is the meaning behind the NotionLingo name?',
    answer:
      "NotionLingo is a language learning platform that combines the words 'Notion' and 'Lingo' to reflect its customizable approach to language learning, as well as its goal of providing an engaging and effective experience. The name references the popular productivity app Notion and the language learning app DuoLingo, and represents NotionLingo's commitment to personalized learning and gamification.",
  },
  {
    question: 'How can I get started with NotionLingo?',
    answer:
      'Getting started with NotionLingo is easy. Simply create an account, and follow the setup instructions to start integrating your Notion database with our outstanding functionalities.',
  },
  {
    headerBalancer: true,
    question: 'Do I need to have a Notion account to use NotionLingo?',
    answer: 'Yes, a Notion account is required to use NotionLingo.',
  },
  {
    question: 'Is NotionLingo free to use?',
    answer:
      'Yes, NotionLingo is completely free to use and support is provided through donations. Donations can be made through Buy-Me-A-Coffee or PayPal. How can I remove my NotionLingo account?',
  },
  {
    question: 'How can I remove my NotionLingo account?',
    answer:
      'Users have the option to remove their NotionLingo account by accessing the relevant settings in the account-settings page. No need to contact the support team.',
  },
  {
    headerBalancer: true,
    question: 'How can I reset my Notion integration with NotionLingo?',
    answer:
      'Users have the option to reset their Notion integration with NotionLingo by accessing the relevant settings in the account-settings page on the NotionLingo website. No need to contact the support team.',
  },
  {
    question: 'How can I contact the NotionLingo support team?',
    answer:
      "If you have more questions about NotionLingo or any of its features, we encourage you to use the contact form below to get in touch with us. Our team is always happy to assist you with any questions or concerns you may have, and we strive to provide prompt and helpful support to all our users. So, whether you need help with using the app or have a suggestion for a new feature, feel free to reach out to us using the contact form, and we'll get back to you as soon as possible.",
  },
];
