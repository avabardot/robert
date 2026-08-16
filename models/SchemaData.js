const mongoose = require('mongoose');
const {Schema} = mongoose;

// Connecting is db.js's job now; this module only describes the shapes.

const projectSchema = new Schema({
    title: String,
    link: String,
    description: String,
});

const buttonSchema = new Schema({
    buttonText: String,
    type: String,
    value: Boolean,
});

const userSchema = new Schema({
    userId: String,
    date: Date
});

const robertSchema = new Schema({
    mood: String,
    returning: Boolean,
    talking: String,
    action: String,
    innerText: String
});

mongoose.model("projects", projectSchema);
mongoose.model("users", userSchema);
mongoose.model("moods", robertSchema);
mongoose.model("buttons", buttonSchema);
