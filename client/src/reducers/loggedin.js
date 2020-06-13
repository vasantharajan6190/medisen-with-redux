const initial = {
    loggedin:false
}

const reducer = (state=initial,action)=>{
     if(action.type==="LOGGEDIN"){
         return {
             ...state,
             loggedin:action.value
         }
     }
     return state
}

export default reducer