//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap/dist/css/bootstrap.css";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout.jsx";
import { Notifier } from "bc-react-notifier";

//render your react application
ReactDOM.render(
	<div>
		<Notifier />
		<Layout />
	</div>,
	document.querySelector("#app")
);
