// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors, styles } from './styles';
import Input from './components/input';
import Text from './components/text';

function getCols({ numberOfColumns, children }) {
  if (numberOfColumns === 'auto') {
    return `repeat(${children.length}, 1fr)`;
  }
  if (Boolean(numberOfColumns) && /^[0-9]*$/.test(numberOfColumns)) {
    return `repeat(${numberOfColumns}, 1fr)`;
  }

  if (Boolean(numberOfColumns) && typeof numberOfColumns === 'string') {
    return numberOfColumns;
  }

  if (typeof numberOfColumns === 'object') {
    return `repeat(${numberOfColumns.auto || 'auto-fit'}, minmax(${numberOfColumns.width || '200px'}, 1fr))`;
  }

  return `repeat(${children.length}, 1fr)`;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${getCols};
  grid-column-gap: 3em;
  grid-row-gap: 3em;
  grid-auto-rows: auto;
  margin: ${({ margin }) => margin || 0};
`;

const Column = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};;
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
`;

const Square = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${colors.secondary};
  border-radius: ${styles.borderRadius};
`;

const Header = styled.h1`
  color: ${transparentize(0.25, colors.secondary)};
  text-align: center;
  margin: 4em;
`;

const Container = styled.div`
`;

class App extends Component {

  state = {
    numberOfColumns: 'auto',
    numberOfSquares: '6',
  };

  numberToArray() {
    return Array(parseInt(this.state.numberOfSquares, 10) || 1).fill(0).map((_, i) => i);
  }

  render() {
    return (
      <Container>
        <Header>CSS Grid with <code>styled-components</code></Header>
        <GridContainer numberOfColumns="auto" margin="4em">
          <Column justifyContent="center">
            <Input
              label="Number of columns"
              placeholder="auto"
              min={1}
              value={this.state.numberOfColumns}
              margin="1em 0"
              onChange={({ target: { value } }) => this.setState({ numberOfColumns: value })}
            />
          </Column>
          <Column justifyContent="center">
            <Input
              label="Items per row"
              type="number"
              placeholder="Items per row"
              value={this.state.numberOfSquares}
              min={1}
              margin="1em 0"
              onChange={({ target: { value } }) => this.setState({ numberOfSquares: value })}
            />
          </Column>
        </GridContainer>
        <GridContainer hello numberOfColumns={{} || this.state.numberOfColumns} margin="4em">
          {this.numberToArray().map(k => (
            <Column key={k} justifyContent="center">
              <Square />
            </Column>
          ))}
        </GridContainer>
      </Container>
    );
  }
}

export default App;
