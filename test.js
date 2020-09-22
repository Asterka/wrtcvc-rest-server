
const express = require('express')
const fs = require('fs')
const path = require('path');
const e = require('express');
const app = express()


const roomInfo = JSON.parse(fs.readFileSync(`${__dirname}/resourses/test.json`, "utf-8"))

function getRoomWithID(id){
	let rooms = roomInfo.rooms;
	for(let i = 0;i < rooms.length;i++){
		if(rooms[i].id === id){
			return rooms[i];
		}
	}
	return undefined;
}
 
app.get('/getRooms', function(req, res) {
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
		res.end(JSON.stringify(roomInfo.rooms))
	}
})

app.get('/getRoomUsers', function(req, res) {
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

let port = 3001;
app.listen(port, function () {
	console.log(`App is running on port ${port}`)
})