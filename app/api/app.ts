import express from "express";
import mainRouter from "./route/mainRoute";
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const corsOptions = {
    origin: process.env.FRONT_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/images', express.static(path.join('public', 'uploads')));

app.use('/api', mainRouter);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

export default app;