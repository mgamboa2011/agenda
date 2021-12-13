import React, { useEffect, useState } from 'react';
import { firebase } from '../firebase/firebase-config'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //mantener el estado de auth al recargar
    const dispatch = useDispatch();
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return <h1>Cargando...</h1>
    }

    return (
        <Router>
            <div>
                <Routes>
                    <Route element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
                        <Route path="/" element={<JournalScreen />} />
                    </Route>
                    <Route element={<PublicRoute isAuthenticated={isLoggedIn} />}>
                        <Route path="*" element={<AuthRouter />} />
                    </Route>
                    <Route element={<Navigate to="auth/login" />} />
                </Routes>
            </div>
        </Router>
    )
}
