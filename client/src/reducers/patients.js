const initial = {
     patients:[]
}

const reducer = (state=initial,action)=>{
     if(action.type==="PATIENTS"){
         return {
             ...state,
             patients:action.value
         }
     }
     return state
}

export default reducer