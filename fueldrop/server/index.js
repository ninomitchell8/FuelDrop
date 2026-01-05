import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcryptjs"; 
import session from "express-session";

const app = express();
const PORT = 5000;

app.use(cors({

    origin: "https://literate-cod-jpx676qxq6q3pwp5-5173.app.github.dev",
    credentials : true,
    methods: ["GET", "POST"]
    
}));

app.use(express.json());

app.use(session({
    name: "fueldrop.sid",
    secret: "super-secret-key", 
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,  // true only if HTTPS.
        sameSite: "lax" //because diffrent ports asnd subdomains front and back
    }
}));

app.use(express.urlencoded({extended:true}))

function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}


const db = new sqlite3.Database("./fueldrop.db",(err) => {

        if (err) console.error(err.message);
        
        else console.log("Connected to fueldrop DB");

    
});

app.post ('/register',async (req, res) => {

    const {name,lastname,password,confirmPassword,email,cellphone} = req.body; //Object destructuring - extract req.body property

    if(!name|| !lastname || !password || !confirmPassword || !email || !cellphone){

        return res.status(400).json({error:"All fields required"}); //key-value_client error/bad req
    }

    if ( password !== confirmPassword){
        return res.status(400).json({error: "Password does not match!"})
    }

    try{

        const hashedPassword =  await bcrypt.hash(password, 10);

        const user = 'INSERT INTO users (name, lastname, password, email, cellphone) VALUES (?,?,?,?,?)';
        
        db.run(user, [name, lastname, hashedPassword, email, cellphone], function (err){ //executes query with array of values

        if (err){
            console.error(err.message);
            return res.status(400).json({error:"Email already registered"}); //key-value_Server error
        }

        res.json({message: "Successfully registered!"});
        console.log(req.body);
    });
  }catch (err){
    console.log("Hash error",err);
  }

});

app.post('/login',async (req, res) => {

    const {email, password} = req.body;

    if (!email ||!password){

        return res.status(400),({error:"All fields required"});
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    
    db.get (sql, [email], async function(err,user ){

        if (err){

            console.log(err.message);
            return res.status(500).json({error: "Db error"});
        }

        if (!user){
            return res.status(401).json({error: "invalid email or Password"});
        }

        
        const match = await bcrypt.compare(password, user.password);

        if(!match){

            return res.status (401).json({error : "Invalid Password"});
        }

        req.session.user = {
            id: user.id
        };

        return res.json({

            message: "Login Success!",
            user: {id: user.id, name: user.name, email: user.email},
        });

        
    });

});


app.post ('/home',(req, res) => {


});

app.post("/configure",requireAuth,async(req,res) =>{

    const { type,make,model,regNumber,fuel,litres} = req.body

    const id = req.session.user.id;

    if (!type || !make || !model || !regNumber || !fuel || !litres){

        return res.status(400).json({error: "All fields required"})
    }

    try{

        const inventory = "INSERT INTO inventory (type, make, model, regNumber, fuel, litres, id) VALUES(?,?,?,?,?,?,?)";

        db.run(inventory, [type, make, model, regNumber, fuel, litres, id], function (err){ //executes query with array of values

        if (err){
            console.error("DB error",err.message);
            return res.status(400).json({error:"regNo/SerialNo already exist"}); //key-value_Server error
        }

        res.json({message: "Successfully added to inventory!"});
            console.log(req.body);
    });
        }catch (err){
            console.log("error",err);
    }
    

});


app.listen (PORT,() => {
    console.log("yes yes");
});