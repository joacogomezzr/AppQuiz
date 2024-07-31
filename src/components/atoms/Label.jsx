import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  margin: 5px;
  font-weight: bold;
  color: ${props => props.color || 'black'};
  font-size: ${props => props.fontSize || '1em'};
  text-align: ${props => props.textAlign || 'left'};
`;

const Label = ({ htmlFor, color, fontSize, textAlign, children }) => (
  <StyledLabel htmlFor={htmlFor} color={color} fontSize={fontSize} textAlign={textAlign}>
    {children}
  </StyledLabel>
);

export default Label;
