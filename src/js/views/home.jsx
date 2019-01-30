/* global $ */
import React from "react";
import { Link } from "react-router-dom";
import pokerImg from "../../img/poker-society.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext.jsx";

const menuChilds = menu =>
	menu.children.map((item, i) => (
		<div key={i}>
			{typeof item.children == "undefined" ||
			item.children.length == 0 ? (
				<Link className="dropdown-item" to={item.url}>
					{item.title}
				</Link>
			) : (
				<div className="submenu">
					<button className="nav-link submenu-toggle">
						{item.title}
					</button>
					<div
						className="dropdown-menu"
						aria-labelledby="navbarDropdown">
						{menuChilds(item)}
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
						<div>
							<div className="row">
								<div className="col-sm">
									{menuChilds(store.menu)}
								</div>
							</div>
							<div className="fill">
								<img src={pokerImg} alt="" />
							</div>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}
