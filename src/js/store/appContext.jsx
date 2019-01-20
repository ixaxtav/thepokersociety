import React from "react";
import getState from "./storeContext.js";
import { Session } from "bc-react-session";

export const Context = React.createContext(null);

const Store = PassedComponent => {
	class StoreWrapper extends React.Component {
		constructor(props) {
			super(props);
			this.state = getState({
				setStore: updatedStore => {
					this.setState({
						store: Object.assign(this.state.store, updatedStore)
					});
				},
				getStore: () => this.state.store
			});
		}

		componentDidMount() {
			const session = Session.getSession();
			const payload = Session.getPayload();

			if (session.isValid) {
				this.setState({ store: payload });
			}
		}

		render() {
			return (
				<Context.Provider value={this.state}>
					<PassedComponent {...this.props} />
				</Context.Provider>
			);
		}
	}
	return StoreWrapper;
};

export default Store;
