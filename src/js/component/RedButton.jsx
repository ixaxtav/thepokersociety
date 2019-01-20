import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
				<button style={buttonStyle} onClick={this.props.onClick}>
					{" "}
					{this.props.label}{" "}
				</button>
			</div>
		);
	}
}

RedButton.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func
};

export default RedButton;
