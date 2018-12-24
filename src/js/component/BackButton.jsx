import React from "react";
import { Link } from "react-router-dom";

class BackButton extends React.Component {
	render() {
		const divBackStyle = {
			margin: "auto",
			width: "250px"
		};

		const buttonBackStyle = {
			color: "black",
			textTransform: "uppercase",
			background: "#ffffff",
			padding: "10px",
			border: "1px solid gray",
			display: "inline-block"
		};
		return (
			<div style={divBackStyle}>
				<Link to="/calendar/109584">
					<button style={buttonBackStyle}>
						<span className="fas fa-undo-alt" /> Back to the
						tournament{" "}
					</button>
				</Link>
			</div>
		);
	}
}

export default BackButton;
