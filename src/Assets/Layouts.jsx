import styled from 'styled-components';

export const FlexedRow = styled.div`
  display: flex;
  flex-direction: row;
`;
export const FlexedCol = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Button = styled.button`
  cursor: pointer;
  width: 10%;
  margin: 0px 8px 5px;
  border-radius: 5px;
  border-width: 0.2px;
  &:hover {
    background-color: hsla(0, 0%, 100%, 0.32);
    transition: background 85ms ease-in, opacity 40ms ease-in,
      border-color 85ms ease-in;
  }
`;
export const TextArea = styled.textarea`
  padding: 10px;
  border: none;
  outline: none;
  resize: none;
`;
export const Input = styled.input`
  padding: 10px;
  border: none;
  outline: none;
`;
