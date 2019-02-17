import React from "react";
import pokerIcon from "../../img/pokericon.png";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import { Session } from "bc-react-session";
import "../../styles/home.css";
import PropTypes from "prop-types";

export default class Navbar extends React.Component {
	constructor() {
		super();
		this.state = {
			showNavbar: false
		};
	}

	render() {
		const collapseClass = this.state.showNavbar ? "show" : "";
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					const session = Session.get();
					return (
						<nav
							className="lobster main-navbar navbar navbar-light bg-light pb-2"
							style={this.props.navBarStyle}>
							<Link className="navbar-brand" to="/">
								<img className="mr-2" src={pokerIcon} />
								The Poker Society
							</Link>
							<button
								className="navbar-toggler"
								type="button"
								data-toggle="collapse"
								data-target="#navbarNav"
								aria-controls="navbarNav"
								aria-expanded="false"
								aria-label="Toggle navigation"
								onClick={() =>
									this.setState({
										showNavbar: !this.state.showNavbar
									})
								}>
								<span className="navbar-toggler-icon" />
							</button>
							<div
								className={
									"collapse navbar-collapse " + collapseClass
								}
								id="navbarNav">
								<ul className="navbar-nav">
									<li className="nav-item">
										<NavLink className="nav-link" to="/">
											Home
										</NavLink>
									</li>
									<li>
										<a
											className="nav-link"
											href="mailto:info@thepokersociety.com">
											Contact Us
										</a>
									</li>
									<li className="nav-item">
										<NavLink
											className="nav-link"
											to="/profile">
											Profile
										</NavLink>
									</li>
									<li className="nav-item">
										{session.isValid ? (
											<a
												href="#"
												className="nav-link"
												onClick={() =>
													actions.logout()
												}>
												Log Out
											</a>
										) : (
											<Link
												to="/login"
												className="nav-link">
												Log In
											</Link>
										)}
									</li>
								</ul>
							</div>
						</nav>
					);
				}}
			</Context.Consumer>
		);
	}
}

Navbar.propTypes = {
	navBarStyle: PropTypes.object
};
