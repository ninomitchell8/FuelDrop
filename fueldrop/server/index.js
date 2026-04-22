import express, { json } from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT|| 5000;
app.set("trust proxy", 1);

const corsOptions = {
  origin: "https://fuel-drop-nu.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.options(/.*/, cors(corsOptions));

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


const db = new sqlite3.Database("./fueldrop.db",(err) => {

        if (err) console.error(err.message);
        
        else console.log("Connected to fueldrop DB");

    
});

app.post ('/register',async (req, res) => {

    const {name, lastname, password, confirmPassword, email, cellphone} = req.body; //Object destructuring - extract req.body property

    if( !name || !lastname || !password || !confirmPassword || !email || !cellphone){

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
        (err, rows) => { //rows = var name of results - naturally array format
        if (err) {
            console.error("DB error:", err.message);
            return res.status(500).json([{ error: err.message }]); // send empty array on error
        }
        res.json(rows || []); // send actual rows
        }

    );
});

app.delete("/inventory/:id", auth, async (req, res) => {
  
    const { id } = req.params; // get ID from URL
    const user_id = req.user.id;
  
 
    // Optional: check if the item belongs to the user
        db.get(
            
            "SELECT * FROM inventory WHERE inventory_id = ? AND user_id = ?",
            
            [id, user_id],
            
            (err, item) => {

                if(err){
                    console.log("DB error:",err.message);
                    return res.status(500).json({error : "DB error"});
                }
            

            if (!item) {
                return res.status(404).json({ error: "Item not found" });
            }

            db.run(
                
                "DELETE FROM inventory WHERE inventory_id = ?", [id],
            
                function (err){
                    
                    if (err){

                        console.error("Delete error",err.message);
                        return res.status(500).json({ error: "Failed to delete item" });
                    }
                    
                    res.json({ message: "Item deleted successfully" });

                }
                
             );

            }
        );
});


app.post("/configure",auth,async(req,res) =>{

    const { type, make, model, regNumber, fuel, litres} = req.body

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

app.post ("/invoice",auth, async(req,res)=>{

    const dieselPrice = 19.46;

    const petrolPrice = 19.28;

    const deliveryFee = 150;

    const {items, latitude, longitude} = req.body;

    let processedItems = [];

    let totalItemPrice = 0;

    let totalPrice = 0;

    let minPrice = 0;

    const user_id = req.user.id;

    if( !items|| !latitude ||!longitude) {

            return res.status(400).json({error: "All fields required"});
        }

    try{

        for (const item of items){
       
            const inv = await new Promise((resolve,reject) => { db.get (
                
                "SELECT inventory_id, make, model, regNumber, fuel, litres,type FROM inventory WHERE inventory_id=? AND user_id =?",
                [item.inventory_id, user_id],
                (err, row) =>{

                    if (err)reject(err);
                    else resolve(row);
                }
            );

        });
            if (!inv){

                return res.status (404).json({error: "Inventory non existent"});
            }
        
            const unitPrice = inv.fuel === "diesel"? dieselPrice : petrolPrice;

            const itemPrice = unitPrice * inv.litres;

            totalItemPrice += itemPrice;
            
            totalPrice = totalItemPrice + deliveryFee;//adds up all the item prices

            minPrice = totalPrice *0.75; 

            processedItems.push({

                inventory_id: inv.inventory_id,
                make: inv.make,
                model: inv.model,
                regNumber: inv.regNumber,
                fuel:inv.fuel,
                litres: inv.litres,
                type: inv.type,
                unit_price: unitPrice,
                item_price: itemPrice,
                
            });

        }

            
        await db.run("INSERT INTO orders (user_id, totalPrice, latitude, longitude) VALUES (?, ?, ?, ?)", [user_id, totalPrice, latitude, longitude],

            function(err){

                if (err){
                console.log(err,"DB Insertion unsuccesful");
                return res.status(500).json({error: "Invoice creation fail"});                       
                }
    
        
        
            return res.status(201).json({
             order_id: this.lastID,//returns row ID of last inserted
             items: processedItems,
             total_price: totalPrice,
             min_price: minPrice,
             delivery_fee: deliveryFee,
             latitude:latitude,
             longitude: longitude

            });                          

            }
        );
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "server err"});
    }

});

app.post("/eta",auth, async(req,res) =>{

    console.log("ETA ROUTE HIT");
    
    const api = process.env.ORS_API_KEY;

try{

    const user_id = req.user.id;

    const {order_id} = req.body;

    const origin = [18.847,-33.940]

    console.log("BODY:", req.body);
    console.log("USER ID:", user_id);
    console.log("ORDER ID:", order_id);

    const location = await new Promise((resolve,reject) =>{ db.get("SELECT latitude, longitude FROM orders WHERE order_id = ? AND user_id = ?",[order_id,user_id],
        (err, row) =>{

            if (err)reject (err);

            else{ console.log("DB ROW",row);
                resolve(row);
            }
        }
    );

})

    const destination = [Number(location.longitude),Number(location.latitude)]

    
    const response = await fetch ("https://api.openrouteservice.org/v2/matrix/driving-car",{

        method: "POST",
        headers: {
           "Authorization": api,
            "Content-Type": "application/json"
        },

        body: JSON.stringify({         
            locations: [origin, destination],
            metrics: ["duration", "distance"]})
    });
    
        const json = await response.json();

        const durationSeconds = json.durations[0][1];

        const durationMinutes = Math.round(durationSeconds/60);

        
        console.log("ORIGIN:", origin)
        console.log("DESTINATION:", destination)
        console.log("ORS STATUS:", response.status)
        console.log("ORS JSON:", json)
        console.log("ORS RESPONSE:", json);

        res.json({eta: durationMinutes});


    }catch(err){

        console.error("ETA error",err);
        res.status(500).json({error:"ETA calculation failed"});
}
    
    
});



app.post("/store-user-data", auth, (req, res) => {

  console.log("AUTH USER:", req.user);
  console.log("DATA:", req.body);


  res.json({ success: true });
});




app.listen (PORT,() => {
    console.log(`Server running on ${PORT}`);
});