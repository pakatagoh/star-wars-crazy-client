import React from 'react';
import { render, waitForElement, fireEvent } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import * as quizService from '../../services/quiz/quizService';
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
    {
      question: 'this is a sample question number 2',
      answer: 'this is the answer number 2',
      options: [
        { key: 'option-1', value: 'this is the answer number 2' },
        { key: 'option-2', value: 'this is 2nd option number 2' },
        { key: 'option-3', value: 'this is 3rd option number 2' },
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

  test('should display the options on the page', async () => {
    const { getByText } = render(<Quiz />);

    const [option1, option2, option3] = await waitForElement(() => [
      getByText(sampleResponse[0].options[0].value),
      getByText(sampleResponse[0].options[1].value),
      getByText(sampleResponse[0].options[2].value),
    ]);
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });

  test('should display a question', async () => {
    const { getByText } = render(<Quiz />);

    const questionElement = await waitForElement(() => getByText(sampleResponse[0].question));

    expect(questionElement).toBeInTheDocument();
  });

  test('should display disabled button on load', async () => {
    const { getByText } = render(<Quiz />);

    const button = await waitForElement(() => getByText(/submit/i));
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');
  });

  test('should display no selected radio input on load', async () => {
    const { getByLabelText } = render(<Quiz />);

    const [radio0, radio1, radio2] = await waitForElement(() => [
      getByLabelText(sampleResponse[0].options[0].value),
      getByLabelText(sampleResponse[0].options[0].value),
      getByLabelText(sampleResponse[0].options[0].value),
    ]);

    expect(radio0).toHaveProperty('checked', false);
    expect(radio1).toHaveProperty('checked', false);
    expect(radio2).toHaveProperty('checked', false);
  });

  test("should have radio selected when it's label is clicked", async () => {
    const { container, getByText, getByLabelText } = render(<Quiz />);

    const [label, radio] = await waitForElement(
      () => [
        getByText(new RegExp(sampleResponse[0].options[0].value, 'i')),
        getByLabelText(new RegExp(sampleResponse[0].options[0].value, 'i')),
      ],
      { container }
    );
    expect(label).toBeInTheDocument();
    expect(radio).toBeInTheDocument();
    fireEvent.click(label);

    expect(radio).toHaveProperty('checked', true);
  });

  test("should have second clicked label and it's respective radio checked and the first radio to become unchecked", async () => {
    const { getByText, getByLabelText } = render(<Quiz />);

    const [label0, radio0, label1, radio1] = await waitForElement(() => [
      getByText(new RegExp(sampleResponse[0].options[0].value, 'i')),
      getByLabelText(new RegExp(sampleResponse[0].options[0].value, 'i')),
      getByText(new RegExp(sampleResponse[0].options[1].value, 'i')),
      getByLabelText(new RegExp(sampleResponse[0].options[1].value, 'i')),
    ]);

    expect(label0).toBeInTheDocument();
    expect(radio0).toBeInTheDocument();
    expect(label1).toBeInTheDocument();
    expect(radio1).toBeInTheDocument();

    fireEvent.click(label0);

    expect(radio0).toHaveProperty('checked', true);
    expect(radio1).toHaveProperty('checked', false);

    fireEvent.click(label1);

    expect(radio0).toHaveProperty('checked', false);
    expect(radio1).toHaveProperty('checked', true);
  });

  test('should have button change from disabled to enabled when radio selected after label is clicked', async () => {
    const { getByText } = render(<Quiz />);

    const [label, button] = await waitForElement(() => [
      getByText(new RegExp(sampleResponse[0].options[0].value, 'i')),
      getByText(/submit/i),
    ]);
    expect(label).toBeInTheDocument();
    expect(button).toHaveAttribute('disabled');

    fireEvent.click(label);

    expect(button).not.toHaveAttribute('disabled');
  });

  test('should change current Question number to 2/2 after submitting fist answer', async () => {
    const { getByText } = render(<Quiz />);

    const [label, button, currentQuestion] = await waitForElement(() => [
      getByText(new RegExp(sampleResponse[0].options[0].value, 'i')),
      getByText(/submit/i),
      getByText(/\d+\/\d+/i),
    ]);
    expect(label).toBeInTheDocument();
    expect(currentQuestion.textContent).toEqual('1/2');

    fireEvent.click(label);
    fireEvent.click(button);

    expect(currentQuestion.textContent).toEqual('2/2');
  });

  test('should see final score after submitting final question', async () => {
    const { getByText, queryByText } = render(<Quiz />);

    const [label0, button] = await waitForElement(() => [
      getByText(new RegExp(sampleResponse[0].options[0].value, 'i')),
      getByText(/submit/i),
    ]);

    fireEvent.click(label0);
    fireEvent.click(button);

    const [label1, beforeCompleted] = await waitForElement(() => [
      getByText(new RegExp(sampleResponse[1].options[0].value, 'i')),
      queryByText(/score is/i),
    ]);

    expect(beforeCompleted).not.toBeInTheDocument();

    fireEvent.click(label1);
    fireEvent.click(button);

    const [completedText] = await waitForElement(() => [getByText(/score is/i)]);

    expect(completedText).toBeInTheDocument();
  });

  test('should see final score of 2 after submitting 2 correct answers to 2 questions', async () => {
    const { getByText, queryByText } = render(<Quiz />);

    const [label0, button] = await waitForElement(() => [
      getByText(new RegExp(sampleResponse[0].options[0].value, 'i')),
      getByText(/submit/i),
    ]);

    fireEvent.click(label0);
    fireEvent.click(button);

    const [label1, beforeCompleted] = await waitForElement(() => [
      getByText(new RegExp(sampleResponse[1].options[0].value, 'i')),
      queryByText(/score is 2/i),
    ]);

    expect(beforeCompleted).not.toBeInTheDocument();

    fireEvent.click(label1);
    fireEvent.click(button);

    const [completedText] = await waitForElement(() => [getByText(/score is 2/i)]);

    expect(completedText).toBeInTheDocument();
  });

  test('should see final score of 1 after submitting 1 correct answer to 2 questions', async () => {
    const { getByText, queryByText } = render(<Quiz />);

    const [label0, button] = await waitForElement(() => [
      getByText(new RegExp(sampleResponse[0].options[0].value, 'i')),
      getByText(/submit/i),
    ]);

    fireEvent.click(label0);
    fireEvent.click(button);

    const [label1, beforeCompleted] = await waitForElement(() => [
      getByText(new RegExp(sampleResponse[1].options[1].value, 'i')),
      queryByText(/score is 1/i),
    ]);

    expect(beforeCompleted).not.toBeInTheDocument();

    fireEvent.click(label1);
    fireEvent.click(button);

    const [completedText] = await waitForElement(() => [getByText(/score is 1/i)]);

    expect(completedText).toBeInTheDocument();
  });

  test('should have reset button after completion of all questions. It should not have the submit button', async () => {
    const { queryByText, getByText } = render(<Quiz />);

    const [label0, button, resetBefore] = await waitForElement(() => [
      getByText(new RegExp(sampleResponse[0].options[0].value, 'i')),
      getByText(/submit/i),
      queryByText(/reset/i),
    ]);

    expect(resetBefore).not.toBeInTheDocument();

    fireEvent.click(label0);
    fireEvent.click(button);

    const [label1, beforeCompleted] = await waitForElement(() => [
      getByText(new RegExp(sampleResponse[1].options[0].value, 'i')),
      queryByText(/score is 2/i),
    ]);

    expect(beforeCompleted).not.toBeInTheDocument();

    fireEvent.click(label1);
    fireEvent.click(button);

    const [completedText, resetAfter, submitButton] = await waitForElement(() => [
      getByText(/score is 2/i),
      queryByText(/reset/i),
      queryByText(/submit/i),
    ]);

    expect(completedText).toBeInTheDocument();
    expect(resetAfter).toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();
  });
});

describe('Quiz Container after completing quiz', () => {
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
    {
      question: 'this is a sample question number 2',
      answer: 'this is the answer number 2',
      options: [
        { key: 'option-1', value: 'this is the answer number 2' },
        { key: 'option-2', value: 'this is 2nd option number 2' },
        { key: 'option-3', value: 'this is 3rd option number 2' },
      ],
    },
  ];
  const newSampleResponse = [
    {
      question: 'this is a new sample question',
      answer: 'this is the new answer',
      options: [
        { key: 'option-1', value: 'this is the new answer' },
        { key: 'option-2', value: 'this is new 2nd option' },
        { key: 'option-3', value: 'this is  new 3rd option' },
      ],
    },
    {
      question: 'this is a new sample question number 2',
      answer: 'this is the new answer number 2',
      options: [
        { key: 'option-1', value: 'this is the new answer number 2' },
        { key: 'option-2', value: 'this is new 2nd option number 2' },
        { key: 'option-3', value: 'this is new 3rd option number 2' },
      ],
    },
  ];

  async function renderWithCompleted() {
    const renderedQuiz = render(<Quiz />);

    const [label0, button] = await waitForElement(() => [
      renderedQuiz.getByText(new RegExp(sampleResponse[0].options[0].value, 'i')),
      renderedQuiz.getByText(/submit/i),
    ]);

    fireEvent.click(label0);
    fireEvent.click(button);

    const [label1] = await waitForElement(() => [
      renderedQuiz.getByText(new RegExp(sampleResponse[1].options[0].value, 'i')),
    ]);

    fireEvent.click(label1);
    fireEvent.click(button);

    const [resetAfter] = await waitForElement(() => [renderedQuiz.queryByText(/reset/i)]);

    expect(resetAfter).toBeInTheDocument();

    return {
      ...renderedQuiz,
      resetButton: resetAfter,
    };
  }

  beforeEach(() => {
    jest
      .spyOn(quizService, 'getQuizList')
      .mockImplementationOnce(() => Promise.resolve(sampleResponse))
      .mockImplementationOnce(() => Promise.resolve(newSampleResponse));
  });

  afterEach(() => {
    quizService.getQuizList.mockRestore();
  });

  test('should display a new question after reset is clicked', async () => {
    const { getByText, resetButton } = await renderWithCompleted();

    fireEvent.click(resetButton);

    const question = await waitForElement(() => getByText(newSampleResponse[0].question));

    expect(question).toBeInTheDocument();
  });

  test('should display submit button after reset is clicked', async () => {
    const { getByText, resetButton } = await renderWithCompleted();

    fireEvent.click(resetButton);

    const submitButton = await waitForElement(() => getByText(/submit/i));

    expect(submitButton).toBeInTheDocument();
  });

  test('should display question number 1/2 after clicking reset', async () => {
    const { getByText, resetButton } = await renderWithCompleted();

    fireEvent.click(resetButton);

    const currentQuestion = await waitForElement(() => getByText(/1\/2/i));

    expect(currentQuestion).toBeInTheDocument();
  });
});
