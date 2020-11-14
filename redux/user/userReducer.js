import UserTypes from './userTypes';
const InitialState={
	user:{},
	error:null,
	isUserLoggedIn:false
};

const userReducer=(state=InitialState,action)=>{
	switch(action.type){
		case UserTypes.SIGN_IN:
		return{
          ...state,
          user:{...action.payload},
          error:null,
          isUserLoggedIn:true
		}
		default:
		return state;

	}
};
export default userReducer;




