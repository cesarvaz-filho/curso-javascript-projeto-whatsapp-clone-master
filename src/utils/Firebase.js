const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor() {

        this._firebaseConfig = {
            apiKey: "AIzaSyDCzLuJEaLf_AW0Sjdyx1Up4PlzTAvdBPw",
            authDomain: "whatsapp-clone-7c412.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-7c412.firebaseio.com",
            projectId: "whatsapp-clone-7c412",
            storageBucket: "whatsapp-clone-7c412.appspot.com",
            messagingSenderId: "173862531311",
            appId: "1:173862531311:web:0a2fb4c5fbd40ec156eb1a",
            measurementId: "G-2P7QFTJMEE"
        };

        this.init();
    }

    init() {

        if (!window._initializedFirebase) {

            // Initialize Firebase
            firebase.initializeApp(this._firebaseConfig);

            firebase.firestore().settings({});

            window._initializedFirebase = true;
        } 
    }

    static db() {

        return firebase.firestore();
    }

    static hd() {

        return firebase.storage();
    }

    initAuth() {

        return new Promise((s, f) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(result => {

                    let token = result.credential.accessToken;
                    let user = result.user;

                    s({
                        user,
                        token
                    });
                })
                .catch(err => {
                    f(err);
                });
        });
    }
}