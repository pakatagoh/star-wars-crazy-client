import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Block from './../../components/Block/Block';
import Quiz from './../../components/Quiz/Quiz';
import RandomQuote from './../../components/RandomQuote/RandomQuote';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import { getQuizList } from './../../services/quiz/quizService';
import { UserContext } from './../../App';
import { saveUserScore, getTopUsers } from './../../services/score/scoreService';

const HomePage = () => {
  const [quizList, setQuizList] = useState([]);
  const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
  const [score, setScore] = useState(0);
  const [selection, setSelection] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [reset, setReset] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const { user, updateUser } = useContext(UserContext);

  const fetchQuizList = async () => {
    try {
      const foundQuizList = await getQuizList();
      if (foundQuizList) {
        setQuizList(foundQuizList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopUsers = async () => {
    try {
      const foundTopUsers = await getTopUsers();
      if (foundTopUsers) {
        setLeaderboard(foundTopUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchQuizList();
    fetchTopUsers();
  }, [reset]);

  const handleChange = event => {
    const { value } = event.target;
    setSelection(value);
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      const selectedAnswer = selection;
      const quizAnswer = quizList[currentQuestionNum - 1].answer;
      if (selectedAnswer === quizAnswer) setScore(state => state + 1);
      setSelection('');
      if (currentQuestionNum === quizList.length) {
        const submittedScore = selectedAnswer === quizAnswer ? score + 1 : score;
        setIsCompleted(true);
        if (!user) return;
        const response = await saveUserScore(submittedScore);
        if (response.error) {
          console.error(response.error.message);
          localStorage.removeItem('user');
          updateUser(null);
          return;
        }
        updateUser({ ...user, score: submittedScore });
        return;
      }
      setCurrentQuestionNum(state => state + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setSelection('');
    setScore(0);
    setQuizList([]);
    setCurrentQuestionNum(1);
    setIsCompleted(false);
    setReset(!reset);
  };

  const quiz = quizList[currentQuestionNum - 1];
  const totalQuestions = quizList.length;

  const quizFormProps = {
    handleSubmit,
    selection,
    handleChange,
    currentQuestionNum,
    totalQuestions,
  };
  return (
    <main data-testid="home-page">
      <Container>
        <Row>
          <Col lg={3}>
            <Block spacer={2}>
              <div className="d-flex justify-content-center justify-content-lg-start">
                <Leaderboard leaderboard={leaderboard} />
              </div>
            </Block>
          </Col>
          <Col lg={9}>
            <Block spacer={2}>
              <Quiz
                isCompleted={isCompleted}
                score={score}
                totalQuestions={totalQuestions}
                handleReset={handleReset}
                quiz={quiz}
                quizList={quizList}
                quizFormProps={quizFormProps}
              />
            </Block>
            <Block spacer={2}>
              <RandomQuote />
            </Block>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default HomePage;
