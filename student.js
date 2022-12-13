const { QueryInterface } = require('sequelize');
const DataTypes = require('sequelize');
const sequelize = require('./sequelize.js');
const Student = sequelize.define("Student",{
    stud_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    stud_name:{type:DataTypes.STRING,allowNull:false},
    stud_email:{type:DataTypes.STRING,allowNull:false},
    createdAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,
});

sequelize.sync().then(()=>{
    console.log("Student table created succesfully");
}).catch((error)=>{
    console.error("unable to create table");
});
module.exports = Student