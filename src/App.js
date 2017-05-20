// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors, styles } from './styles';
import Input from './components/input';
import Text from './components/text';

function getCols({ numberOfColumns, children }) {
  if (/^[0-9]*$/.test(numberOfColumns)) {
    return `repeat(${numberOfColumns}, 1fr)`;
  }

  if (typeof numberOfColumns === 'string') {
    return numberOfColumns;
  }

  return `repeat(${children.length}, 1fr)`;
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${getCols};
  grid-column-gap: 3em;
  grid-row-gap: 3em;
  grid-auto-rows: minmax(100px, auto);
  margin: ${({ margin }) => margin || 0};
`;

const Column = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
  margin: 0 5vw;
`;

class App extends Component {

  state = {
    numberOfColumns: '',
    numberOfSquares: '6',
  };

  numberToArray() {
    return Array(parseInt(this.state.numberOfSquares, 10)).fill(0).map((_, i) => i);
  }

  render() {
    return (
      <Container>
        <Header>CSS Grid with <code>styled-components</code></Header>
        <GridContainer margin="4em">
          <Column>
            <div>
              <Input
                label="Number of columns"
                placeholder="auto"
                min={1}
                value={this.state.numberOfColumns}
                margin="1em 0"
                onChange={({ target: { value } }) => this.setState({ numberOfColumns: value })}
              />
              <Text>
                Pass a single number (e.g. <code>2</code>) or valid grid unit accepted by
                &nbsp;<code>grid-template-columns</code> (e.g. <code>3fr 2fr 1fr</code>)
              </Text>
            </div>
          </Column>
          <Column>
            <Input
              label="Number of columns"
              type="number"
              placeholder="Items per column"
              value={this.state.numberOfSquares}
              min={1}
              margin="1em 0"
              onChange={({ target: { value } }) => this.setState({ numberOfSquares: value })}
            />
          </Column>
        </GridContainer>
        <GridContainer numberOfColumns={this.state.numberOfColumns} margin="4em">
          {this.numberToArray().map(k => (
            <Column key={k}>
              <Square />
            </Column>
          ))}
        </GridContainer>
      </Container>
    );
  }
}

export default App;
