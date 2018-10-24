import React from "react";

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
				<button style={buttonBackStyle}>
					<span className="fas fa-undo-alt" /> Back to the tournament{" "}
				</button>
			</div>
		);
	}
}

export default BackButton;
