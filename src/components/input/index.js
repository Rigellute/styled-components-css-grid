import React from 'react';
import styled from 'styled-components';
import Text from '../text';

const StyledInput = styled.input`
  margin: ${({ margin }) => margin || '0em'};
  width: 100%;
  outline: none;
  text-align: left;
  line-height: 1.21428571em;
  padding: 0.67857143em 1em;
  background: #ffffff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0.28571429rem;
  transition: box-shadow 0.1s ease, border-color 0.1s ease;
  box-shadow: none;
`;

export default function Input(props) {
  return (
    <div>
      {props.label ? (
        <Text marginRight="1em">{props.label}</Text>
      ) : null}
      <StyledInput {...props} />
    </div>
  );
}

Input.propTypes = {
  label: React.PropTypes.string,
};

Input.defaultProps = {
  label: '',
};
