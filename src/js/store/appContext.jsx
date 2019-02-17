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
			fetch(
				"http://admin.thepokersociety.com/wp-json/wp-api-menus/v2/menus/2"
			)
				.then(resp => resp.json())
				.then(data => {
					// do something with the returned posts
					this.setState({
						store: Object.assign(this.state.store, {
							menu: {
								children: data.items.map(item => {
									item.opened = false;
									return item;
								})
							}
						})
					});
				})
				.catch(function(err) {
					// handle error
					console.error(err);
				});
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
