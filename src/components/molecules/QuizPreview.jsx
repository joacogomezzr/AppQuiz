import React, { useState } from 'react';
import InputField from '../atoms/Input';
import Button from '../atoms/Button';
import styled from 'styled-components';

const PreviewWrapper = styled.div`
  font-family: 'Arial', sans-serif;
  padding: 30px;
  background-color: #e0e0e0;
  border-radius: 8px;
`;

const Heading = styled.h2`
  color: #333;
  text-align: center;
`;

const QuestionBlock = styled.div`
  margin-bottom: 25px;
`;

const OptionsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OptionItem = styled.li`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
`;

const ResultText = styled.p`
  font-weight: bold;
  color: ${props => (props.isCorrect ? 'green' : 'red')};
`;

const SubmitButtonStyled = styled(Button)`
  background-color: #28a745;
  color: blue;
  border: none;
  padding: 12px 25px;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const QuizPreview = ({ questions }) => {
  const [userResponses, setUserResponses] = useState(Array(questions.length).fill(''));
  const [resultsVisible, setResultsVisible] = useState(Array(questions.length).fill(false));

  const handleResponseChange = (index, value) => {
    const updatedResponses = [...userResponses];
    updatedResponses[index] = value;
    setUserResponses(updatedResponses);
  };

  const handleFormSubmit = () => {
    setResultsVisible(Array(questions.length).fill(true));
  };

  const evaluateResponse = (question, response) => {
    if (!question || response === null) return false;

    if (question.type === 'Pregunta Abierta') {
      return question.correctAnswer.toLowerCase() === response.toLowerCase();
    } else if (question.type === 'Falso/Verdadero') {
      return question.correctAnswer.toLowerCase() === response.toLowerCase();
    } else if (question.type === 'Opción Múltiple') {
      return question.correctAnswer === response;
    }
    return false;
  };

  return (
    <PreviewWrapper>
      <Heading>Vista Previa del Quiz</Heading>
      {questions.map((q, qIndex) => (
        <QuestionBlock key={qIndex}>
          <h3>{q.question}</h3>
          {q.type === 'Opción Múltiple' && (
            <OptionsList>
              {q.options.map((opt, optIndex) => (
                <OptionItem key={optIndex}>
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    onChange={() => handleResponseChange(qIndex, opt)}
                    checked={userResponses[qIndex] === opt}
                  />
                  {opt}
                </OptionItem>
              ))}
            </OptionsList>
          )}
          {q.type === 'Falso/Verdadero' && (
            <OptionsList>
              <OptionItem>
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  onChange={() => handleResponseChange(qIndex, 'Verdadero')}
                  checked={userResponses[qIndex] === 'Verdadero'}
                />
                Verdadero
              </OptionItem>
              <OptionItem>
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  onChange={() => handleResponseChange(qIndex, 'Falso')}
                  checked={userResponses[qIndex] === 'Falso'}
                />
                Falso
              </OptionItem>
            </OptionsList>
          )}
          {q.type === 'Pregunta Abierta' && (
            <InputField
              type="text"
              value={userResponses[qIndex] || ''}
              onChange={(e) => handleResponseChange(qIndex, e.target.value)}
            />
          )}
          {resultsVisible[qIndex] && (
            <ResultText isCorrect={evaluateResponse(q, userResponses[qIndex])}>
              {evaluateResponse(q, userResponses[qIndex]) ? 'Correcto' : 'Incorrecto'}
            </ResultText>
          )}
        </QuestionBlock>
      ))}
      <SubmitButtonStyled onClick={handleFormSubmit}>Enviar Respuestas</SubmitButtonStyled>
      {resultsVisible.every(Boolean) && (
        <div>
          <Heading>Resultados</Heading>
          {questions.map((q, qIndex) => (
            <QuestionBlock key={qIndex}>
              <h3>{q.question}</h3>
              {q.type === 'Opción Múltiple' && (
                <OptionsList>
                  {q.options.map((opt, optIndex) => (
                    <OptionItem key={optIndex} style={{ color: q.correctAnswer === opt ? 'green' : 'red' }}>
                      {opt}
                    </OptionItem>
                  ))}
                </OptionsList>
              )}
              {q.type === 'Falso/Verdadero' && (
                <OptionsList>
                  <OptionItem style={{ color: q.correctAnswer.toLowerCase() === 'verdadero' ? 'green' : 'red' }}>
                    Verdadero
                  </OptionItem>
                  <OptionItem style={{ color: q.correctAnswer.toLowerCase() === 'falso' ? 'green' : 'red' }}>
                    Falso
                  </OptionItem>
                </OptionsList>
              )}
              {q.type === 'Pregunta Abierta' && (
                <div>
                  <p>Tu respuesta: {userResponses[qIndex]}</p>
                  <ResultText isCorrect={evaluateResponse(q, userResponses[qIndex])}>
                    {evaluateResponse(q, userResponses[qIndex]) ? 'Correcto' : 'Incorrecto'}
                  </ResultText>
                </div>
              )}
            </QuestionBlock>
          ))}
        </div>
      )}
    </PreviewWrapper>
  );
};

export default QuizPreview;
