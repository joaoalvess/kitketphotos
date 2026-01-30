<h1 align="center">
  <img alt="camera" src="./src/assets/camera.png" width="200" height="200" />
  <br>
  Kitket Photos
</h1>

<h4 align="center">
  📷 Simple photo storage + sharing app with folders and shareable links
</h4>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/joaoalvess/kitketphotos.svg">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/joaoalvess/kitketphotos.svg">

  <a href="https://www.codacy.com/app/joaoalvess/kitketphotos?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=joaoalvess/kitketphotos&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy grade" src="https://img.shields.io/codacy/grade/04db4b43120b4d05b9b39c9d2da97300.svg">
  </a>

  <a href="https://github.com/joaoalvess/kitketphotos/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/joaoalvess/kitketphotos.svg">
  </a>

  <a href="https://github.com/joaoalvess/kitketphotos/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/joaoalvess/kitketphotos.svg">
  </a>

  <img alt="License" src="https://img.shields.io/github/license/joaoalvess/kitketphotos.svg">
</p>

<p align="center">
  <a href="#sparkles-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tech-stack">Tech Stack</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#fire-firebase-setup">Firebase Setup</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-deploy">Deploy</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<p align="center">
  <img alt="App Demo" src="https://media.giphy.com/media/TgmzP66FR4qWWNCBEP/giphy.gif">
  <img alt="App Demo" src="https://media.giphy.com/media/USVY45KJoDIYDaJavR/giphy.gif">
</p>

## :sparkles: Features

- Email/password authentication
- Create folders ("Pastas")
- Upload photos to Firebase Storage
- List photos by folder
- Share a photo link (copy to clipboard)

## :rocket: Tech Stack

- [React](https://reactjs.org)
- [Firebase](https://firebase.google.com)
- [react-router-dom](https://reactrouter.com/web/guides/quick-start)
- [Material UI](https://material-ui.com)

## :information_source: Getting Started

### Prerequisites

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/) (recommended: Node 14+)
- [Yarn](https://yarnpkg.com/) (or npm)

### Run locally

```bash
# Clone this repository
git clone https://github.com/joaoalvess/kitketphotos

# Go into the repository
cd kitketphotos

# Install dependencies
yarn install

# Start the app
yarn start
```

The app will be available at http://localhost:3000.

### Available scripts

- `yarn start` – runs the app in development mode
- `yarn test` – runs tests in watch mode
- `yarn build` – builds the app for production

## :fire: Firebase Setup

This project uses Firebase **Auth**, **Firestore** and **Storage**.

1. Create a Firebase project in the console: https://console.firebase.google.com
2. Enable **Authentication** → Email/Password.
3. Create a **Cloud Firestore** database.
4. Enable **Storage**.
5. Update the Firebase config in:

- `src/components/firebase.js`

> Note: the repo currently keeps Firebase config committed in the source file.
> If you prefer environment variables, you can refactor it to read from `process.env.REACT_APP_*`.

## :zap: Deploy

This repo includes `firebase.json` configured for Firebase Hosting.

```bash
# Build the web app
yarn build

# Login to Firebase (once)
firebase login

# Deploy
firebase deploy
```

## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/joaoalvess/kitketphotos/blob/master/LICENSE) for more information.

---

Made by João Alves — [Get in touch!](https://www.linkedin.com/in/elcoss/)
