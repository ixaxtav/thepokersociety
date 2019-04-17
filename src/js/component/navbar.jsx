/* global $ */
import React from "react";

import { Link, NavLink } from "react-router-dom";
import { Session } from "bc-react-session";
import { Context } from "../store/appContext.jsx";
import pokerIcon from "../../img/pokericon.png";

import "../../styles/home.css";
import PropTypes from "prop-types";

const menuChilds = (menu, onClick) =>
	menu.children.map((item, i) => (
		<div key={i}>
			{typeof item.children == "undefined" ||
			item.children.length == 0 ? (
				<Link className="dropdown-item" to={item.url}>
					{item.title}
				</Link>
			) : (
				<div className="submenu" style={{ position: "relative" }}>
					<button
						className={
							"nav-link submenu-toggle btn btn-light dropdown-toggle text-center mx-auto m-1 " +
							(item.opened ? "open" : "")
						}
						onClick={() => onClick(item.id)}>
						{item.title}
					</button>
					<div
						className={
							"dropdown-menu btn text-center mx-auto mt-2 w-100 " +
							(item.opened ? "show" : "")
						}
						aria-labelledby="navbarDropdown">
						{menuChilds(item, onClick)}
					</div>
				</div>
			)}
		</div>
	));

export default class Navbar extends React.Component {
	constructor() {
		super();
		this.state = {
			showNavbar: false
		};
	}
	componentDidMount() {
		$(".dropdown-toggle, .submenu-toggle").click(function(e) {
			$(this).toggleClass("open");
			$(this)
				.siblings(".dropdown-menu")
				.toggleClass("show");
		});
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
								<ul className="navbar-nav">
									<li className="nav-item">
										{menuChilds(
											store.menu,
											itemId =>
												actions.openMenuItem(itemId),
											actions.resetCalendarID
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
