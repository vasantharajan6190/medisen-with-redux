import React,{useState} from "react"
import {toast} from "react-toastify"
import {useHistory,useLocation} from "react-router-dom"
import { FaHandHoldingHeart,FaCheck } from 'react-icons/fa';
import axios from "axios"
import {connect} from "react-redux"
import "./Doccards.css"
function Doccards(props){
    const history = useHistory()
    const location = useLocation()
    const routename = location.pathname
    const [currentuser,setcurrentuser] = useState(props.currentuser)
    const [docappointments,setdocappointments] = useState(props.docappointments)
   async function onclick(e){
        e.preventDefault()
        const pat_id = props.res.pat_id
        const role = currentuser.role
        let id=0
        if(role==="doctor"){
          id = currentuser.doc_id
        }
        else if(role==="clinic"){
            id = currentuser.cli_id
        }
        const ans = await axios.delete(`http://localhost:5000/docclidelete?pat_id=${pat_id}&role=${role}&id=${id}`)
        let indexto= 0
        docappointments.map((result,index)=>{
            if(result.name===props.res.name){
                indexto=index
            }
        })
        docappointments.splice(indexto,1)
        toast.success("Completed the appointment",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
        history.push(routename)
    }
    return(
        <div className="container">
        <div className="card" style={{marginBottom:"20px"}}>
        <h3 className="card-header font-italic font-weight-bold text-white bg-dark">
          {props.res.name}
        </h3>
        <div className="card-body" style={{backgroundColor:"aliceblue"}}>
        <img src={`http://localhost:5000/uploads/${props.res.image}`} className="img-thumbnail" alt="..." width="220"/>
          <h5 className="card-title  font-italic  font-weight-bold">Age : {props.res.age}</h5>
          <p className="card-text font-weight-bold"><h5 className="font-italic font-weight-bold">Address : </h5>{props.res.address}</p>
          <div className="d-flex justify-content-start mb-3">
          <h6 className="font-weight-bold"><span className="font-weight-bold font-italic">Blood Pressure : </span>{props.res.bloodpressure}</h6>
          <h6 className="ml-3 font-weight-bold"><span className="font-weight-bold font-italic">Sugar Level : </span>{props.res.sugarlevel}</h6>
          <h6 className="ml-3 font-weight-bold"><span className="font-weight-bold font-italic">Blood Group : </span>{props.res.bloodgroup}</h6>
          </div>
          <button onClick={e=>onclick(e)} className="btn btn-warning font-weight-bold border border-dark" style={{borderRadius:"10px"}}><FaCheck/> Completed</button>
        </div>
      </div>
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

export default connect(mapstatetoProps,mapdispatchtoProps)(Doccards)