const initial = {
    specialization:[]
}

const reducer = (state=initial,action)=>{
     if(action.type==="SPECIALIZATION"){
         return {
             ...state,
             specialization:action.value
         }
     }
     return state
}

export default reducer