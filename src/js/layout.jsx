import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/functional/scrollToTop.jsx";

import { Home } from "./views/home.jsx";
import { WelcomePage } from "./views/welcomePage.jsx";
import { Profile } from "./views/profile.jsx";
import MySchedules from "./views/myschedules.jsx";
import { YourSchedule } from "./views/yourschedule.jsx";
import { AllSavedSchedules } from "./views/allSavedSchedules.jsx";
import { TournamentView } from "./views/tournamentview.jsx";
import { MyAccount } from "./views/myaccount.jsx";
import { Single } from "./views/single.jsx";
import { Casino } from "./views/Casino.jsx";
import { Login } from "./views/login.jsx";
import { ScheduleView } from "./views/scheduleview.jsx";
import { TournamentInfo } from "./views/tournamentinfo.jsx";
import { SignUp } from "./views/signup.jsx";
import Calendar from "./views/calendar.jsx";
import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
import Store from "./store/appContext.jsx";
import { PrivateRoute } from "bc-react-session";

//create your first component
class Layout extends React.Component {
	render() {
		const LoginContainer = () => <Route path="/login" component={Login} />;
		const SignUpContainer = () => (
			<Route path="/register" component={SignUp} />
		);
		const HomeContainer = () => <Route exact path="/" component={Home} />;

		const DefaultContainer = () => (
			<div className="m-0 p-0">
				<Navbar />
				<Switch>
					<PrivateRoute exact path="/profile" component={Profile} />
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
					<Route exact path="/casino/:casino_id" component={Casino} />
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
			</div>
		);

		return (
			<BrowserRouter>
				<ScrollToTop>
					<Switch>
						<Route exact path="/" component={HomeContainer} />
						<Route exact path="/login" component={LoginContainer} />
						<Route
							exact
							path="/register"
							component={SignUpContainer}
						/>
						<Route component={DefaultContainer} />
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		);
	}
}

export default Store(Layout);
