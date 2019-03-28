import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'reactstrap';
import QuizCompleted from './QuizCompleted';
import QuizForm from './QuizForm';
import Title from './../Typography/Title';
import Spinner from '../Spinner/Spinner';

const StyledYellowBox = styled.div`
  border: 0.6rem solid #ffd700;
  border-radius: 1rem;
  padding: 0.5rem;
`;

const Quiz = props => {
  const { isCompleted, score, totalQuestions, handleReset, quiz, quizList, quizFormProps } = props;

  return (
    <div data-testid="quiz-view">
      <Title className="text-center" as="h1">
        Star Wars Quiz
      </Title>
      <StyledYellowBox>
        {isCompleted ? (
          <QuizCompleted score={score} totalQuestions={totalQuestions} handleReset={handleReset} />
        ) : (
          <>
            <Row className="justify-content-center">
              <Col sm="10">
                {quizList.length > 0 && quiz ? (
                  <QuizForm question={quiz.question} options={quiz.options} {...quizFormProps} />
                ) : (
                  <Spinner />
                )}
              </Col>
            </Row>
          </>
        )}
      </StyledYellowBox>
    </div>
  );
};

export default Quiz;
