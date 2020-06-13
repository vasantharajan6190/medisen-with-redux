const initial = {
    doctors:[]
}

const reducer = (state=initial,action)=>{
     if(action.type==="DOCTORS"){
         return {
             ...state,
             doctors:action.value
         }
     }
     return state
}

export default reducer