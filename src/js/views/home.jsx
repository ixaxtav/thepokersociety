/* global $ */
import React from "react";
import { Link } from "react-router-dom";
import pokerImg from "../../img/poker-society.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext.jsx";

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
							"nav-link submenu-toggle btn btn-light dropdown-toggle text-center mx-auto " +
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

export class Home extends React.Component {
	componentDidMount() {
		$(".dropdown-toggle, .submenu-toggle").click(function(e) {
			$(this).toggleClass("open");
			$(this)
				.siblings(".dropdown-menu")
				.toggleClass("show");
		});
	}

	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					return (
						<div
							className="container-fluid"
							style={{
								height: "100vh",
								backgroundColor: "black"
							}}>
							<div
								className="text-white"
								style={{
									backgroundImage: `url(${pokerImg})`,
									height: "100%",
									backgroundSize: "auto",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center"
								}}>
								<div className="row">
									<div className="col p-0">
										<h5 className=" bg-light lobster text-center pt-2 m-0">
											Select A Calendar
										</h5>
									</div>
								</div>

								<div className="row">
									<div className="col p-0">
										<nav className="navbar navbar-expand-lg navbar-light bg-light select-tournament opensans  ">
											<div
												className="collapse navbar-collapse show active"
												id="navbarTogglerDemo03">
												{" "}
												<ul className="navbar-nav m-auto">
													{menuChilds(
														store.menu,
														itemId =>
															actions.openMenuItem(
																itemId
															)
													)}
												</ul>
											</div>
										</nav>
									</div>
								</div>
							</div>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}
