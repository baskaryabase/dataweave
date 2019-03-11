import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { install } from "@material-ui/styles";

install();

ReactDOM.render(<App />, document.getElementById("root"));
