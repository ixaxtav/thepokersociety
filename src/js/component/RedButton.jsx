import React from "react";

class RedButton extends React.Component {
	render() {
		const divStyle = {
			margin: "auto",
			width: "250px"
		};

		const buttonStyle = {
			backgroundColor: "#62010C",
			border: "none",
			color: "white",
			textAlign: "center",
			textDecoration: "none",
			display: "inline-block",
			fontSize: "26px",
			width: "250px"
		};
		return (
			<div style={divStyle}>
				<button style={buttonStyle}> Login </button>
			</div>
		);
	}
}

export default RedButton;
