import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyCgPg3CY908aY4RGLK2GSp6WUY9K5cX4zM",
    authDomain: "kitketphotos.firebaseapp.com",
    databaseURL: "https://kitketphotos.firebaseio.com",
    projectId: "kitketphotos",
    storageBucket: "kitketphotos.appspot.com",
    messagingSenderId: "130343351699",
    appId: "1:130343351699:web:de96e9f650674d63c86466",
    measurementId: "G-6RJZE44D7Q"
};

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
		this.storage = app.storage()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	database(){
		return this.db
	}
	CurrentUser(){
		return this.auth.currentUser.displayName + ' ' + this.auth.currentUser.uid
	}
	image(){
		return this.storage
	}

	async addPerfil(name) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}
		
		const uid = await this.auth.currentUser.uid
		
		return this.db.doc(`Users/${this.auth.currentUser.displayName + ' ' + this.auth.currentUser.uid}`).set({
            name,
            folder: null,
            uid: uid
		})
	}
    isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
    }
    getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
    }
    async userName(){
        const perfil = await this.db.doc(`Users/${this.auth.currentUser.displayName + ' ' + this.auth.currentUser.uid}`).get()
		return perfil.get('name')
    }
    async userUid() {
		const perfil = await this.db.doc(`Users/${this.auth.currentUser.displayName + ' ' + this.auth.currentUser.uid}`).get()
		return perfil.get('uid')
	}
	async userFolder() {
		const perfil = await this.db.doc(`Users/${this.auth.currentUser.displayName + ' ' + this.auth.currentUser.uid}`).get()
		return perfil.get('folder')
	}
	async folderName() {
		const perfil = await this.db.doc(`Users/${this.auth.currentUser.displayName + ' ' + this.auth.currentUser.uid}`).get()
		const folderid = perfil.get('folder')
		const folder = await this.db.doc(`Pastas/${folderid}`).get()
		return folder.get('pasta')
	}
}
export default new Firebase()
