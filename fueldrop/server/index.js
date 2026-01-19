import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT|| 5000;
app.set("trust proxy", 1);

app.use(cors({

    origin: "https://literate-cod-jpx676qxq6q3pwp5-5173.app.github.dev",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))



function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, "SUPER_SECRET_KEY");
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}


const db = new sqlite3.Database("/workspaces/FuelDrop/fueldrop/fueldrop.db",(err) => {

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

        const payload = {   id: user.id,
                            email: user.email
                            };
        
        const token = jwt.sign(payload, "SUPER_SECRET_KEY", {
            expiresIn: "1h",
        });


        
        return res.json({

            message: "Login Success!",
            user: {id: user.id, name: user.name, email: user.email},
            token
        
        });

    });

        
    
});


app.get('/home', auth, (req, res) => {

  const user_id = req.user.id;

    db.all(
        "SELECT * FROM inventory WHERE user_id = ?",
        [user_id],
        (err, rows) => { //rows = var name of results -naturally array format
        if (err) {
            console.error("DB error:", err.message);
            return res.status(500).json([]); // send empty array on error
        }
        res.json(rows || []); // send actual rows
        }
    );
    });

    app.delete("/inventory/:id", auth, async (req, res) => {
  const { id } = req.params; // get ID from URL
  try {
    const db = await dbPromise;

    // Optional: check if the item belongs to the user
    const item = await db.get(
      "SELECT * FROM inventory WHERE inventory_id = ? AND user_id = ?",
      [id, req.user.id]
    );

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    await db.run("DELETE FROM inventory WHERE inventory_id = ?", [id]);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete item" });
  }
});






app.post("/configure",auth,async(req,res) =>{

    const { type,make,model,regNumber,fuel,litres} = req.body

    if (!type || !make || !model || !regNumber || !fuel || !litres){

        return res.status(400).json({error: "All fields required"})

    }

    const user_id = req.user.id;


    try{

        const inventory = "INSERT INTO inventory (type, make, model, regNumber, fuel, litres,user_id) VALUES(?,?,?,?,?,?,?)";

        db.run(inventory, [type, make, model, regNumber, fuel, litres,user_id], function (err){ //executes query with array of values

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

        console.log("USER ID:", req.user.id);
        console.log("FORM DATA:", req.body);

});

app.post("/store-user-data", auth, (req, res) => {

  console.log("AUTH USER:", req.user);
  console.log("DATA:", req.body);

  res.json({ success: true });
});


app.listen (PORT,() => {
    console.log("yes yes");
});