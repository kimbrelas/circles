import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage} from 'react-konva';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;

var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

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
				width={this.props.width}
				height={this.props.height}
				fill={this.getColor()}
				onClick={() => this.props.handleClick(this.props.id)}
				onTouchStart={() => this.props.handleClick(this.props.id)}
			/>
		);
	}
}

class Counter extends React.Component {
	render() {
		return (
			<h6>{this.props.count} / 10 Selected</h6>
		);
	}
}

class App extends React.Component {
	state = {};
	
	constructor() {
		super();
		
		this.state = {
			canvas: this.getCanvas(),
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
				{ status:'empty', x:15, y:8 }
			]
		};
	}
	
	getCanvas = () => {
		var canvas = {};
		canvas.width = document.getElementById('container').offsetWidth;
		canvas.height = (canvas.width/16)*9;
		canvas.circleSize = canvas.width / 20;
		canvas.circleOffset = canvas.width / 16;
		
		return canvas;	
	};
	
	updateCanvas = () => {
		this.setState({
			canvas: this.getCanvas()
		});
	};
	
	componentDidMount() {
		window.addEventListener("resize", this.updateCanvas.bind(this));
	}
	
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateCanvas.bind(this));
	}
	
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
	handleCircleClick = (key) => {
		var circles = this.state.circles;
		
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
					this.toastr.warning(
						null,
						"Whoa there! Let's not get greedy, now.", {
						timeOut: 3000,
						extendedTimeOut: 3000
				    });
					return;
				}
			}
			
			this.setState({
				circles: circles
			});
		} else {
			this.toastr.warning(
				null,
				"Looks like someone else has already staked a claim this circle.", {
				timeOut: 3000,
				extendedTimeOut: 3000
		    });
		}
	}
	
	// render canvas & all circles
	render() {
		// loop over circles array and add each to the canvas
		var circles = this.state.circles.map(function(circle,key) {
			return <GridCircle key={key} id={key} status={circle.status} x={circle.x*this.state.canvas.circleOffset} y={circle.y*this.state.canvas.circleOffset} width={this.state.canvas.circleSize} height={this.state.canvas.circleSize} handleClick={this.handleCircleClick} />;
		}.bind(this));
		
		// output canvas
		return (
			<div className="row">		
				<Stage width={this.state.canvas.width} height={this.state.canvas.height}>
					<Layer>
						<Rect x={0} y={0} width={this.state.canvas.width} height={this.state.canvas.height} fill={'#f5f5f5'} />
						{circles}
					</Layer>
				</Stage>		
				<Counter count={this.countMine()} />
				<ToastContainer ref={(input) => {this.toastr = input;}} toastMessageFactory={ToastMessageFactory} className={"toast-top-right"} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));