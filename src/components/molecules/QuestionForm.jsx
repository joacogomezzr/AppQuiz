import React, { useState } from 'react';
import InputField from '../atoms/Input';
import Button from '../atoms/Button';
import styled from 'styled-components';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
   padding: 12px 16px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  width: 100%; 
  box-sizing: border-box; 
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  background-color: #fff; 
`;

const QuestionForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("Falso/Verdadero");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);  //"Opción Múltiple"
  const [openAnswer, setOpenAnswer] = useState(""); // Para la respuesta de "Pregunta Abierta"

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      type: questionType,
      correctAnswer: questionType === 'Pregunta Abierta' ? openAnswer : correctAnswer,
      options: questionType === 'Opción Múltiple' ? options : null,
    };
    onAddQuestion(newQuestion);
    setQuestion('');
    setQuestionType('Falso/Verdadero');
    setCorrectAnswer('');
    setOptions(["", "", "", ""]);
    setOpenAnswer('');
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Pregunta:</Label>
          <InputField type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Tipo:</Label>
          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
            <option value="Falso/Verdadero">Falso/Verdadero</option>
            <option value="Opción Múltiple">Opción Múltiple</option>
            <option value="Pregunta Abierta">Pregunta Abierta</option>
          </select>
        </FormGroup>
        {questionType === 'Falso/Verdadero' && (
          <FormGroup>
            <Label>Respuesta Correcta:</Label>
            <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required>
              <option value="">Seleccionar</option>
              <option value="Verdadero">Verdadero</option>
              <option value="Falso">Falso</option>
            </select>
          </FormGroup>
        )}
        {questionType === 'Opción Múltiple' && (
          <>
            {options.map((option, index) => (
              <FormGroup key={index}>
                <Label>Opción {index + 1}:</Label>
                <InputField type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
              </FormGroup>
            ))}
            <FormGroup>
              <Label>Respuesta Correcta:</Label>
              <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required>
                <option value="">Seleccionar</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormGroup>
          </>
        )}
        {questionType === 'Pregunta Abierta' && (
          <FormGroup>
            <Label>Respuesta Correcta:</Label>
            <InputField type="text" value={openAnswer} onChange={(e) => setOpenAnswer(e.target.value)} required />
          </FormGroup>
        )}
        <Button type="submit">Agregar Pregunta</Button>
      </form>
    </FormWrapper>
  );
};

export default QuestionForm;
