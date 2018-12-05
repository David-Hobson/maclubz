var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var expressSession = require("express-session");

var Team = require("./models/Team");
var User = require("./models/user");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(expressSession({
	secret: "clubza is really bad",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.set("view engine", "ejs");

mongoose.connect("mongodb://main_user:maclubzrules69@ds115752.mlab.com:15752/maclubz");

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
	Team.find().sort({name: 1}).exec(function(err, allTeams){
		res.render("landing", {teams: allTeams});
	});
});

app.get("/login", function(req, res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
}), function(req, res){

});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("back");
});

app.get("/results", function(req, res){
	Team.find().sort({name: 1}).exec(function(err, allTeams){
		res.render("results", {teams: allTeams, query: req.query.query});
	});
});

app.get("/teams/:id", function(req, res){
	Team.findById(req.params.id).exec(function(err, foundTeam){
		res.render("viewteam", {team: foundTeam});	
	});
	
});

app.listen("8080", function(){
	console.log("Maclubz server has started...");
});