const initial = {
    currentuser:{}
}

const reducer = (state=initial,action)=>{
     if(action.type==="CURRENTUSER"){
         return {
             ...state,
             currentuser:action.value
         }
     }
     return state
}

export default reducer