import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const db = new sqlite3.Database("./fueldrop.db",(err) => {

        if (err) console.error(err.message);
        
        else console.log("Connected to fueldrop DB");

    
});

app.post ('/register',(req, res) => {

    const {name,lastname,password,confirmPassword,email,cellphone} = req.body;

    if(!name|| !lastname || !password || !confirmPassword || !email || !cellphone){

        return res.status(400).json({error:"All fields required"}); //key-value_client error/bad req
    }

    if ( password !== confirmPassword){
        return res.status(400).json({error: "Password does not match!"})
    }
    

    const sql = 'INSERT INTO users (name, lastname, password, email, cellphone) VALUES (?,?,?,?,?)';

    db.run(sql, [ name, lastname, password, email, cellphone], function (err){

        if (err){
            console.error(err.message);
            return res.status(500).json({error:"DB error!"}); //key-value_Server error
        }

        res.json({message: "Successfully registered!"});
    console.log(req.body);
    });

});

app.post('/login',(req, res) => {
    

});



app.listen (PORT,() => {
    console.log("yes yes");
});