import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

import dotenv from "dotenv"; //for importing and loading the api key from the .env file
dotenv.config();

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

const APIKey = process.env.API_KEY;

const API_URL = "https://api.openweathermap.org"

app.get("/", (req, res)=> {
   res.render("index.ejs", { Report: 'Waiting for umbrella requirements...'})
});

app.post("/rain-status", async (req, res)=>{
     const cityName = req.body.city_name;
     const input_date = req.body.input_date;

     const today = new Date();
     const currentDate = today.toISOString().split('T')[0];

     const targetDate = input_date || currentDate;

     const nextDay = new Date(today);
     nextDay.setDate(today.getDate()+1);
     const followingDate = nextDay.toISOString().split('T')[0];
    try {
        const result = await axios.get (API_URL + "/data/2.5/forecast/", {
            params:{
                q: cityName, 
                appid: APIKey,
            }
        })
        const forecast = result.data.list.find(item=>{
        const forecastDate= item.dt_txt.split(' ')[0]
        return forecastDate === followingDate;
        }) ;
       
        if (forecast.weather[0].main === "Rain" || forecast.weather[0].main === "Snow") {
            res.render("index.ejs", {Report:'Remember to bring your umbrella'})
        } else {
            res.render("index.ejs", {Report:  'No umbrella Needed' })
        }
        
    } catch (error) {
        res.render("index.ejs", { Report: JSON.stringify(error.response ? error.response.data : error.message) });
    }
})

app.listen (port, ()=>{
    console.log(`Server is running in port ${port}`);
})