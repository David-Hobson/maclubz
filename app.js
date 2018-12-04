var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var expressSession = require("express-session");

var Team = require("./models/team");

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

mongoose.connect("mongodb://main_user:maclubzrules69@ds115752.mlab.com:15752/maclubz");

app.get("/", function(req, res){
	Team.find().sort({name: 1}).exec(function(err, allTeams){
		res.render("landing", {teams: allTeams});
	});
});

app.get("/results", function(req, res){
	Team.find().sort({name: 1}).exec(function(err, allTeams){
		res.render("results", {teams: allTeams});
	});
});

app.get("/team/:id", function(req, res){
	res.render("viewteam");
});

app.listen("8080", function(){
	console.log("Maclubz server has started...");
});