import React, { useState } from 'react';
import QuestionForm from '../molecules/QuestionForm';
import QuizPreview from '../molecules/QuizPreview';
import Button from '../atoms/Button';
import styled from 'styled-components';

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: rgba(176, 176, 195, 0.56);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: rgba(0, 4, 255, 0.09);
  border-radius: 20px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  box-sizing: border-box; 
  position: relative; 
`;

const Content = styled.div`
  display: flex;
  flex-direction: ${props => (props.showPreview ? 'row' : 'column')};
  align-items: ${props => (props.showPreview ? 'flex-start' : 'center')};
  width: 100%;
  gap: ${props => (props.showPreview ? '30px' : '0')};
`;

const Header = styled.h1`
  font-family: 'Arial', sans-serif;
  color: #444;
  text-align: center;
  margin-bottom: 20px;
`;

const QuizBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <CenteredWrapper>
      <Container>
        <Header>Quiz Interactivo</Header>
        <Content showPreview={showPreview}>
          <QuestionForm onAddQuestion={handleAddQuestion} />
          {showPreview && <QuizPreview questions={questions} />}
        </Content>
        <Button onClick={togglePreview}>{showPreview ? 'Ocultar Vista Previa' : 'Mostrar Vista Previa'}</Button>
      </Container>
    </CenteredWrapper>
  );
};

export default QuizBuilder;
