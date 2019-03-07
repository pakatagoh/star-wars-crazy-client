import { starWarsApi } from './../starWarsApi/starWarsApiService';
import * as templates from './quizTemplates';
import { limits, categories } from '../starWarsApi/starWarsApiStats';
import { getRandomNumberFromRange } from './../../../utils/getRandomNumberFromRange';
import { getRandomNumberSet } from './../../../utils/getRandomNumberSet';

const MAX_QUESTIONS = 5;
const MAX_OPTIONS = 3;

export const generateQuestionOption = (data, selectedCategory, templateNum) => {
  const chosenTemplate = templates[selectedCategory][templateNum];

  const option = data[chosenTemplate.attribute];
  const reference = data[chosenTemplate.reference];
  const question = chosenTemplate.question(reference);

  return { question, option };
};

export const createQuiz = async selectedCategory => {
  try {
    const randomSet = getRandomNumberSet(MAX_OPTIONS, 1, limits[selectedCategory]);

    const foundEndPoints = await Promise.all(
      randomSet.map(async id => {
        try {
          return await starWarsApi.get(`/${selectedCategory}/${id}`);
        } catch (error) {
          console.error(error);
        }
      })
    );

    const templateNum = getRandomNumberFromRange(0, templates[selectedCategory].length - 1);

    const questionOptions = foundEndPoints.map(({ data }) => {
      return generateQuestionOption(data, selectedCategory, templateNum);
    });

    const answerIndex = getRandomNumberFromRange(0, MAX_OPTIONS - 1);
    const options = questionOptions.map((questionOption, index) => ({
      key: `option-${index + 1}`,
      value: questionOption.option,
    }));

    const result = {
      question: questionOptions[answerIndex].question,
      answer: questionOptions[answerIndex].option,
      options,
    };

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getQuizList = async () => {
  try {
    const tempList = [...Array(MAX_QUESTIONS)];

    const quizList = await Promise.all(
      tempList.map(async () => {
        try {
          const selectedCategory = categories[getRandomNumberFromRange(0, categories.length - 1)];
          const createdQuiz = await createQuiz(selectedCategory);
          return createdQuiz;
        } catch (error) {
          console.error(error);
        }
      })
    );
    return quizList;
  } catch (error) {
    console.error(error);
  }
};
