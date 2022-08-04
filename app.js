const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/", function(request, response) {
  var cityName = request.body.cityInput;
  const appID = "4f5ceaf6d7e418e3d648da71603979f9";
  const units = "metric";
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+ appID +"&units="+ units;

  https.get(url, function(responseOW){
    console.log("Http status code from OpenWeather API Calling is " + responseOW.statusCode);
    responseOW.on("data" , function(data){
      var weatherData = JSON.parse(data);
      console.log(weatherData);
      if(weatherData.cod != 200){
        response.send("Invalid city name. Please try again.");
      }else{
        var temp = weatherData.main.temp;
        var desc = weatherData.weather[0].description;
        var icon = weatherData.weather[0].icon;
        var icoURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
        response.write("<div style='background-color:aqua; height:100vh' >")
        response.write("<h1>Temperature at " + cityName + " is " + temp +" degrees celcius , </h1>");
        response.write("<h2>Weather feels like " + desc + " </h2>");
        response.write("<img src='" + icoURL  + "'>");
        response.write("</div>");
        response.send();
      }
      //Cant have 2 response or will error/crash
      //response.send("Server is up and running.");
    });
  });

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started on port 3000 for WeatherProject");
});

// 1. Creating an object(JS) and 2. converting it to JSON
//Step 1
/*const object  = {
  name : "Simranjeet",
  age : "23",
}
//Step 2
console.log(JSON.stringify(object));
console.log(object.name);*/
