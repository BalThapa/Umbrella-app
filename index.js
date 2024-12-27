import dotenv from "dotenv";
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

const API_URL = "https://api.openweathermap.org"
const config = {
    headers:{ Authorization : process.env.API_KEY},
}

app.get("/", (req, res)=> {
   res.render("index.ejs", { Report: 'Waiting for umbrella requirements...'})
});

app.post("/rain-status", async (req, res)=>{
    const searchCity = req.body.city;
    try {
        const result = await axios.get (`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99`, config)
        console.log(result);
        res.render("index.ejs", {Report: JSON.stringify(result.data)})
    } catch (error) {
        res.render("index.ejs", {Report: JSON.stringify(error.response.data)})
    }
})



app.listen (port, ()=>{
    console.log(`Server is running in port ${port}`);
})