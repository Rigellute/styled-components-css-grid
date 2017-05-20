// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { colors, styles } from './styles';
import Input from './components/input';
import Text from './components/text';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => console.log(props.numberOfRows) || (props.numberOfRows ?
    `repeat(${props.numberOfRows}, 1fr)` :
    `repeat(${props.children.length}, 1fr)`
  )};
  grid-column-gap: 3em;
  grid-row-gap: 3em;
  grid-auto-rows: minmax(100px, auto);
  margin: ${({ margin }) => margin || 0};
`;

const Column = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Square = styled.div`
  width: 100px;
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
    numberOfRows: '',
    numberOfSquares: '3',
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
            <Input
              label="Number of rows"
              type="number"
              placeholder="Number of rows"
              value={this.state.numberOfRows}
              margin="1em 0"
              onChange={({ target: { value } }) => this.setState({ numberOfRows: value })}
            />
          </Column>
          <Column>
            <Input
              label="Number of columns"
              type="number"
              placeholder="Number of columns"
              value={this.state.numberOfSquares}
              margin="1em 0"
              onChange={({ target: { value } }) => this.setState({ numberOfSquares: value })}
            />
          </Column>
        </GridContainer>
        <GridContainer numberOfRows={this.state.numberOfRows} margin="4em">
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
