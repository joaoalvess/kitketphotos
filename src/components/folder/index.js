import React, { useState, useEffect } from 'react'
import { Typography, Paper, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../firebase'
import FileUploader from 'react-firebase-file-uploader'
import camera from '../../assets/camera.png'
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
    const [folder, setFolder] = useState('')

    const [foldername, setFolderName] = useState('')
    const [copied, setCopied] = useState(false)

    const [avatar, setAvatar] = useState('')
	const [isUploading, setIsUploading] = useState(false)
	const [progress, setProgress] = useState(0)
	const [avatarURL, setAvatarURL] = useState(null)
	const [avatarurltrue, setAvatarUrlTrue] = useState(false)
    
    useEffect(()=>{
        firebase.userName().then(setName)
        firebase.folderName().then(setFolderName)
        firebase.userUid().then(setUid)
        firebase.userFolder().then(setFolder)
    },[folder,uid])

    function handleUploadStart(){
        setIsUploading(true)
		setProgress(0)
	}

	function handleProgress(progress){
		setProgress(progress)
	}

	function handleUploadError(error){
		setIsUploading(false)
		alert(error)
	}

	function handleUploadSuccess(filename){
		setAvatar(filename)
		setProgress(100)
		setIsUploading(false)
		firebase.image().ref(`Photos/${firebase.CurrentUser()}`)
		.child(filename)
		.getDownloadURL()
		.then(url => setAvatarURL(url),setAvatarUrlTrue(true));
    }

    async function photoUpload(){
        
        if (avatarURL != null) {
            const photoid = uid + ' ' + avatar

            await firebase.database().doc(`Photos/${photoid}`).set({
                pasta: folder,
                photoid: photoid,
                photo: avatarURL,
                dono: uid,
            })
            alert('Photo Added!')
            setAvatarURL(null)
        }
        else{
            alert('Select Photo!')
        }

	}
	
	function deleteFolder(){
		firebase.database().doc(`Pastas/${folder}`).delete()
		props.history.replace('/homepage')
    }
    
	function back(){
		props.history.replace('/homepage')
    }
    
    function deletePhoto(photoid){
        firebase.database().doc(`Photos/${photoid}`).delete()
        alert('Deleted Photo!')
    }

    function photoCopied(){
        setCopied(true)
        alert('Photo Copied!')
    }
    
	function usePhoto(){
        const [photos, setPhotos] = useState([])
		
        useEffect(() => { 
            firebase.database().collection('Photos').where('pasta', '==', folder)
            .onSnapshot((snapshot) => {
                const listPhotos = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setPhotos(listPhotos)
            })
        },[folder])
        return photos
    }

    const photo = usePhoto()

	return (
		<>
		<main className={classes.main}>
			<Paper className={classes.paper} id="paper">
                <Button id="homepageBackButton" onClick={back}>Homepage</Button>
                <Link to="/homepage"><img className="img" src={camera} alt="camera icon"/></Link>
				<Typography className="title" component="h1" variant="h3">
					<strong>KitKetPhotos</strong>
       			</Typography>
                <h1 className="folderTitle"><strong>{foldername}</strong></h1>
                <p className="folderDesc">Hello <strong>{name}</strong> this and your folder <strong>{foldername}</strong>, you can add
                more photos by clicking on the icon below, to open a photo just touch it and the
                it will be opened in a new tab, to delete this folder go to the end.</p>
                <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                    <FormControl margin="normal" required fullWidth>
                        <FileUploader
								required
                                className="upload"
                                accept="image/*"
                                maxUploadSize="100"
                                name='avatar'
                                randomizeFilename
                                storageRef={
                                    firebase.image().ref(`Photos/${firebase.CurrentUser()}`)
                                }
                                onUploadStart = {handleUploadStart}
                                onUploadError = {handleUploadError}
                                onUploadSuccess = {handleUploadSuccess}
                                onProgress = {handleProgress}
                        />
                        <p className="process"><strong>Process:</strong> {progress}%</p>
                        <img className="send" src={avatarURL} alt='' />
                        <Button
                            id="button"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={photoUpload}
                            className={classes.submit}>
                            Add Photo
                        </Button>
                    </FormControl>
                </form>
                <br/>
                <br/>
                <Typography className="title" component="h1" variant="h3">
					<strong>Your Photos</strong>
       			</Typography>
				<br/>
                {photo.map((photo =>
                    <div className="folderPhotos">
                        <a target="blank" href={photo.photo}><img className="folderImages" src={photo.photo} alt="Photo"/></a>
                        <div>
                            <CopyToClipboard text={photo.photo}
                                onCopy={() => photoCopied()}>
                                <Button id="photoButtons">Copy</Button>
                            </CopyToClipboard>
                            <Button id="photoButtons" 
                            onClick={() => { if(window.confirm('Do you really want to delete this Photo?')) 
                            deletePhoto(photo.photoid)}}
                            >Delete</Button>
                        </div>
                    </div>
				))}
                <Button
                id="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => { if(window.confirm('Do you really want to delete this Folder?')) deleteFolder()}}>
                Delete Folder</Button>
			</Paper>
		</main>
		</>
    )
}

export default withRouter(withStyles(styles)(SignIn))