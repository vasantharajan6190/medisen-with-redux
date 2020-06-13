import React,{useState,useEffect} from 'react'
import "./Homepage.css"
import { FaHandHoldingHeart,FaCheck } from 'react-icons/fa';
import Displaycard from "../../components/displaycard/displaycard"
import Doccards from "../../components/doccards/Doccards"
import {connect} from "react-redux"
function Homepage(props){
    let display = false
    let unknown = false
    const [search,setsearch] = useState("")
    const [searchresult,setsearchresult] = useState([])
    const [loggedin,setloggedin] = useState(props.loggedin)
    if(loggedin===false)
    {window.location = "/login"}
    const [currentuser,setcurrentuser] = useState(props.currentuser)
    const [appointments,setappointments] = useState(props.appointments)
    const [doctors,setdoctors] = useState(props.doctors)
    const [clinic,setclinic] = useState(props.clinic)
    const [docappointments,setdocappointments] = useState(props.docappointments)
    const [patients,setpatients] = useState(props.patients)
    const [clicked,setclicked] = useState(false)
    const [specialization,setspecialization] = useState(props.specialization)
    let unable=true
    async function getappointments(){
        const role = currentuser.role
        let id =0
        if(role==="doctor"){
          id = currentuser.doc_id
        }
        else if(role==="clinic"){
            id = currentuser.cli_id
        }
        else if(role==="patient"){
            id = currentuser.pat_id
        }
        const ans = await fetch(`http://localhost:5000/appointments?role=${role}&id=${id}`)
        const result = await ans.json()
        if(role==="patient"){
           setappointments(result)
           props.onappointments(appointments)
        }
        else{
           setdocappointments(result)
           props.ondocappointments(docappointments)
        }
    }
    useEffect(()=>{getappointments()},[])
    function onchange(e){
        setsearch(e.target.value)
        setsearchresult([])
        setclicked(false)
    }
    
    function onsubmit(e){
        e.preventDefault()
        doctors.map(res=>{
            if(res.specializations.toLowerCase()===search.toLowerCase()){
                const doc = {name:`Dr.${res.name}`,role:res.role,doc_id:res.doc_id,mobile:res.mobile,specializations:res.specializations,from:res.from,to:res.to,address:res.address,booked:true,removed:false,image:res.image}
                  setsearchresult(prev=>[...prev,{...doc}])
            }
        })
        clinic.map(res=>{
            const separate = res.specializations.split(" ")
            separate.map(ans=>{
                if(ans.toLowerCase()===search.toLowerCase()){
                    const cli = {name:res.clinicname,mobile:res.mobile,cli_id:res.cli_id,specializations:ans,from:res.from,to:res.to,address:res.address,booked:true,removed:false,role:res.role,image:res.image}
                    setsearchresult(prev=>[...prev,{...cli}])
                }
            })
        })
        setclicked(true)
    }
    return(
        <div className="homepage">
     {loggedin?
        <div>
        {/*Patients*/}
        <div>
        {currentuser.role==="patient"?
        <div>
        <div className="text-center pt-5">
        <h1 className="font-weight-normal font-italic text-white display-4">Welcome <FaHandHoldingHeart className="text-warning"/>{currentuser.name}</h1>
        </div>
        <div className="d-flex justify-content-center form-group">
        <form className="form-inline mt-3" onSubmit={e=>onsubmit(e)}>
        <div className="form-group mx-sm-3 mb-2">
        <label htmlFor="inputAddress" className="font-weight-bold">Specialization : </label>
  <select type="text"  name="specsreq" onChange={e=>onchange(e)} placeholder="Search For Specialization"  className="form-control ml-2" id="inputAddress" placeholder="Cardiologist,Neuroligist,etc..." required>
  {
    specialization.map((res,index)=>(
      <option key={index} value={res}>{res}</option>
    ))
  }
  </select>
        </div>
        <button type="submit" className="btn btn-warning mb-2 px-4 font-weight-bold" style={{marginLeft:"5px"}}>Search</button>
      </form>
        </div>
       {clicked? 
        <div>
        {searchresult.length===0? <p className="container font-weight-bold text-warning text-center">Unable To Find Doctors For the specialization</p>: 
        <div>
        <p className="container font-weight-bold text-warning">Results For Your Specialization</p>
        {
         searchresult.map((res,index)=>(
             <Displaycard res={res} key={index}/>
         ))
        }
         </div>
     }
        </div>:null
    }
    </div>:null
}
</div>

{/*Doctor*/}
<div>
{(currentuser.role==="doctor"|| currentuser.role ==="clinic")?
<div>
<div className="text-center pt-5">
<h1 className="font-weight-normal font-italic text-white display-4">Welcome <FaHandHoldingHeart className="text-warning"/>{currentuser.role==="doctor"?<span>Dr.{currentuser.name.charAt(0).toUpperCase()+currentuser.name.slice(1)}</span>:<span>{currentuser.clinicname.charAt(0).toUpperCase()+currentuser.clinicname.slice(1)}</span>} </h1>
</div>
{docappointments.length===0?<h5 className="text-center mt-5 font-weight-bold font-italic">You have no appointments</h5>:
<div className="container">
<h4 className="mt-5 container font-weight-bold font-italic mb-3">Your appointments : </h4>
{
    docappointments.map((res,index)=>{
      return  (
        <Doccards res={res} key={index}/>  
        )
    })
}
</div>
}
</div>
:
null
}
</div>

</div>
        :
        <p className="text-black text-center font-italic font-weight-normal display-4 pt-5">Please Log In to view Dashboard</p>
}
        </div>
    )
}

const mapstatetoProps = state => {
    return {
      loggedin:state.loggedin.loggedin,
      appointments:state.appointments.appointments,
      clinic:state.clinic.clinic,
      currentuser:state.currentuser.currentuser,
      docappointments:state.docappointments.docappointments,
      doctors:state.doctors.doctors,
      patients:state.patients.patients,
      specialization:state.specialization.specialization
    }
  };
  
  const mapdispatchtoProps = dispatch => {
    return {
      onloggedin: (changedvalue) => dispatch({type:"LOGGEDIN",value:changedvalue}),
      onappointments: (changedvalue) => dispatch({type:"APPOINTMENTS",value:changedvalue}),
      onclinic: (changedvalue) => dispatch({type:"CLINIC",value:changedvalue}),
      oncurrentuser: (changedvalue) => dispatch({type:"CURRENTUSER",value:changedvalue}),
      ondocappointments: (changedvalue) => dispatch({type:"DOCAPPOINTMENTS",value:changedvalue}),
      ondoctors: (changedvalue) => dispatch({type:"DOCTORS",value:changedvalue}),
      onpatients: (changedvalue) => dispatch({type:"PATIENTS",value:changedvalue}),
      onspecialization: (changedvalue) => dispatch({type:"SPECIALIZATION",value:changedvalue})
    }
  };
export default connect(mapstatetoProps,mapdispatchtoProps)(Homepage)