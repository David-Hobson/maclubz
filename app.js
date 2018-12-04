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

mongoose.connect("mongodb://main_user:maclubzrules69@ds115752.mlab.com:15752/maclubz");

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
	console.log(req.user);
    res.locals.currentUser = req.user;
    next();
});

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");

app.get("/", function(req, res){
	Team.find().sort({name: 1}).exec(function(err, allTeams){
		res.render("landing", {teams: allTeams});
	});
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

app.post("/login", passport.authenticate("local", function(err, user, info){
	console.log(err);
}));

app.listen("8080", function(){
	// User.register(new User({username: "gsmith10"}), "testtest10", function(err, user){
 //        if(err){
 //            console.log(err);
 //        }
 //    });
	console.log("Maclubz server has started...");
});