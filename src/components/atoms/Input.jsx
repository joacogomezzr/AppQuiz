import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 12px;
  margin: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
  }
`;

const Input = ({ type, placeholder, value, onChange }) => (
  <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} />
);

export default Input;
