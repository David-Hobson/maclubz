var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var expressSession = require("express-session");

app.use(bodyParser.urlencoded({extender: true}));
app.use(express.static(__dirname + "/public"));
app.use(expressSession({
	secret: "clubza is really bad",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/team/:id", function(req, res){
	res.render("viewteam");
});

app.listen("8080", function(){
	console.log("Maclubz server has started...");
});