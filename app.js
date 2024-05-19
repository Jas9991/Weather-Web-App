const express = require("express");

const app = express();

const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apikey = "935995590dc9e8b1baf5e68093b6e1d7";
  

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=metric";

  https.get(url, function (response) {
    

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      //console.log(weatherData);
      const temp = weatherData.main.temp;
      
      const description = weatherData.weather[0].description;
      //console.log(description);

      const icon = weatherData.weather[0].icon;
      //console.log(icon);

      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>The weather is currently " + description + " .</h1>");
      res.write(
        "<h2>The temperature in "+query+" is " + temp + " degree celcius.</h2>"
      );
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

// app.listen(3000, function () {
//   console.log("Server is runnning on port 3000");
// });


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server is up and running on port 3000.");
});
