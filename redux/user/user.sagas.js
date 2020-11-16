import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';
import {
  Alert
} from 'react-native';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from './user.actions';

import firebase from '@react-native-firebase/app';
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import _ from 'lodash';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
      );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
     yield GoogleSignin.hasPlayServices();
    const user =yield GoogleSignin.signIn();
    if(user!==undefined){
      yield getSnapshotFromUserAuth({...user});
    }
    
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        yield Alert.alert('Login Cancelled',error.message)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        yield Alert.alert('In Progress',error.message)
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        yield Alert.alert('Play Services Not Available',error.message)
      } else {
        // some other error happened
        yield Alert.alert('There is some problem ',error.message);
      }
    }
}
    export function* signInWithEmail({ payload: { email, password } }) {
      try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
      } catch (error) {
        yield put(signInFailure(error));
      }
    }

    export function* isUserAuthenticated() {
      try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
      } catch (error) {
        yield put(signInFailure(error));
      }
    }

    export function* signOut() {
      try {
        yield GoogleSignin.revokeAccess();
        yield GoogleSignin.signOut(); 
        yield put(signOutSuccess());
      } catch (error) {
        yield put(signOutFailure(error));
      }
    }

    export function* signUp({ payload: { email, password, displayName } }) {
      try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }));
      } catch (error) {
        yield put(signUpFailure(error));
      }
    }

    export function* signInAfterSignUp({ payload: { user, additionalData } }) {
      yield getSnapshotFromUserAuth(user, additionalData);
    }

    export function* onGoogleSignInStart() {
      yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
    }

    export function* onEmailSignInStart() {
      yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
    }

    export function* onCheckUserSession() {
      yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
    }

    export function* onSignOutStart() {
      yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
    }

    export function* onSignUpStart() {
      yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
    }

    export function* onSignUpSuccess() {
      yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
    }

    export function* userSagas() {
      yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
        ]);
    }
