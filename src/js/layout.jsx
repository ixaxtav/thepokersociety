import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/functional/scrollToTop.jsx";

import { Home } from "./views/home.jsx";
import { Demo } from "./views/demo.jsx";
import { Profile } from "./views/profile.jsx";
import { Single } from "./views/single.jsx";
import { Login } from "./views/login.jsx";
import { SignUp } from "./views/signup.jsx";
import Store from "./store/appContext.jsx";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";

//create your first component
export class Layout extends React.Component {
	render() {
		const LoginContainer = () => <Route path="/login" component={Login} />;
		const SignUpContainer = () => (
			<Route path="/register" component={SignUp} />
		);

		const DefaultContainer = () => (
			<div className="container m-0 p-0">
				<Navbar />
				<Route exact path="/" component={Home} />
				<Route path="/demo" component={Demo} />
				<Route path="/profile" component={Profile} />
				<Route path="/single/:theid" component={Single} />
				<Route render={() => <h1>Not found!</h1>} />
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
