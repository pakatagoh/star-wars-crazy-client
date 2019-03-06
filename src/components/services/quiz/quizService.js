import { starWarsApi } from './../starWarsApi/starWarsApiService';
import * as templates from './quizTemplates';
import { limits, categories } from '../starWarsApi/starWarsApiStats';

const maxQuestions = 3;

const selectedCategory = 'people';

const randomNumber = Math.floor(Math.random() * limits[selectedCategory]) + 1;

export const getQuizList = async () => {
  try {
    const tempList = [...Array(maxQuestions)];

    const quizList = await Promise.all(
      tempList.map(async () => {
        try {
          const createdQuiz = await createQuiz();
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

const createQuiz = async () => {
  try {
    const foundEndpoint = await starWarsApi.get(`/${categories[selectedCategory]}/${randomNumber}`);
    return foundEndpoint.data;
  } catch (error) {
    console.error(error);
  }
};
