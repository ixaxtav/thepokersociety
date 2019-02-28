import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class BulletsButton extends React.Component {
	render() {
		return (
		    <div>
										<div className="row text-center border-top p-2">
											<div className="col-4">
												<button
													className="btn btn-light"
													onClick={this.props.addBullets}>
													<i
														className="fas fa-plus-circle"
														style={{
															fontSize: "20px",
															verticalAlign:
																"middle"
														}}
													/>
													<span
														style={{
															fontSize: "12px"
														}}>
														{" "}
														Add bullets
													</span>
												</button>
											</div>
											<div className="col-4">
												<button
													className="btn btn-light"
													onClick={this.props.removeBullets}>
													<i
														className="fas fa-minus-circle"
														style={{
															fontSize: "20px",
															verticalAlign:
																"middle"
														}}
													/>
													<span
														style={{
															fontSize: "12px"
														}}>
														{" "}
														Remove bullets
													</span>
												</button>
											</div>
											<div className="col-2" />
											<div className="col-2">
												<button
													className="btn btn-light"
													onClick={this.props.deleteBullet}>
													<i
														className="far fa-trash-alt"
														style={{
															fontSize: "20px",
															verticalAlign:
																"middle"
														}}
													/>
												</button>
											</div>
										</div>
								</div>
								
		);
	}
}
export default BulletsButton;

BulletsButton.propTypes = {
	addBullets: PropTypes.string,
	removeBullets: PropTypes.string,
	deleteBullet: PropTypes.string

};