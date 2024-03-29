import React from 'react';
import ReactDOM from 'react-dom';
import {Layer, Rect, Circle, Stage} from 'react-konva';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

import { joinGame } from './api';
import { toggleCircle } from './api';

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

class App extends React.Component {
	state = {};
	
	constructor() {
		super();
		
		// join game and route data to callbacks below
		joinGame((callback,data) => this[callback](data)); 
		
		this.state = {
			canvas:   this.getCanvas(),
			circles:  [],
			playerId: null,
			playerCount: 1
		};
	}
	
	// responsive canvas
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
	
	// callbacks
	playerJoined = (data) => {
		this.setState(data);
		
		this.toastr.success(
			null,
			"Player Joined.", {
			timeOut: 1000,
			extendedTimeOut: 1000
	    });
	};
	
	playerQuit = (data) => {
		this.setState(data);
		
		this.toastr.success(
			null,
			"Player Left.", {
			timeOut: 1000,
			extendedTimeOut: 1000
	    });
	};
	
	toggledCircle = (data) => {
		this.setState(data);
	};
	
	joinedGame = (data) => {
		this.setState(data);
		
		this.toastr.success(
			null,
			"Welcome to Round Up 10. Tap any available circle to begin. Light blue circles have already been claimed by other players.", {
			timeOut: 6000,
			extendedTimeOut: 6000,
			closeButton: true
	    });
	};
	
	// responsive canvas
	componentDidMount() {
		window.addEventListener("resize", this.updateCanvas.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateCanvas.bind(this));
	}
	
	// returns a count of this player's selected circles
	countMine = () => {
		var count = 0;
		
		for(var i = 0; i < this.state.circles.length; i++) {
			if(this.state.circles[i].playerId === this.state.playerId) {
				count++;
			}
		}
		
		return count;
	};
	
	// returns the color the circle should be for this player
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
			toggleCircle(key);
		} else if(circles[key].playerId === null) {
			// if the circle was empty and the user has selected less than 10 circles, make it mine
			if(this.countMine() < 10) {
				toggleCircle(key);
			} else {
				// if
				this.toastr.warning(
					null,
					"Whoa there! You've already got 10 circles. Let's not get greedy, now.", {
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
			<div>
				<div className="row">
					<div className="five columns">
						<h1>Round Up 10</h1>
					</div>
				</div>
				<div className="row">		
					<Stage width={this.state.canvas.width} height={this.state.canvas.height}>
						<Layer>
							<Rect x={0} y={0} width={this.state.canvas.width} height={this.state.canvas.height} fill={'#f5f5f5'} />
							{circles}
						</Layer>
					</Stage>
					<h6>{this.state.timestamp}</h6>
					<ToastContainer ref={(input) => {this.toastr = input;}} toastMessageFactory={ToastMessageFactory} className={"toast-top-right"} />
				</div>
				<div className="row">
					<div className="five columns">
						<small>Circles: {this.countMine()} / 10</small>
						<br />
						<small>Players: {this.state.playerCount}</small>
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
