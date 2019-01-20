import React from "react";
import { Link } from "react-router-dom";
import RedButton from "../component/RedButton.jsx";
import "../../styles/login.css";
import { Context } from "../store/appContext.jsx";

export class MyAccount extends React.Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: ""
		};
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => (
					<div className="container ">
						<h3 className="text-center"> My Account </h3>

						<div className="text-center pt-2 pb-2">
							<input
								className="inputStyle"
								type="text"
								placeholder="Name"
								onChange={e =>
									this.setState({ firstName: e.target.value })
								}
								value={this.state.firstName}
								name="firstName"
							/>
						</div>

						<div className="text-center pt-2 pb-2">
							<input
								className="inputStyle"
								type="text"
								placeholder="Last Name"
								onChange={e =>
									this.setState({ lastName: e.target.value })
								}
								value={this.state.lastName}
								name="lastName"
							/>
						</div>

						<div className="text-center pt-2 pb-2">
							<input
								className="inputStyle"
								type="email"
								placeholder="Email"
								onChange={e =>
									this.setState({ email: e.target.value })
								}
								value={this.state.email}
								name="email"
							/>
						</div>

						<div className="text-center pt-2">
							<input
								className="inputStyle"
								type="password"
								placeholder="*****"
								onChange={e =>
									this.setState({ password: e.target.value })
								}
								value={this.state.password}
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
						<RedButton to="/profile" label="Update Information" />
					</div>
				)}
			</Context.Consumer>
		);
	}
}
