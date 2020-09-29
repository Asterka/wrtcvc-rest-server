const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: 
        {type: String, required:[true, "Name has to be defined"]},
    id:
        {type: Number, required:[true, "ID has to be defined"]},
    users:
        {type: Array, required:[flase]}
});

const Room = mongoose.model("room", roomSchema);

module.exports = Room;