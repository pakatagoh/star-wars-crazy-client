import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import * as quizService from './../../services/quiz/quizService';
import Quiz from './Quiz';

describe('Quiz Container', () => {
  const sampleResponse = [
    {
      question: 'this is a sample question',
      answer: 'this is the answer',
      options: [
        { key: 'option-1', value: 'this is the answer' },
        { key: 'option-2', value: 'this is 2nd option' },
        { key: 'option-3', value: 'this is 3rd option' },
      ],
    },
  ];

  beforeEach(() => {
    jest.spyOn(quizService, 'getQuizList').mockImplementation(() => Promise.resolve(sampleResponse));
  });

  afterEach(() => {
    quizService.getQuizList.mockRestore();
  });

  test('should call getQuizList service once', async () => {
    const { getByText } = render(<Quiz />);

    const element = await waitForElement(() => getByText(sampleResponse[0].question));
    expect(quizService.getQuizList.mock.calls.length).toEqual(1);
    expect(element).toBeInTheDocument();
  });
});
