const express = require("express")
const app = express()
const mysql = require('mysql');
const connection = require("./connection")
const cors = require("cors")
app.use(cors())
app.use(express.json());

const schema="sql6630559";

app.get("/femaleratio",(req,res)=>{

    var sql=`SELECT EXTRACT(YEAR FROM STR_TO_DATE(hire_date, '%Y/%m/%d')) AS hire_year, SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) AS female,SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS male FROM ${schema}.employeedata GROUP BY hire_year ORDER BY hire_year DESC LIMIT 7;`
    connection.query(sql,
        function (err, result) {
        if (err) throw err;
        res.status(201).json({
           result
        })
    });
})

app.get("/diversityacrossposition",(req,res)=>{

    var sql="SELECT jobtitle,SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) AS female,SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS male FROM  ${schema}.employeedata GROUP BY jobtitle LIMIT 5;"
    connection.query(sql,
        function (err, result) {
        if (err) throw err;
        res.status(201).json({
           result
        })
    });
})

app.get("/diversityacrosshiring",(req,res)=>{

    var sql=`SELECT stage AS name, SUM(male) AS male, SUM(female) AS female
    FROM  ${schema}.diversity_data
    GROUP BY stage;`
    connection.query(sql,
        function (err, result) {
        if (err) throw err;
        res.status(201).json({
           result
        })
    });
})

app.get("/diversityacrossvendors",(req,res)=>{

    var sql=`SELECT source_applicant as name,male,female FROM  ${schema}.applicant_data;`
    connection.query(sql,
        function (err, result) {
        if (err) throw err;
        res.status(201).json({
           result
        })
    });
})

app.listen(8080,()=>{
    console.log("Backend Server is Running...!!!!")
})