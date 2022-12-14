import {takeLatest , call , put} from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import { AccountReducer } from '../reducers/account';
import { SystemReducer } from '../reducers/system';
import * as api from '../../api';

function* registerSaga (action){
    try {
        yield put(SystemReducer.actions.setNoError());
        const registerAccount = yield call(api.register , action.payload);
        // put này dùng để dispatch 1 actions đến thằng reducer
        yield put(AccountReducer.actions.registerSuccess(registerAccount.data));
        // set message success
        yield put(SystemReducer.actions.setMessage(registerAccount.data));
    } catch (error) {
        // console.error(error.response.data);
        yield put(SystemReducer.actions.setMessage(error.response.data));
    }
}

function* loginSaga (action){
    try {
        yield put(SystemReducer.actions.setNoError());
        const cookies = new Cookies();
        const loginAccount = yield call(api.login , action.payload);
        yield cookies.set('token',loginAccount.data.accessToken,{ path: '/' });
        yield put(AccountReducer.actions.loginSuccess(loginAccount.data));
        
    } catch (error) {
        // message , type
        yield put(SystemReducer.actions.setMessage(error.response.data));
    }
}

function* SignOutSaga (action){
    try {
        yield put(SystemReducer.actions.setNoError());
        const logoutAccount = yield call(api.logout , action.payload);
        yield put(AccountReducer.actions.signOutSuccess());
        yield put(SystemReducer.actions.setMessage(logoutAccount.data));
    } catch (error) {
        // message , type
        yield put(SystemReducer.actions.setMessage(error.response.data));
    }
}

function* accountSaga(){
    yield takeLatest(AccountReducer.actions.registerRequest ,registerSaga); 
    yield takeLatest(AccountReducer.actions.loginRequest ,loginSaga); 
    yield takeLatest(AccountReducer.actions.signOutRequest ,SignOutSaga); 
}

export default accountSaga;