import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {connectDB} from "./controllers/controller.js"
import textRoutes from "./routes/text.js"

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log(`App is running on Port ${process.env.PORT}`);
    
})

app.use("/", textRoutes)

connectDB()



