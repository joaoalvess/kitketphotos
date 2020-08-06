import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { CssBaseline, CircularProgress } from "@material-ui/core"
import './styles.css'

import firebase from '../firebase'

import Login from "../login"
import Register from "../register"
import homepage from "../homepage"
import Folder from "../folder"

const theme = createMuiTheme()

export default function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})

	return firebaseInitialized !== false ? (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Switch>

					<Route exact path="/" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/homepage" component={homepage} />
					<Route path="/folder" component={Folder} />

				</Switch>
			</Router>
		</MuiThemeProvider>
	) : <div id="loader"><CircularProgress /></div>
}