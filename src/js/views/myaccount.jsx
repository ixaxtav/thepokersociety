import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import "../../styles/login.css";

export class MyAccount extends React.Component {
	render() {
		return (
			<div className="container ">
				<h3 className="text-center"> My Account </h3>

				<div className="text-center pt-2 pb-2">
					<input
						className="inputStyle"
						type="text"
						placeholder="Lou"
						value=""
						name="firstName"
					/>
				</div>

				<div className="text-center pt-2 pb-2">
					<input
						className="inputStyle"
						type="text"
						placeholder="Stoudler"
						value=""
						name="lastName"
					/>
				</div>

				<div className="text-center pt-2 pb-2">
					<input
						className="inputStyle"
						type="email"
						placeholder="lou@gmail.com"
						value=""
						name="email"
					/>
				</div>

				<div className="text-center pt-2">
					<input
						className="inputStyle"
						type="password"
						placeholder="*****"
						value=""
						name="password"
					/>
				</div>
				<div className="row text-center">
					<div
						className="col pb-4"
						style={{ color: "#990000", fontSize: "14px" }}>
						change my password
					</div>
				</div>
				<RedButton />
			</div>
		);
	}
}
