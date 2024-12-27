import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

const API_URL = "https://api.openweathermap.org/data/2.5"

const API_key =

app.get("/", (req, res)=> {
   res.render("index.ejs", { Report: 'Waiting for umbrella requirements...'})
})



app.listen (port, ()=>{
    console.log(`Server is running in port ${port}`);
})