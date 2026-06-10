// console.log("1: Starting server");
// const cors = require("cors");
// const express = require("express");
// const app = express();
// app.use(cors());
// console.log("2: Express loaded");

// const contactRoutes = require("./routes/contactus");

// console.log("3: Routes loaded");

// app.use(express.json());

// app.use("/api/v1", contactRoutes);

// app.listen(3000, () => {
//   console.log("4: Server started on port 3000");
// });
const express = require("express");
const app = express();
const userroutes = require("./routes/user");
const profileroutes = require("./routes/profile");
const paymentroutes = require("./routes/payment");
const courseroutes = require("./routes/course")
const contactroutes =require("./routes/contact");
const database = require("./config/database");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryconnect} = require("./config/cloudinary");
const fileupload = require("express-fileupload");
require("dotenv").config();
const PORT = process.env.PORT||4000
database.connect();
app.use(cookieparser());
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));
app.use(
    fileupload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
cloudinaryconnect();
app.use("/api/v1/auth",userroutes);
app.use("/api/v1/profile",profileroutes);
app.use("/api/v1/course",courseroutes);
app.use("/api/v1/payment",paymentroutes);
app.use("/api/v1/reach",contactroutes);
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"your server is up and running",
    })
})

app.listen(PORT,()=>{
    console.log(`app is running at ${PORT}`);
})