const firebaseConfig = {
    apiKey: "xxxxx",
    authDomain: "xxxxx",
    projectId: "xxxxx",
    storageBucket: "xxxxx",
    messagingSenderId: "xxxxx",
    appId: "xxxxx"
};

firebase.initializeApp(firebaseConfig);

const db = {
    firebase: firebase.database(),
    queueRef: firebase.database().ref('/queue'),
    pinRef: firebase.database().ref('/pin'),
    getPairRef(id) {
        return db.firebase.ref(`queue/${id}`);
    },
    getPinRef(id) {
        return db.firebase.ref(`pin/${id}`);
    },
};
