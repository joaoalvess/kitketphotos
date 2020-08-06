import React, { useState } from 'react'
import { Typography, Paper, Button, FormControl, Input, InputLabel, FilledInput } from '@material-ui/core'
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
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
})

function Register(props) {
	const { classes } = props

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	return (
		<main className={classes.main}>
			<Paper className={classes.paper} id="paper">
				<img className="img" src={camera} alt="camera icon"/>
				<Typography className="title" component="h1" variant="h3">
					<strong>KitKetPhotos</strong>
       			</Typography>
				<br/>
				<Typography component="h1" variant="h3">
					Create Account
       			</Typography>
				<form className={classes.form} onSubmit={e => e.preventDefault() && false}>
					<FormControl margin="normal" required fullWidth>
						<InputLabel id="formulario" htmlFor="name">Name</InputLabel>
					    <Input className="input" id="name" name="name" autoComplete="off" autoFocus value={name} onChange={e => setName(e.target.value)} />
                    </FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel id="formulario" htmlFor="email">Email Address</InputLabel>
						<Input className="input" id="email" name="email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)}  />
					</FormControl>
					<FormControl margin="normal" required fullWidth>
						<InputLabel id="formulario" htmlFor="password">Password</InputLabel>
						<Input className="input" name="password" type="password" id="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)}  />
					</FormControl>
					<Button
						id="button"
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={onRegister}
						className={classes.submit}>
						Create Account
          			</Button>
					<Button
						id="button"
						type="submit"
						fullWidth
						variant="contained"
						color="secondary"
						component={Link}
						to="/"
						className={classes.submit}>
						Login
          			</Button>
				</form>
			</Paper>
		</main>
    )
	async function onRegister() {
		await firebase.register(name, email, password)
		await firebase.addPerfil(name) 
		props.history.replace('/')
	}
}

export default withRouter(withStyles(styles)(Register))