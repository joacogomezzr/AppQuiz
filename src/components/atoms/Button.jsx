import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 12px 24px;
  margin: 8px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }
  
  &:active {
    background-color: #1e7e34;
    transform: scale(0.95);
  }
`;

const Button = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;
