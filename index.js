import dotenv from "dotenv";
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

const APIKey = "a3a47352717128a7d35002a279546378"

const API_URL = "https://api.openweathermap.org"
// const config = {
//     headers:{ Authorization : `appid`},
// }



app.get("/", (req, res)=> {
   res.render("index.ejs", { Report: 'Waiting for umbrella requirements...'})
});

app.post("/rain-status", async (req, res)=>{
    // const cityName = req.body.city;
    try {
        const result = await axios.get (API_URL + "/data/2.5/weather/", {
            params:{
                zip: 33130, 
                appid: APIKey,
            }
        })
        res.render("index.ejs", {Report: JSON.stringify(result.data.weather) }
        )
       
    } catch (error) {
        res.render("index.ejs", {Report: JSON.stringify(error.response.data)})
    }
})



app.listen (port, ()=>{
    console.log(`Server is running in port ${port}`);
})