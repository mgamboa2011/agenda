import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import Swal from 'sweetalert2';
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(finishLoading());
                dispatch(
                    login(user.uid, user.displayName)
                );
            }).catch(err => {
                console.log(err);
                dispatch(finishLoading());
                Swal.fire('Error', err.message, 'error');
            });
    }
}

export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(
                    login(user.uid, user.displayName)
                );
            })
            .catch(err => {
                console.log(err);
                Swal.fire('Error', err.message, 'error');
            });
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(
                    login(user.uid, user.displayName)
                );
            });
    }
}

export const login = (uid, displayName) => ({
    type: types.loggin,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout
})