import React from "react";
import getState from "./storeContext.js";

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

		componentDidMount() {}

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
