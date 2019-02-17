import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/functional/scrollToTop.jsx";

import { Home } from "./views/home.jsx";

import { Profile } from "./views/profile.jsx";
import MySchedules from "./views/myschedules.jsx";
import { YourSchedule } from "./views/yourschedule.jsx";
import { AllSavedSchedules } from "./views/allSavedSchedules.jsx";
import { TournamentView } from "./views/tournamentview.jsx";
import { MyAccount } from "./views/myaccount.jsx";
import { Casino } from "./views/Casino.jsx";
import { Login } from "./views/login.jsx";
import { ScheduleView } from "./views/scheduleview.jsx";
import { SignUp } from "./views/signup.jsx";
import Calendar from "./views/calendar.jsx";
import Navbar from "./component/navbar.jsx";
import Store from "./store/appContext.jsx";
import { PrivateRoute } from "bc-react-session";

//create your first component
class Layout extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={SignUp} />

						<PrivateRoute
							exact
							path="/profile"
							component={Profile}
						/>
						<PrivateRoute
							exact
							path="/myschedule"
							component={MySchedules}
						/>
						<PrivateRoute
							exact
							path="/allschedules"
							component={AllSavedSchedules}
						/>

						<PrivateRoute
							exact
							path="/yourschedule"
							component={YourSchedule}
						/>
						<PrivateRoute
							exact
							path="/myaccount"
							component={MyAccount}
						/>
						<Route
							exact
							path="/casino/:casino_id"
							component={Casino}
						/>
						<PrivateRoute
							exact
							path="/schedule/:schedule_id"
							component={ScheduleView}
						/>
						<Route
							exact
							path="/tournament/:tournament_id"
							component={TournamentView}
						/>
						<Route
							exact
							path="/calendar/:cal_id"
							component={Calendar}
						/>

						<Route render={() => <h1>Not found!</h1>} />
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		);
	}
}

export default Store(Layout);
