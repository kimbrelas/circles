import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage} from 'react-konva';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

import { joinGame } from './api';
import { claimCircle } from './api';

class GridCircle extends React.Component {	
	// render a single circle
	render() {
		return (
			<Circle
				x={this.props.x}
				y={this.props.y}
				width={this.props.width}
				height={this.props.height}
				fill={this.props.color}
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

class PlayerCount extends React.Component {
	render() {
		return (
			<h6>{this.props.count} Players Online</h6>
		);
	}
}

class App extends React.Component {
	state = {};
	
	constructor() {
		super();
		
		joinGame((err, data) => this.setState(data));
		
		this.state = {
			canvas:   this.getCanvas(),
			circles:  [],
			playerId: null,
			playerCount: 0
		};
	}
	
	getCanvas = () => {
		var container = document.getElementById('container');
		var styles    = window.getComputedStyle(container);
		var padding   = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
		
		var canvas = {};
		canvas.width        = container.offsetWidth - padding;
		canvas.height       = (canvas.width/16)*9;
		canvas.circleSize   = canvas.width / 20;
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
			if(this.state.circles[i].playerId === this.state.playerId) {
				count++;
			}
		}
		
		return count;
	};
	
	getCircleColor = (circlePlayerId) => {
		var color;
		
		if(circlePlayerId === this.state.playerId) {
			// my circles are dark blue
			color = '#000080';
		} else if(circlePlayerId === null) {
			// empty circles are gray
			color = '#c0c0c0';
		} else {
			// other players' circles are light blue
			color = '#ADD8E6';
		}
		
		return color;
	}
	
	// when a circle is clicked
	handleCircleClick = (key) => {
		var circles = this.state.circles;
		
		if(circles[key].playerId === this.state.playerId) {
			claimCircle(key);
		} else if(circles[key].playerId === null) {
			// if the circle was empty and the user has selected less than 10 circles, make it mine
			if(this.countMine() < 10) {
				claimCircle(key);
			} else {
				// if
				this.toastr.warning(
					null,
					"Whoa there! Let's not get greedy, now.", {
					timeOut: 3000,
					extendedTimeOut: 3000
			    });
				return;
			}
		} else {
			// if the circle is already taken by someone else, alert and do nothing
			this.toastr.warning(
				null,
				"Looks like someone else has already staked a claim to this circle.", {
				timeOut: 3000,
				extendedTimeOut: 3000
		    });
		}
	}
	
	// render canvas & all circles
	render() {
		// loop over circles array and add each to the canvas
		var circles = this.state.circles.map(function(circle,key) {
			return <GridCircle key={key} id={key} color={this.getCircleColor(circle.playerId)} x={circle.x*this.state.canvas.circleOffset} y={circle.y*this.state.canvas.circleOffset} width={this.state.canvas.circleSize} height={this.state.canvas.circleSize} handleClick={this.handleCircleClick} />;
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
				<h6>{this.state.timestamp}</h6>	
				<Counter count={this.countMine()} />
				<PlayerCount count={this.state.playerCount} />
				<ToastContainer ref={(input) => {this.toastr = input;}} toastMessageFactory={ToastMessageFactory} className={"toast-top-right"} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
