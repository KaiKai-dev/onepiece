import { initializeApp} from 'firebase/app'
import { getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyD6vbotL4uHD53zqBwZVLPnyD8ttEHz03w",
    authDomain: "sacred-alliance-318508.firebaseapp.com",
    projectId: "sacred-alliance-318508",
    storageBucket: "sacred-alliance-318508.appspot.com",
    messagingSenderId: "308063733306",
    appId: "1:308063733306:web:ffdf476d3a4d897dd65703"
  };

  initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

