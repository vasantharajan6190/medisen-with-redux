import React,{useState} from "react"
import {useHistory} from "react-router-dom"
import {connect} from "react-redux"
import Displaycard from "../../components/displaycard/displaycard"
import "./Appointments.css"
import { toast } from "react-toastify"
function Appointments(props){
    const history = useHistory()
    const [loggedin,setloggedin] = useState(props.loggedin)
    if(loggedin===false)
    {window.location = "/login"}
    const [appointments,setappointments] = useState(props.appointments)
    const [currentuser,setcurrentuser] = useState(props.currentuser)
    const [changed,setchanged] = useState({})
    function onchange(e){
       setchanged({...changed,[e.target.name]:e.target.value})
    }
    async function onsubmit(e){
        e.preventDefault()
        const {from,to} = changed
        const role = currentuser.role
        let id=0
        if(role==="doctor"){
          id=currentuser.doc_id
        }
        else if(role==="clinic"){
          id=currentuser.cli_id
        }
        const body = {from,to,role,id}
        await fetch("http://localhost:5000/updatetime",{
          method:"PUT",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(body)
        })
        setcurrentuser({...currentuser,...changed})
        props.oncurrentuser(currentuser)
        toast.success("Successfully Altered Consulting Hours",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
        history.push("/homepage")
    }
    return(
        <div className="appointments pt-5">
        {currentuser.role==="patient"?
        <div>
        {
            appointments.map((res,index)=>(
                <Displaycard key ={index} res={res}/>
            ))
        }
          </div>:
          <div className=" d-flex mt-5 justify-content-center container">
          <form className="form-inline justify-content-center" onSubmit={e=>onsubmit(e)}>
          <div className="form-group mb-2">
            <label htmlFor="staticEmail2" className="font-weight-bold font-italic mr-3" style={{fontSize:"20px"}}>From:</label>
            <input type="time" name="from" onChange={e=>onchange(e)} className="form-control mr-3" id="staticEmail2" placeholder={currentuser.from}/>
          </div>
          <div className="form-group ml-3 mb-2">
            <label htmlFor="inputPassword2" className="font-weight-bold font-italic mr-3" style={{fontSize:"20px"}}>To:</label>
            <input type="time" name="to" onChange={e=>onchange(e)} className="form-control" id="inputPassword2" placeholder={currentuser.to}/>
          </div>
          <button type="submit" className="btn btn-dark font-weight-bold border border-white px-5 ml-3 mb-2">Save</button>
        </form>
          </div>
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

export default connect(mapstatetoProps,mapdispatchtoProps)(Appointments)