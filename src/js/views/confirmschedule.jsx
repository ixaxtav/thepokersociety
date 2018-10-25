import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import BackButton from "../component/BackButton.jsx";
import { FilterDropdown } from "../component/dropdown.jsx";

export class Confirmation extends React.Component {
	render() {
		return (
			<div className="container pt-2">
				<h3>To what schedule you want to add this tournament to?</h3>
				<table className="table">
					<tbody>
						<tr>
							<td>Vegas 2012</td>
							<td>$2,600</td>
							<td>
								<i className="fas fa-plus-circle" />
							</td>
						</tr>
					</tbody>
				</table>
				<BackButton />
			</div>
		);
	}
}
