const Sequelize = require("sequelize")
const db = require("../config/db")

const Patient = db.define("patient",{
    pat_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    name:{
     type:Sequelize.STRING(200),
     allowNull:false
    },
    email:{
    type:Sequelize.STRING(200),
    allowNull:false,
    unique:true
    },
    password:{
        type:Sequelize.STRING(200),
        allowNull:false
        },
    age:{
        type:Sequelize.STRING(20),
        allowNull:false
        },
    gender:{
        type:Sequelize.STRING(200),
        allowNull:false
        },
    address:{
        type:Sequelize.STRING(200),
        allowNull:false
        },
    mobile:{
            type:Sequelize.STRING(200),
            allowNull:false
            },
    role:{
        type:Sequelize.STRING(200),
        allowNull:false
        },
    bloodgroup:{
        type:Sequelize.STRING(200),
        allowNull:false
    },
    bloodpressure:{
        type:Sequelize.STRING(200),
        allowNull:false
    },
    sugarlevel:{
        type:Sequelize.STRING(200),
        allowNull:false
    },
    image:{
        type:Sequelize.STRING(500)
      },
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
})

module.exports = Patient