import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../firebase'
import camera from '../../assets/camera.png'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
});

function SignIn(props) {
	const { classes } = props

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<>
		<main className={classes.main}>
			<Paper className={classes.paper} id="paper">
                <img className="img" src={camera} alt="camera icon"/>
				<Typography className="title" component="h1" variant="h3">
					<strong>KitKetPhotos</strong>
       			</Typography>
                <br/>
                <p className="info">
                    Hello and welcome to access the site, you need information about your email and password, 
                    just like you will have access to your photo collection!
                </p>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel id="formulario" htmlFor="email">Email Address</InputLabel>
						<Input className="input" id="email" name="email" autoComplete="off" autoFocus value={email} onChange={e => setEmail(e.target.value)} />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel id="formulario" htmlFor="password">Password</InputLabel>
						<Input className="input" name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
					</FormControl>
					<Button
						id="button"
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={login}
						className={classes.submit}>
						Login
          			</Button>
					<Button
						id="button"
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/register"
						className={classes.submit}>
						Create Account
          			</Button>
				</form>
			</Paper>
		</main>
		</>
	)

	async function login() {
		try {
			await firebase.login(email, password)
			props.history.replace('/homepage')
		} catch(error) {
			alert('Email ou Senha Incorretos')
		}
	}
}

export default withRouter(withStyles(styles)(SignIn))