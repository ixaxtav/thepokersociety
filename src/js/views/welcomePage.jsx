/* global $ */
import React from "react";
import { Link } from "react-router-dom";
import pokerImg from "../../img/poker-society.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext.jsx";

export class WelcomePage extends React.Component {
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					return (
						<div className="home text-white text-center">
							<div className="lobster row h-100">
								<div className="col my-auto">
									{" "}
									<h1 style={{ fontSize: "52px" }}>
										WELCOME
									</h1>
									<h2 style={{ fontSize: "36px" }}>
										{" "}
										Select A Calendar:
									</h2>
								</div>
							</div>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}
