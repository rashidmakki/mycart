import UserTypes from './userTypes';

export const SignIn=(user)=>({
	type:UserTypes.SIGN_IN,
	payload:user
});