import React, { Component } from "react";

export class Footer extends Component {
	render() {
		const footer = {
			position: "fixed",
			bottom: "0",
			width: "100%",
			display: "block"
		};

		return (
			<div style={footer} className="text-center">
				@ The Poker Society {new Date().getFullYear()}{" "}
			</div>
		);
	}
}
