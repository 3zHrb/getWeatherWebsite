const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");



var AA;
var BB;
var Img;

var app = express();



app.set("views engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + "/public"));


// openning the server in port 2000
app.listen(2000, function(){

console.log("The Server Just Start Running");

});

// if the user requested localhost:2000/ give him this page
app.get("/", function(userRequestInfo, yourResponsToTheUser){


yourResponsToTheUser.sendFile(__dirname +"/searchPage.html");

});

// if a post
app.get("/searchPage.html", function(req,resp){

  var toFixedBB = BB.toFixed(0);
resp.render("resultPage.ejs", {cityNameR: AA, degreeR: toFixedBB, imgsrc: Img});
});

app.post("/", function(userRequestInfo, yourResponsToTheUser){



AA = userRequestInfo.body.cityName;


const APIKEY = "4f1b26933f9b93052cc630886a8c1b6b";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" +AA+ "&appid=" + APIKEY;

https.get(weatherURL, function(response){


response.on("data", function(data){
console.log("Printing Data below <br>");
console.log(data);

  var dataHolder = JSON.parse(data);
var tem = dataHolder.main.temp;
BB = tem - 273.15;
var ImgCapture = dataHolder.weather[0].icon;

Img ="http://openweathermap.org/img/wn/"+ImgCapture+"@2x.png";


//console.log(tempToCelsius + " degree");
//console.log(dataHolder.name);
//console.log(dataHolder.sys.country);

yourResponsToTheUser.redirect("/searchPage.html");

});

});

});
