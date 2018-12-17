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

		componentDidMount() {
			const HOST =
				// Set your fetchs/Ajax requests here.
				// make sure you're using the store: this.state.store
				fetch("http://admin.thepokersociety.com/wp-json/wp/v2/casino")
					.then(rsp => rsp.json())
					.then(casinos => this.state.actions.setCasinos(casinos));
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
