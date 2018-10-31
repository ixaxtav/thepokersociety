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
				<Link to={this.props.to}>
					<button style={buttonStyle}> {this.props.label} </button>
				</Link>
			</div>
		);
	}
}

RedButton.propTypes = {
	label: PropTypes.string,
	to: PropTypes.string
};

export default RedButton;
