import React from "react";

class RedButton extends React.Component {
	render() {
		const divStyle = {
			margin: "auto",
			width: "200px"
		};

		const buttonStyle = {
			backgroundColor: "#62010C",
			border: "none",
			color: "white",
			textAlign: "center",
			textDecoration: "none",
			display: "inline-block",
			fontSize: "26px",
			width: "200px"
		};
		return (
			<div style={divStyle} className="mx-auto">
				<button style={buttonStyle}> Log In </button>
			</div>
		);
	}
}

export default RedButton;
