import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Circle, Stage} from 'react-konva';

class GridCircle extends React.Component {	
	// get the circle color for the current status
	getColor = () => {
		var statusColor = {
			'empty':  '#c0c0c0',
			'mine':   '#000080',
			'theirs': '#ADD8E6'
		};
		
		return statusColor[this.props.status];
	}
	
	// render a single circle
	render() {
		return (
			<Circle
				x={this.props.x}
				y={this.props.y}
				width={40}
				height={40}
				fill={this.getColor()}
				onClick={() => this.props.handleClick(this)}
				onTouchStart={() => this.props.handleClick(this)}
			/>
		);
	}
}

class Counter extends React.Component {
	render() {
		return (
			<h2>{this.props.count}</h2>
		);
	}
}

class App extends React.Component {
	state = {
		circles: [
			{ status:'empty', x:1, y:1 },
			{ status:'empty', x:2, y:1 },
			{ status:'empty', x:3, y:1 },
			{ status:'empty', x:4, y:1 },
			{ status:'empty', x:5, y:1 },
			{ status:'empty', x:6, y:1 },
			{ status:'empty', x:7, y:1 },
			{ status:'theirs', x:8, y:1 },
			{ status:'theirs', x:9, y:1 },
			{ status:'theirs', x:10, y:1 },
			{ status:'empty', x:11, y:1 },
			{ status:'empty', x:12, y:1 },
			{ status:'empty', x:13, y:1 },
			{ status:'empty', x:14, y:1 },
			{ status:'empty', x:15, y:1 },
			{ status:'empty', x:16, y:1 },
			{ status:'empty', x:17, y:1 },
			{ status:'empty', x:18, y:1 },
			{ status:'empty', x:19, y:1 },
			{ status:'empty', x:20, y:1 },
			{ status:'empty', x:21, y:1 },
			{ status:'empty', x:22, y:1 },
			{ status:'empty', x:23, y:1 },
			{ status:'theirs', x:24, y:1 },
			{ status:'theirs', x:25, y:1 },
			{ status:'theirs', x:1, y:2 },
			{ status:'empty', x:2, y:2 },
			{ status:'empty', x:3, y:2 },
			{ status:'empty', x:4, y:2 },
			{ status:'empty', x:5, y:2 },
			{ status:'empty', x:6, y:2 },
			{ status:'theirs', x:7, y:2 },
			{ status:'empty', x:8, y:2 },
			{ status:'empty', x:9, y:2 },
			{ status:'theirs', x:10, y:2 },
			{ status:'empty', x:11, y:2 },
			{ status:'empty', x:12, y:2 },
			{ status:'empty', x:13, y:2 },
			{ status:'empty', x:14, y:2 },
			{ status:'empty', x:15, y:2 },
			{ status:'empty', x:16, y:2 },
			{ status:'empty', x:17, y:2 },
			{ status:'empty', x:18, y:2 },
			{ status:'empty', x:19, y:2 },
			{ status:'theirs', x:20, y:2 },
			{ status:'theirs', x:21, y:2 },
			{ status:'theirs', x:22, y:2 },
			{ status:'theirs', x:23, y:2 },
			{ status:'empty', x:24, y:2 },
			{ status:'empty', x:25, y:2 },
			{ status:'empty', x:1, y:3 },
			{ status:'empty', x:2, y:3 },
			{ status:'empty', x:3, y:3 },
			{ status:'theirs', x:4, y:3 },
			{ status:'empty', x:5, y:3 },
			{ status:'empty', x:6, y:3 },
			{ status:'empty', x:7, y:3 },
			{ status:'empty', x:8, y:3 },
			{ status:'empty', x:9, y:3 },
			{ status:'theirs', x:10, y:3 },
			{ status:'empty', x:11, y:3 },
			{ status:'empty', x:12, y:3 },
			{ status:'empty', x:13, y:3 },
			{ status:'theirs', x:14, y:3 },
			{ status:'empty', x:15, y:3 },
			{ status:'empty', x:16, y:3 },
			{ status:'empty', x:17, y:3 },
			{ status:'empty', x:18, y:3 },
			{ status:'empty', x:19, y:3 },
			{ status:'empty', x:20, y:3 },
			{ status:'empty', x:21, y:3 },
			{ status:'empty', x:22, y:3 },
			{ status:'empty', x:23, y:3 },
			{ status:'empty', x:24, y:3 },
			{ status:'empty', x:25, y:3 },
			{ status:'empty', x:1, y:4 },
			{ status:'empty', x:2, y:4 },
			{ status:'empty', x:3, y:4 },
			{ status:'empty', x:4, y:4 },
			{ status:'empty', x:5, y:4 },
			{ status:'theirs', x:6, y:4 },
			{ status:'empty', x:7, y:4 },
			{ status:'empty', x:8, y:4 },
			{ status:'empty', x:9, y:4 },
			{ status:'empty', x:10, y:4 },
			{ status:'empty', x:11, y:4 },
			{ status:'empty', x:12, y:4 },
			{ status:'empty', x:13, y:4 },
			{ status:'empty', x:14, y:4 },
			{ status:'theirs', x:15, y:4 },
			{ status:'theirs', x:16, y:4 },
			{ status:'empty', x:17, y:4 },
			{ status:'empty', x:18, y:4 },
			{ status:'empty', x:19, y:4 },
			{ status:'empty', x:20, y:4 },
			{ status:'empty', x:21, y:4 },
			{ status:'empty', x:22, y:4 },
			{ status:'empty', x:23, y:4 },
			{ status:'empty', x:24, y:4 },
			{ status:'empty', x:25, y:4 },
			{ status:'empty', x:1, y:5 },
			{ status:'theirs', x:2, y:5 },
			{ status:'theirs', x:3, y:5 },
			{ status:'theirs', x:4, y:5 },
			{ status:'theirs', x:5, y:5 },
			{ status:'empty', x:6, y:5 },
			{ status:'theirs', x:7, y:5 },
			{ status:'empty', x:8, y:5 },
			{ status:'empty', x:9, y:5 },
			{ status:'empty', x:10, y:5 },
			{ status:'empty', x:11, y:5 },
			{ status:'empty', x:12, y:5 },
			{ status:'empty', x:13, y:5 },
			{ status:'empty', x:14, y:5 },
			{ status:'empty', x:15, y:5 },
			{ status:'empty', x:16, y:5 },
			{ status:'empty', x:17, y:5 },
			{ status:'empty', x:18, y:5 },
			{ status:'theirs', x:19, y:5 },
			{ status:'theirs', x:20, y:5 },
			{ status:'empty', x:21, y:5 },
			{ status:'theirs', x:22, y:5 },
			{ status:'empty', x:23, y:5 },
			{ status:'empty', x:24, y:5 },
			{ status:'empty', x:25, y:5 },
			{ status:'empty', x:1, y:6 },
			{ status:'empty', x:2, y:6 },
			{ status:'empty', x:3, y:6 },
			{ status:'empty', x:4, y:6 },
			{ status:'theirs', x:5, y:6 },
			{ status:'empty', x:6, y:6 },
			{ status:'theirs', x:7, y:6 },
			{ status:'empty', x:8, y:6 },
			{ status:'theirs', x:9, y:6 },
			{ status:'empty', x:10, y:6 },
			{ status:'empty', x:11, y:6 },
			{ status:'empty', x:12, y:6 },
			{ status:'empty', x:13, y:6 },
			{ status:'theirs', x:14, y:6 },
			{ status:'theirs', x:15, y:6 },
			{ status:'empty', x:16, y:6 },
			{ status:'empty', x:17, y:6 },
			{ status:'empty', x:18, y:6 },
			{ status:'empty', x:19, y:6 },
			{ status:'empty', x:20, y:6 },
			{ status:'empty', x:21, y:6 },
			{ status:'empty', x:22, y:6 },
			{ status:'theirs', x:23, y:6 },
			{ status:'empty', x:24, y:6 },
			{ status:'theirs', x:25, y:6 },
			{ status:'empty', x:1, y:7 },
			{ status:'empty', x:2, y:7 },
			{ status:'empty', x:3, y:7 },
			{ status:'empty', x:4, y:7 },
			{ status:'empty', x:5, y:7 },
			{ status:'empty', x:6, y:7 },
			{ status:'empty', x:7, y:7 },
			{ status:'empty', x:8, y:7 },
			{ status:'theirs', x:9, y:7 },
			{ status:'theirs', x:10, y:7 },
			{ status:'theirs', x:11, y:7 },
			{ status:'theirs', x:12, y:7 },
			{ status:'empty', x:13, y:7 },
			{ status:'theirs', x:14, y:7 },
			{ status:'theirs', x:15, y:7 },
			{ status:'empty', x:16, y:7 },
			{ status:'empty', x:17, y:7 },
			{ status:'empty', x:18, y:7 },
			{ status:'empty', x:19, y:7 },
			{ status:'empty', x:20, y:7 },
			{ status:'empty', x:21, y:7 },
			{ status:'empty', x:22, y:7 },
			{ status:'empty', x:23, y:7 },
			{ status:'empty', x:24, y:7 },
			{ status:'theirs', x:25, y:7 },
			{ status:'theirs', x:1, y:8 },
			{ status:'empty', x:2, y:8 },
			{ status:'empty', x:3, y:8 },
			{ status:'empty', x:4, y:8 },
			{ status:'empty', x:5, y:8 },
			{ status:'empty', x:6, y:8 },
			{ status:'empty', x:7, y:8 },
			{ status:'empty', x:8, y:8 },
			{ status:'empty', x:9, y:8 },
			{ status:'theirs', x:10, y:8 },
			{ status:'theirs', x:11, y:8 },
			{ status:'empty', x:12, y:8 },
			{ status:'theirs', x:13, y:8 },
			{ status:'empty', x:14, y:8 },
			{ status:'empty', x:15, y:8 },
			{ status:'empty', x:16, y:8 },
			{ status:'empty', x:17, y:8 },
			{ status:'empty', x:18, y:8 },
			{ status:'empty', x:19, y:8 },
			{ status:'empty', x:20, y:8 },
			{ status:'empty', x:21, y:8 },
			{ status:'empty', x:22, y:8 },
			{ status:'theirs', x:23, y:8 },
			{ status:'theirs', x:24, y:8 },
			{ status:'empty', x:25, y:8 },
			{ status:'theirs', x:1, y:9 },
			{ status:'empty', x:2, y:9 },
			{ status:'empty', x:3, y:9 },
			{ status:'empty', x:4, y:9 },
			{ status:'empty', x:5, y:9 },
			{ status:'empty', x:6, y:9 },
			{ status:'empty', x:7, y:9 },
			{ status:'empty', x:8, y:9 },
			{ status:'theirs', x:9, y:9 },
			{ status:'theirs', x:10, y:9 },
			{ status:'theirs', x:11, y:9 },
			{ status:'empty', x:12, y:9 },
			{ status:'empty', x:13, y:9 },
			{ status:'empty', x:14, y:9 },
			{ status:'empty', x:15, y:9 },
			{ status:'empty', x:16, y:9 },
			{ status:'empty', x:17, y:9 },
			{ status:'empty', x:18, y:9 },
			{ status:'empty', x:19, y:9 },
			{ status:'theirs', x:20, y:9 },
			{ status:'empty', x:21, y:9 },
			{ status:'empty', x:22, y:9 },
			{ status:'empty', x:23, y:9 },
			{ status:'empty', x:24, y:9 },
			{ status:'empty', x:25, y:9 },
		]
	};
	
	countMine = () => {
		var count = 0;
		
		for(var i = 0; i < this.state.circles.length; i++) {
			if(this.state.circles[i].status === 'mine') {
				count++;
			}
		}
		
		return count;
	};
	
	// when a circle is clicked
	handleCircleClick = (gridCircle) => {
		var circles = this.state.circles;
		var key = gridCircle.props.id;
		
		// if the circle is not already taken by someone else
		if(circles[key].status !== 'theirs') {
			if(circles[key].status === 'mine') {
				// if the circle was mine, make it empty
				circles[key].status = 'empty';
			} else {
				// if the user has selected less than 10 circles
				if(this.countMine() < 10) {
					// if the circle was empty, make it mine
					circles[key].status = 'mine';
				} else {
					alert('Whoa there! Let\'s not get greedy, now.');
					return;
				}
			}
			
			this.setState({
				circles: circles
			});
		} else {
			alert('Looks like someone else has already staked a claim this circle.');
		}
	}
	
	// render canvas & all circles
	render() {
		// loop over circles array and add each to the canvas
		var circles = this.state.circles.map(function(circle,key) {
			return <GridCircle key={key} id={key} status={circle.status} x={circle.x*50} y={circle.y*50} handleClick={this.handleCircleClick} />;
		}.bind(this));
		
		// output canvas
		return (
			<div>
				<Stage width={1300} height={500}>
					<Layer>
						{circles}
					</Layer>
				</Stage>
				<Counter count={this.countMine()} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));