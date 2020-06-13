const initial = {
    appointments:[]
}

const reducer = (state=initial,action)=>{
     if(action.type==="APPOINTMENTS"){
         return {
             ...state,
             appointments:action.value
         }
     }
     return state
}

export default reducer