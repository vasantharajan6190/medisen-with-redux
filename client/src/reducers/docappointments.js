const initial = {
    docappointments:[]
}

const reducer = (state=initial,action)=>{
     if(action.type==="DOCAPPOINTMENTS"){
         return {
             ...state,
             docappointments:action.value
         }
     }
     return state
}

export default reducer