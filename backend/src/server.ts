import dotenv from 'dotenv'
dotenv.config();

import path from 'path';
import express from "express";
import cors from "cors"
import prodRouter from "./routers/prod.router";
import userRouter from "./routers/user.router";
import orderRouter from './routers/order.router';
import uploadRouter from './routers/upload.router'
import { dbConnect } from './configs/database.config';

dbConnect();

const app = express();
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

//Implement everything on food.service

app.use("/api/foods", prodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started at http://localhost:` + port);
})