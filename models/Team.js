var mongoose = require("mongoose");

var teamSchema = new mongoose.Schema({
    name: String,
    mainImage: String,
    email: String,
    type: String,
    description: String,
    carouselImages: [String],
    flavourText: String,
    socialMedia: [[String, String]],
    quotes: [[String, String]],
    tags: String
});

module.exports = mongoose.model("Team", teamSchema);