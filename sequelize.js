const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    "basic",
    "root",
    "",
    {
        host:'localhost',
        dialect:'mysql'
    }
);

sequelize.authenticate().then(()=>{
console.log("connection has been established");
}).catch((error)=>{
    console.log("unable to connect database ");
});
module.exports = sequelize;