const router = require("express").Router()
const bcrypt = require("bcrypt")
const Doctor  = require("../models/doctor")
const Patient = require("../models/patient")
const path = require("path")
const Clinic = require("../models/clinic")
const Specialization = require("../models/specializations")
const fileUpload = require('express-fileupload')
const Appointment = require("../models/appointment")
const multer = require("multer")
//Signup routes
//doc signup
router.post("/signupdoc",async (req,res)=>{
     const {name,email,password,age,gender,address,mobile,role,mcino,qualifications,specializations,from,to} = req.body
     try{
        const ans = await Doctor.findAll({where:{email}})
    if(ans.length>0){
        return res.json("false")
    }
    else{
        if(mobile.length!==10){
            return res.json("error")
        }
        else{
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt)
       const user = await Doctor.create({email,name,password:hashedpassword,age,gender,address,mobile,role,mcino,qualifications,specializations,from,to})
       res.json(user)
        }
    }
}
catch(error){
   return res.send("Server Error "+error)
}
})
//patient signup
router.post("/signuppat",async (req,res)=>{
    const {name,email,password,age,gender,address,mobile,role,bloodpressure,bloodgroup,sugarlevel} = req.body
    try{
       const ans = await Patient.findAll({where:{email}})
   if(ans.length>0){
       return res.json("false")
   }
   else{
       if(mobile.length!==10){
           return res.json("error")
       }
       else{
       const salt = await bcrypt.genSalt(10);
       const hashedpassword = await bcrypt.hash(password,salt)
      const user = await Patient.create({email,name,password:hashedpassword,age,gender,address,mobile,role,bloodpressure,bloodgroup,sugarlevel})
      res.json(user)
       }
   }
}
catch(error){
  return res.send("Server Error "+error)
}
})
//client signup
router.post("/signupcli",async (req,res)=>{
    const {name,email,password,age,gender,address,mobile,role,clinicname,specializations,from,to} = req.body
    try{
       const ans = await Clinic.findAll({where:{email}})
   if(ans.length>0){
       return res.json("false")
   }
   else{
       if(mobile.length!==10){
           return res.json("error")
       }
       else{
       const salt = await bcrypt.genSalt(10);
       const hashedpassword = await bcrypt.hash(password,salt)
      const user = await Clinic.create({email,name,password:hashedpassword,age,gender,address,mobile,role,clinicname,specializations,from,to})
      res.json(user)
       }
   }
}
catch(error){
  return res.send("Server Error "+error)
}
})
//login route
router.post("/login",async(req,res)=>{
   const {role,email,password} = req.body
   try {
       if(role==="patient"){
        const ans = await Patient.findAll({where:{email}})
        if(ans.length>0){
           const dbpassword = ans[0].password
           const passwordverify = await bcrypt.compare(password,dbpassword)
           if(passwordverify){
            return res.json(ans)
           }
           else{
               return res.json("incorrect")
           }
        }
        else{
             return res.json("false")
        }
       }
       else if(role==="doctor"){
        const ans = await Doctor.findAll({where:{email}})
        if(ans.length>0){
           const dbpassword = ans[0].password
           const passwordverify = await bcrypt.compare(password,dbpassword)
           if(passwordverify){
            return res.json(ans)
           }
           else{
               return res.json("incorrect")
           }
        }
        else{
             return res.json("false")
        }
       }
       else if(role==="clinic"){
        const ans = await Clinic.findAll({where:{email}})
        if(ans.length>0){
           const dbpassword = ans[0].password
           const passwordverify = await bcrypt.compare(password,dbpassword)
           if(passwordverify){
            return res.json(ans)
           }
           else{
               return res.json("incorrect")
           }
        }
        else{
             return res.json("false")
        }
       }
} catch (error) {
    return res.send(error)
}
})
//get all doctors
router.get("/doc",async(req,res)=>{
    try {
        const docs = await Doctor.findAll()
        res.json(docs)
    } catch (error) {
        res.json(error)
    }
  
})
//get all clinics
router.get("/clinics",async(req,res)=>{
    try {
        const clinics = await Clinic.findAll()
        res.json(clinics)
    } catch (error) {
        res.json(error)
    }
})
//update timings
router.put("/updatetime",async(req,res)=>{
    const {from,to,id,role} = req.body
    try {
       if(role==="doctor"){
         const ans = await Doctor.update({from,to},{where:{doc_id:id}})
         res.json(ans)
       }
       else if(role==="clinic"){
        const ans =await  Clinic.update({from,to},{where:{cli_id:id}})
        res.json(ans)
       }
    } catch (error) {
        res.json(error)
    }
})
//specialization
//create specialization
router.post("/specializations",async(req,res)=>{
    const {specialization} = req.body
    try {
        const ans= await Specialization.create({specialization})
        res.json(ans)
    } catch (error) {
res.json(error)
    }
})
//get specialization
router.get("/specializations",async(req,res)=>{
    const ans = await Specialization.findAll({attributes:["specialization"]})
    const result = ans.map(a=>(a.specialization))
    res.json(result)
})
//appointments
//create appointments
router.post("/appointments",async(req,res)=>{
    const {role,id,pat_id} = req.body
    try {
        if(role==="doctor"){
           const ans = await Appointment.create({pat_id,doc_id:id})
           res.json(ans)
        }
        else if(role==="clinic"){
            const ans = await Appointment.create({pat_id,cli_id:id})
            res.json(ans)
        }
    } catch (error) {
        res.json(error)
    }
})
//get appointments
router.get("/appointments",async(req,res)=>{
    const {role,id} = req.query
    try {
        Appointment.belongsTo(Doctor,{foreignKey:"doc_id"})
        Appointment.belongsTo(Clinic,{foreignKey:"cli_id"})
        Appointment.belongsTo(Patient,{foreignKey:"pat_id"})
        Doctor.hasMany(Appointment,{foreignKey:"doc_id"})
        Patient.hasMany(Appointment,{foreignKey:"pat_id"})
        Clinic.hasMany(Appointment,{foreignKey:"cli_id"})
        if(role==="doctor"){
            const ans = await Appointment.findAll({attributes:["app_id"],where:{doc_id:id},include:[Patient]})
            const result = ans.map(s=>(s.patient))
            res.json(result)
         }
         else if(role==="clinic"){
            const ans = await Appointment.findAll({attributes:["app_id"],where:{cli_id:id},include:[Patient]})
            const result = ans.map(s=>(s.patient))
            res.json(result)
         }
         else if(role==="patient"){
            const ans = await Appointment.findAll({attributes:['app_id'],where:{pat_id:id},include:[Doctor,Clinic]})
            const result = ans.map(res1=>{
                if(res1.clinic){
                    return res1.clinic
                }
                else if(res1.doctor){
                  return res1.doctor
                }
            })
            res.json(result)
         }
    } catch (error) {
        res.json(error)
    }
})
//delete appoitnments
router.delete("/patientdelete",async(req,res)=>{
    const {role,id,pat_id} = req.query
    try {
        if(role==="doctor"){
            const ans = await Appointment.destroy({where:{pat_id,doc_id:id}})
            res.json(ans)
         }
         else if(role==="clinic"){
             const ans = await Appointment.destroy({where:{pat_id,cli_id:id}})
             res.json(ans)
         }
    } catch (error) {
        res.json(error)
    }
})
router.delete("/docclidelete",async(req,res)=>{
    const {pat_id,role,id} = req.query
    try {
        if(role==="doctor"){
            const ans = await Appointment.destroy({where:{pat_id,doc_id:id}})
            res.json(ans)
         }
         else if(role==="clinic"){
             const ans = await Appointment.destroy({where:{pat_id,cli_id:id}})
             res.json(ans)
         }
    } catch (error) {
        res.json(error)
    }
})
//image
router.post("/image",async(req,res)=>{
    const {role,id} = req.query
    const file= req.files.file
    const ree = path.join(__dirname,"../public/uploads")
    file.mv(`${ree}\\${file.name}`)
    const path1 = `${file.name}`
    try {
        if(role==="doctor"){
            const ans = await Doctor.update({image:path1},{where:{doc_id:id}})
            res.json(ans)
         }
         else if(role==="clinic"){
            const ans = await Clinic.update({image:path1},{where:{cli_id:id}})
             res.json(ans)
         }
         else if(role==="patient"){
            const ans = await Patient.update({image:path1},{where:{pat_id:id}})
             res.json(ans)
         }
    } catch (error) {
        console.log(error)
    }
   
})

module.exports = router