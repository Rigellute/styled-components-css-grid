// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { transparentize, lighten } from 'polished';
import { colors, styles } from './styles';
import Input from './components/input';
// import Text from './components/text';

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

const Code = styled.code`
  color: ${transparentize(0.25, colors.secondary)};
  padding: 1em;
  border-radius: ${styles.borderRadius};
  font-family: Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
  white-space: pre;
  background: ${lighten(0.1, colors.primary)};
`;

class App extends Component {

  state = {
    numberOfColumns: '6fr 3fr 1fr',
    numberOfSquares: '6',
    minSize: '200',
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
              label="Column layout or number of columns"
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
        <GridContainer numberOfColumns={this.state.numberOfColumns} margin="4em">
          {this.numberToArray().map(k => (
            <Column key={k} justifyContent="center">
              <Square />
            </Column>
          ))}
        </GridContainer>
        <Header>
          Responsive example:
        </Header>
        <div style={{ textAlign: 'center' }}>
          <br />
          <Input
            label="Specify the min width of each item inside the grid container:"
            type="number"
            value={this.state.minSize}
            onChange={({ target: { value } }) => this.setState({ minSize: value })}
          />
        </div>
        <div style={{ textAlign: 'center', margin: '2em 0' }}>
          <Code>grid-template-columns: repeat(auto-fit, minmax({this.state.minSize}px, 1fr))</Code>
        </div>
        <GridContainer numberOfColumns={`repeat(auto-fit, minmax(${this.state.minSize}px, 1fr))`} margin="4em">
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
