import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

 const APIKey = "a3a47352717128a7d35002a279546378"
// const APIKey = {
//     headers: {Authorization : process.env.API_KEY}
// }

const API_URL = "https://api.openweathermap.org"
// const config = {
//     headers:{ Authorization : `appid`},
// }



app.get("/", (req, res)=> {
   res.render("index.ejs", { Report: 'Waiting for umbrella requirements...'})
});

app.post("/rain-status", async (req, res)=>{
     const cityName = req.body.city_name;
    const input_date = req.body.input_date;

    console.log(input_date);

    try {
        const result = await axios.get (API_URL + "/data/2.5/forecast/", {
            params:{
                q: cityName, 
                appid: APIKey,
            }
        })
        // const date = result.data.list.map(item=>item.dt_txt) 
        // console.log(date);
        // if (date == input_date) {
        //     res.render("index.ejs", {Report: 'date'})
        // } else {
        //     res.render("index.ejs", {Report: 'Remember to bring your umbrella'})
        // }

        // if (result.data.rain == undefined) {
        //     res.render("index.ejs", {Report: 'No umbrella Needed'})
        // } else {
        //     res.render("index.ejs", {Report: 'Remember to bring your umbrella'})
        // }
        
        res.render("index.ejs", {Report: JSON.stringify(result.data.list)})
        console.log(result.data.main)
    } catch (error) {
        res.render("index.ejs", { Report: JSON.stringify(error.response ? error.response.data : error.message) });
    }
})



app.listen (port, ()=>{
    console.log(`Server is running in port ${port}`);
})