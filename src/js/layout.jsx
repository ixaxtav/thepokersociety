import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/functional/scrollToTop.jsx";

import { Home } from "./views/home.jsx";
import { Profile } from "./views/profile.jsx";
import { MySchedule } from "./views/myschedule.jsx";
import { YourSchedule } from "./views/yourschedule.jsx";
import { MyAccount } from "./views/myaccount.jsx";
import { Confirmation } from "./views/confirmschedule.jsx";
import { Single } from "./views/single.jsx";
import { Casino } from "./views/Casino.jsx";
import { Login } from "./views/login.jsx";
import { TournamentInfo } from "./views/tournamentinfo.jsx";
import { SignUp } from "./views/signup.jsx";
import Calendar from "./views/calendar.jsx";
import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

import Store from "./store/appContext.jsx";

//create your first component
class Layout extends React.Component {
	render() {
		const LoginContainer = () => <Route path="/login" component={Login} />;
		const SignUpContainer = () => (
			<Route path="/register" component={SignUp} />
		);

		const DefaultContainer = () => (
			<div className="container m-0 p-0">
				<Navbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/myschedule" component={MySchedule} />
					<Route
						exact
						path="/yourschedule"
						component={YourSchedule}
					/>
					<Route exact path="/myaccount" component={MyAccount} />
					<Route exact path="/confirm" component={Confirmation} />
					<Route exact path="/info" component={TournamentInfo} />
					<Route exact path="/single/:theid" component={Single} />
					<Route exact path="/single/:theid" component={Single} />
					<Route exact path="/casino/:casino_id" component={Casino} />
					<Route exact path="/tournament/:theid" />
					<Route
						exact
						path="/calendar/:cal_id"
						component={Calendar}
					/>
					<Route render={() => <h1>Not found!</h1>} />
				</Switch>
				<Footer />
			</div>
		);

		return (
			<BrowserRouter>
				<ScrollToTop>
					<Switch>
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
