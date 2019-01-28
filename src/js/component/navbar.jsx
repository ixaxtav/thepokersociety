import React from "react";
import "../../styles/navbar.css";
import pokerIcon from "../../img/pokericon.png";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../store/appContext.jsx";
import { Session } from "bc-react-session";

export const Navbar = () => (
	<Context.Consumer>
		{({ store, actions }) => {
			const session = Session.get();
			return (
				<div className=" p-0 m-0">
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<Link className="navbar-brand" to="/">
							<span className="mr-2">
								<img src={pokerIcon} />
							</span>
							The Poker Society
						</Link>

						{store.navbarCollapse != true ? (
							<button
								className="navbar-toggler"
								type="button"
								data-toggle="collapse"
								data-target="#navbarNav"
								aria-controls="navbarNav"
								aria-expanded="false"
								aria-label="Toggle navigation"
								onClick={() => actions.navbarCollapseItems()}>
								<span className="navbar-toggler-icon" />
							</button>
						) : (
							<div
								className=" navbar-collapse justify-content-right"
								id="navbarNav">
								<ul className="navbar-nav">
									<li className="nav-item active">
										<NavLink className="nav-link" to="/">
											Home
										</NavLink>
									</li>
									<li className="nav-item">
										<a
											className="nav-link"
											href="mailto:info@thepokersociety.com">
											{" "}
											Contact Us
										</a>
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

									<li className="nav-item">
										<button
											className="navbar-toggler"
											type="button"
											data-toggle="collapse"
											data-target="#navbarNav"
											aria-controls="navbarNav"
											aria-expanded="false"
											aria-label="Toggle navigation"
											onClick={() =>
												actions.navbarCollapseItems()
											}>
											<span className="fas fa-angle-up" />
										</button>
									</li>
								</ul>
							</div>
						)}
					</nav>
				</div>
			);
		}}
	</Context.Consumer>
);
