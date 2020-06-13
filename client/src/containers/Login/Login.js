import React,{useState} from 'react'
import {Link,useHistory} from "react-router-dom"
import {connect} from "react-redux"
import "./Login.css"
import {toast} from "react-toastify"
function Login(props){
    const history = useHistory()
    const [loggedin,setloggedin] = useState(props.loggedin)
    const [currentuser,setcurrentuser] = useState(props.currentuser)
     const [user,setuser] = useState({
         role:"",
         email:"",
         password:""
     })
     function onchange(e){
         setuser({...user,[e.target.name]:e.target.value})
     }
    async function onsubmit(e){
        e.preventDefault()
        const {email,password,role} = user
        const body = {email,password,role}
        const response = await fetch("http://localhost:5000/login",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(body)
        })
        const ans = await response.json()
        if(ans==="false"){
            toast.error("User doesn't exists",{className:"text-center mt-4"})
        }
        else if(ans==="incorrect"){
            toast.error("Password incorrect",{className:"text-center mt-4"})
        }
        else{
            toast.success("Successfully Loggedin",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
            setcurrentuser(ans[0])
            props.oncurrentuser(currentuser)
            setloggedin(true)
            props.onloggedin(loggedin)
            history.push("/homepage")
            }
      
    }
    return(
        <div className="login">
{loggedin?<p className="text-center font-weight-normal display-4">Already Logged In</p>:
        <div className="container pt-5">
        <p className="text-center font-weight-normal font-italic display-4" style={{ color:"black"}}>Login</p>
        <div className="d-flex justify-content-center">
        <form style={{width:"50%"}} onSubmit={onsubmit}>
        <div className="dropdown mr-1">
        <div className="form-group">
        <select onChange={e=>onchange(e)} name="role" className="form-control mb-3" required>
        <option>Select Your Role</option> 
        <option value="doctor" >Doctor</option>
          <option value="clinic">Clinic</option>
          <option value="patient">Patient</option>
        </select>
      </div>
      </div>
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={e=>onchange(e)} className="form-control my-3" required/>
        <input type="password" name="password" placeholder="Password" value={user.password} onChange={e=>onchange(e)} className="form-control my-3" required/>
        <div className="d-flex justify-content-center">
        <button className="btn font-weight-bold px-5 btn-warning">Login</button>
        </div>
        <div className="d-flex justify-content-center">
        <Link to="/signup" className="text-center text-white font-weight-bold mt-2">New User?Sign Up</Link>
        </div>
      </form>
        </div>
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

export default connect(mapstatetoProps,mapdispatchtoProps)(Login)