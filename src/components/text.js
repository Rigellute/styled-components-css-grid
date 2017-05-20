import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors } from '../styles';

export default styled.text`
  color: ${transparentize(0.25, colors.secondary)};
  margin: ${({ margin }) => margin};
  margin-right: ${({ marginRight }) => marginRight}
`;
