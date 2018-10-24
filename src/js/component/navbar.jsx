import React from "react";
import "../../styles/navbar.css";
import pokerIcon from "../../img/pokericon.png";

export class Navbar extends React.Component {
	render() {
		return (
			<div className="container p-0 m-0">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="#">
						<span className="mr-2">
							<img src={pokerIcon} />
						</span>
						The Poker Society
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<a className="nav-link" href="#">
									Home
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">
									Contact
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}
