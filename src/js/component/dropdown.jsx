import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

class FilterDropdown extends React.Component {
	render() {
		return (
			<div className="dropdown">
				<button
					className="btn btn-secondary dropdown-toggle"
					type="button"
					id="dropdownMenu2"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false">
					Dropdown
				</button>
				<div className="dropdown-menu" aria-labelledby="dropdownMenu2">
					<button className="dropdown-item" type="button">
						Filter
					</button>
					<button className="dropdown-item" type="button">
						Date
					</button>
					<button className="dropdown-item" type="button">
						Time
					</button>
					<button className="dropdown-item" type="button">
						Where
					</button>
					<button className="dropdown-item" type="button">
						Tournament
					</button>
					<button className="dropdown-item" type="button">
						Buy in
					</button>
					<button className="dropdown-item" type="button">
						Starting Stack
					</button>
					<button className="dropdown-item" type="button">
						Blinds
					</button>
				</div>
			</div>
		);
	}
}

export default FilterDropdown;
