import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Circle, Stage} from 'react-konva';

class MyCircle extends React.Component {
  state = { color: 'green' };

  handleClick = () => {
    // window.Konva is a global variable for Konva framework namespace
    this.setState({
      color: window.Konva.Util.getRandomColor()
    });
  }

  render() {
    return (
      <Circle
        x={20}
        y={20}
        width={25}
        height={25}
        fill={this.state.color}
        onClick={this.handleClick}
      />
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Stage width={700} height={700}>
        <Layer>
          <MyCircle />
        </Layer>
      </Stage>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));