import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Tournament extends React.Component {
	getMonthName(month) {
		return [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		][month];
	}

	render() {
		const t = this.props.data;
		const styles = {
			backgroundColor:
				t.buyin.toLowerCase().indexOf("day") == -1 ? "white" : "#f2dede"
		};

		const day = t.date.getDate();
		const month = this.getMonthName(t.date.getMonth());
		const year = t.date.getFullYear();
		const strDate = day + " " + month + " " + year;
		const blinds = t.blinds.split("/").map((b, i) => (
			<span key={i} className="blind-item">
				{b}
			</span>
		));
		return (
			<tr
				className={this.props.className}
				style={styles}
				ref={c => (this.tableRow = c)}>
				<th className="date text-center">{strDate}</th>
				<th className="day">{t.day}</th>
				<th className="time">{t.time}</th>
				<th className="where">
					<Link to={`/casino/${t.venueId}`}>{t.venueName}</Link>
				</th>
				<th className="tournament">
					<Link to={`/tournament/${t.tournamentId}`}>
						{t.tournament}
					</Link>
				</th>
				<th className="buyin">{t.buyin}</th>
				<th className="starting">{t.starting}</th>
				<th className="blinds">{blinds}</th>
			</tr>
		);
	}
}
Tournament.propTypes = {
	className: PropTypes.string,
	data: PropTypes.object
};
Tournament.defaultProps = {
	className: "",
	data: null
};
export default Tournament;
