const initial = {
    clinic:[]
}

const reducer = (state=initial,action)=>{
     if(action.type==="CLINIC"){
         return {
             ...state,
             clinic:action.value
         }
     }
     return state
}

export default reducer