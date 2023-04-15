import { load } from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';
import { withAxiom } from 'next-axiom';
import { ApiError } from 'next/dist/server/api-utils';
import fetch from 'node-fetch';

import { cleanUpString } from '@shared/functions';

import { HttpStatusCode } from '@server/http-status-code';
import {
  dictionaryResponseToMeaningAndExampleArray,
  validateIfParametersExistsMiddleware,
  validateRequestMethodMiddleware,
  validateRouteSecretMiddleware,
  withMiddleware,
} from '@server/utils';

interface MeaningWithExamples {
  examples: string[];
  meaning: string;
}

const parseWord = (word: string) => {
  const lowerCasedWord = cleanUpString(word, { shouldCapitalizeFirstLetter: false });
  const wordWithoutSpaces = lowerCasedWord.replaceAll(' ', '+');

  return wordWithoutSpaces;
};

const fetchWebsiteContent = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Accept-Language': 'pl,en-GB;q=0.9,en;q=0.8,en-US;q=0.7',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      Cookie:
        'smcx_0_last_shown_at=1667396801986; XSRF-TOKEN=6e5125f6-4693-4f80-bf53-4cff4ffdb1fd; amp-access=amp-f60w3B4lidRBdi1NqEwFRw; OptanonAlertBoxClosed=2022-09-03T16:52:33.158Z; OTAdditionalConsentString=1~39.61.70.89.93.108.122.124.131.136.143.144.147.149.159.162.167.171.192.196.202.211.218.228.230.239.241.259.266.272.291.311.317.323.326.338.371.385.389.394.397.407.413.415.424.430.436.440.449.482.486.491.494.495.505.522.523.540.550.559.568.574.576.584.591.737.745.787.802.803.817.820.821.829.839.864.874.899.922.981.1051.1095.1097.1201.1205.1211.1276.1301.1365.1415.1449.1570.1577.1651.1716.1765.1870.1878.1889.2008.2072.2074.2202.2253.2299.2322.2328.2357.2465.2501.2526.2568.2571.2575.2677.2999.3028.3225.3226.3231.3232.3234.3235.3236.3237.3238.3240.3241.3244.3245.3250.3251.3253.3257.3260.3268.3270.3272.3281.3288.3290.3292.3293.3295.3296.3300.3306.3307.3308.3314.3315.3316; preferredDictionaries="english,english-polish,british-grammar,english-russian"; smcx_0_last_shown_at=1667397073698; eupubconsent-v2=CPeuODAPeuODAAcABBENC1CsAP_AAH_AAChQHQpD7T7FYSnC-PZ5fLsAcAhHR9TkA6QACASAAmABAAKQIIQCkmAYlASgBAgCAAAAAAJBAAIECAEACUAAwAAAAQAEAAAABAAIACAAgAARAgAICAACAAAAAAAIgAAAEAAAmwgAQIIACEgABAAAAAAAAAgAAAAAAgdjAiAAWAA8ACoAFwAMwAbABwAEAAJAAZAA0AByAD8AKwAfgBCACOAEwAKMAUoBCACIgEdAMCAZ8A14BxIDpAOoAeQA-QCLwExAMEAZYA7EBIJASAB5AEMARQAmABPACqAFiARABEgClAFuAMMAewA_QCBgEcAKeApEBeYDJwgAQARYA1AEegKbDABQAngCLAGoAbIBTYaAGAU8BSIDJxAAMAJ4AiwBqCIAYBTwFIgMnFQBAAhgBMAI4AvMUACAGoAj0ZAEACGAEwAjgC8xgAIAagCPR0BkAHgAPoAhgCKAEwAJ4AVQAsABdADFAIgAiQBSgC3AGGANEAewA_QCBgEWAI4AU8AxQC8wF9AMnAZYOACgBfAGoAVkBHoCmyEAgAIYATAAqgBiAI4AU8AxQDJyAAQAL4A1ACsgI9JQDgAeABEACYAFUAMUAiACJAFKALcAjgBTwDFALzAZOAywkADAGoAVkBHpSAmADyAIYAigBMACeAFIAKoAWAAxQCIAIkAUoAtwBogD9AIsARwAxQC8wF9AMnKABQAvgDUAKyAj0BTY.f_gAD_gAAAAA; displaySurveyMonkeyCounter=293; displaySurveyMonkeyPreviousPage=https://dictionary.cambridge.org/dictionary/english/shepherd; loginPopup=6; iawpvccs=1; iawpvc=820; OptanonConsent=isGpcEnabled=0&datestamp=Fri+Feb+03+2023+16%3A32%3A11+GMT%2B0100+(Central+European+Standard+Time)&version=202211.2.0&geolocation=PL%3B14&isIABGlobal=false&hosts=&groups=STACK42%3A1%2CC0001%3A1%2CC0002%3A0%2CC0003%3A0%2CC0004%3A0&consentId=7eb1c44f-1ea3-4dc3-9651-18d9fe4bd530&interactionCount=1&landingPath=NotLandingPage&AwaitingReconsent=false',
      Pragma: 'no-cache',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
      'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
    },
  });

  return response.text();
};

const fetchCambridgeDictionaryContent = (word: string) =>
  fetchWebsiteContent(`https://dictionary.cambridge.org/dictionary/english/${word}`);

const fetchMerriamWebsterContent = (word: string) =>
  fetchWebsiteContent(`https://www.merriam-webster.com/dictionary/${word}`);

const webscrapCambridgeDictionary = async (html: string) => {
  const $ = load(html as string);

  const additionalExamples: string[] = [];
  const meaningAndExamples: MeaningWithExamples[] = [];

  const word = $('.dhw').first().text().trim();

  $('.def-block').each((_, element) => {
    const meaning = $(element).find('.def').text().trim();

    const examples: string[] = [];

    $(element)
      .find('.examp')
      .each((_, exElement) => {
        examples.push($(exElement).text().trim());
      });

    meaningAndExamples.push({
      meaning,
      examples,
    });
  });

  $('.degs').each((_, element) => {
    $(element)
      .find('.deg')
      .each((_, element) => {
        additionalExamples.push($(element).text().trim());
      });
  });

  return {
    word,
    meaningAndExamples,
    additionalExamples,
  };
};

const webscrapMerriamWebster = async (html: string) => {
  const $ = load(html as string);
  const meaningAndExamples: MeaningWithExamples[] = [];

  const word = $('.dhw').first().text().trim();

  $('.dt').each((_, element) => {
    const meaning = $(element).find('.dtText').text().trim();

    const examples: string[] = [];

    $(element)
      .find('.sub-content-thread')
      .each((_, exElement) => {
        examples.push($(exElement).text().trim());
      });

    meaningAndExamples.push({
      meaning,
      examples,
    });
  });

  return { word, meaningAndExamples, additionalExamples: [] };
};

const hasResponse = (response: string) => response && response.trim().length > 0;

export const getWordDetailsFromDictionary = async (string: string) => {
  const parsedWord = parseWord(string);
  const merriamWebsterResponse = await fetchMerriamWebsterContent(parsedWord);
  const cambridgeDictionaryResponse = await fetchCambridgeDictionaryContent(parsedWord);

  const hasMerriamWebsterResponse = hasResponse(merriamWebsterResponse);
  const hasCambridgeDictionaryResponse = hasResponse(cambridgeDictionaryResponse);

  if (!hasMerriamWebsterResponse || !hasCambridgeDictionaryResponse) {
    throw new ApiError(HttpStatusCode.BAD_REQUEST, `Word not found - ${parsedWord}`);
  }

  if (hasMerriamWebsterResponse && !hasCambridgeDictionaryResponse) {
    const result = await webscrapMerriamWebster(merriamWebsterResponse);

    return dictionaryResponseToMeaningAndExampleArray(result);
  }

  if (!hasMerriamWebsterResponse && hasCambridgeDictionaryResponse) {
    const result = await webscrapCambridgeDictionary(merriamWebsterResponse);

    return dictionaryResponseToMeaningAndExampleArray(result);
  }

  const webscrapMerriamWebsterResponse = await webscrapMerriamWebster(merriamWebsterResponse);
  const webscrapCambridgeDictionaryResponse = await webscrapCambridgeDictionary(
    cambridgeDictionaryResponse,
  );

  const result = {
    word: webscrapCambridgeDictionaryResponse.word,
    meaningAndExamples: [
      ...webscrapCambridgeDictionaryResponse.meaningAndExamples,
      ...webscrapMerriamWebsterResponse.meaningAndExamples,
    ],
    additionalExamples: webscrapCambridgeDictionaryResponse.additionalExamples,
  };

  return dictionaryResponseToMeaningAndExampleArray(result);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getWordDetailsFromDictionary(req.query.word as string);

  res.status(HttpStatusCode.OK).json(response);
};

const middlewareToApply = [
  validateRequestMethodMiddleware('GET'),
  validateRouteSecretMiddleware,
  validateIfParametersExistsMiddleware('query', ['word']),
];

export default withAxiom(withMiddleware(handler)(middlewareToApply));
