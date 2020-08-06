import React, { useState, useEffect } from 'react'
import { Typography, Paper, Button, FormControl, Input, InputLabel } from '@material-ui/core'
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

	const [name, setName] = useState('')
    const [pasta, setPasta] = useState('')
    const [uid, setUid] = useState('')
    
    useEffect(()=>{
        firebase.userName().then(setName)
        firebase.userUid().then(setUid)
    },[])

    async function create(){
        const folderid = pasta + ' ' + uid

        await firebase.database().doc(`Pastas/${pasta + ' ' + uid}`).set({
            folderid,
			pasta,
			dono:uid
        })
        
        return setPasta('')
	}
	
	async function logout(){
		await firebase.logout()
		props.history.replace('/')
	}

	async function folderId(folderid){
		await firebase.database().doc(`Users/${name + ' ' + uid}`).update({
			folder: folderid,
		})
		props.history.replace('/folder')
	}

	function usePastas(){
		const [folders, setFolders] = useState([])
		
        useEffect(() => { 
            firebase.database().collection('Pastas').where('dono', '==', uid)
            .onSnapshot((snapshot) => {
                const listFolders = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setFolders(listFolders)
            })
        },[uid])
        return folders
    }

    const folder = usePastas()

	return (
		<>
		<main className={classes.main}>
			<Paper className={classes.paper} id="paper">
				<Button id="homepageBackButton" onClick={logout}>Logout</Button>
				<Link to="/homepage"><img className="img" src={camera} alt="camera icon"/></Link>
				<Typography className="title" component="h1" variant="h3">
					<strong>KitKetPhotos</strong>
       			</Typography>
                <br/>
                <p className="info">
                    hello <strong>{name}</strong> below you can create new pasta to store 
                    photos or see the pasta already created!
                </p>
                <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                    <FormControl margin="normal" required fullWidth>
						<InputLabel id="formulario" htmlFor="pasta">Folder Name</InputLabel>
					    <Input className="input" id="pasta" name="pasta" autoComplete="off" autoFocus value={pasta} onChange={e => setPasta(e.target.value)} />
                    </FormControl>
                    <Button
                        id="button"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={create}
                        className={classes.submit}>
                        Create New Folder
                    </Button>
                </form>
                <br/>
                <br/>
                <Typography className="title" component="h1" variant="h3">
					<strong>Your Folders</strong>
       			</Typography>
				<br/>
				{folder.map((folder =>
					<Button id="folderButton" onClick={() => folderId(folder.folderid)}> {folder.pasta} </Button>
				))}
			</Paper>
		</main>
		</>
    )
}

export default withRouter(withStyles(styles)(SignIn))