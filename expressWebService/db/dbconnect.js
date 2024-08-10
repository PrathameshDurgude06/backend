const mysql=require("mysql2");

//databse connection details

var mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root123',
    database:'cms',
    port:3306
    //multipleStatements:true
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("connection done")
    }
    else{
        console.log(err);
    }

})

module.exports=mysqlConnection;