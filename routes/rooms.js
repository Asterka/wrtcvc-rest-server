const fs = require("fs")
const express = require("express");
const router = express.Router();

const roomInfo = JSON.parse(fs.readFileSync(`${__dirname}/../resourses/test.json`, "utf-8"))

function getRoomWithID(id){
	id = parseInt(id);
	let rooms = roomInfo.rooms;
	for(let i = 0;i < rooms.length;i++){
		if(rooms[i].id === id){
			return rooms[i];
		}
	}
	return undefined;
}

router.get('/rooms', function(req, res) {
	//take the roomID
	let roomId = req.query.id || -1;

	//In case there is a roomID in the request
	if(roomId != -1){
		let response = getRoomWithID(parseInt(roomId, 10));
		if(response){
			res.end(JSON.stringify(response))
		}
		else{
			res.end(`No room with id ${roomId}`)
	}
	}
	else{
		res.end(JSON.stringify(roomInfo))
	}
})

//Add a room
router.post('/rooms', function(req, res) {
	//take the userID
	let roomID = req.query.id || -1;

	//In case there is a roomID in the request
	if(roomID != -1){
		let response = getRoomWithID(parseInt(roomID, 10));
		if(response){
			res.end(JSON.stringify(response.users))
		}
		else{
			res.end(`No room with id ${roomID}`)
	}
	}
	else{
		res.end("No room specified in the request")
	}
})

//Update the room
router.put('/rooms/:id', function(req, res) {
	//Data validation
	let goodData = req.body.name && req.body.id && req.body.users.length >= 0 && parseInt(req.params.id) === req.body.id;

	if(getRoomWithID(req.params.id)){
		console.log("Such room exists");
		res.send("😡 PUT request has not been fulfilled, a room with such ID is already there");
		console.log("😡");
	}
	else{
		if(goodData){
			roomInfo.rooms[roomInfo.rooms.length] = req.body;
			res.send("👍PUT request has been fulfilled👍");
			roomInfo.rooms.sort((element1, element2)=>{
				return element1.id - element2.id;
			});
			console.log(roomInfo.rooms);
			console.log("👍");
		}
		else{
			res.send("😡 PUT request has not been fulfilled, corrupt params");
			console.log("😡");
		}
	}
})

//Update the room
router.delete('/rooms/:id', function(req, res) {
	
})

module.exports = router;
