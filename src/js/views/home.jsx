import React from "react";
import { Link } from "react-router-dom";
import pokerImg from "../../img/poker-society.jpg";
import "../../styles/home.css";

export class Home extends React.Component {
	state = {
		isOpen: false
	};

	toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

	render() {
		const menuClass = `dropdown-menu${
			this.state.isOpen ? " show" : ""
		} text-center`;
		return (
			<div clasNames="container">
				<div className="row">
					<div className="col-sm">
						<div className="dropdown" onClick={this.toggleOpen}>
							<button
								className="btn btn-light btn-lg btn-block dropdown-toggle"
								type="button"
								id="dropdownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true">
								Ft.Lauderdale - Miami
							</button>
							<div
								className={menuClass}
								aria-labelledby="dropdownMenuButton">
								<a
									className="dropdown-item"
									href="/calendar/109025">
									January 2019
								</a>
								<a
									className="dropdown-item"
									href="/calendar/117083">
									February 2019
								</a>
								<a
									className="dropdown-item"
									href="/calendar/117416">
									March 2019
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="fill">
					<img src={pokerImg} alt="" />
				</div>
			</div>
		);
	}
}
