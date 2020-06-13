import React,{useContext,useState} from "react"
import "./Profile.css"
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { FaWindows } from "react-icons/fa";
import {connect} from "react-redux"
function Profile(props){
    const [currentuser,setcurrentuser] = useState(props.currentuser)
    const [loggedin,setloggedin] = useState(props.loggedin)
    if(loggedin===false)
    {window.location = "/login"}
   let role = currentuser.role
    let id = 0
    if(role==="doctor"){
        id = currentuser.doc_id
      }
      else if(role==="clinic"){
          id = currentuser.cli_id
      }
      else if(role==="patient"){
          id= currentuser.pat_id
      }
    return(
        <div className="profile">
        <div className="pt-5">
        {loggedin?
            <div className=" container text-center font-weight-bold font-italic">
            <p className="font-weight-bold display-4 font-italic text-center text-white">Your Profile</p>
            <div className="d-flex justify-content-center pt-4">
            <div className="text-left">
            <img className="mb-3 img-thumbnail bg-secondary rounded mx-auto d-block" src={`http://localhost:5000/uploads/${currentuser.image}`}width="290" height="200"/>
           <label>Edit Profile Image : </label>
            <FilePond server={`http://localhost:5000/image?role=${role}&id=${id}`} name="file"/>
            <h5><span >Name : </span><span>{currentuser.name}</span></h5>
            <h5><span >Address : </span><span>{currentuser.address}</span></h5>
            <h5><span >Role : </span><span>{currentuser.role}</span></h5>
            <h5><span >email : </span><span>{currentuser.email}</span></h5>
           </div>
           </div>
            </div>
            :
            <p className="text-center font-weight-bold font-italic display-4">Please Login to view profile</p>}
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
export default connect(mapstatetoProps,mapdispatchtoProps)(Profile)