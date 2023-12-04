const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let playerQueue = [];

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
	console.log("player connected");

	socket.on("join queue", () => {
		playerQueue.push(socket);
		console.log(
			socket.id,
			"joined queue...",
			"current queue:",
			playerQueue.length
		);

		// Check if there are at least two players in the queue
		if (playerQueue.length >= 2) {
			// Pair the first two players in the queue and remove them
			const player1 = playerQueue.shift();
			const player2 = playerQueue.shift();

			// Create a unique room name
			const roomName = `room-${Date.now()}`;

			// Join players to the room
			player1.join(roomName);
			player2.join(roomName);

			// Inform the players about the room
			player1.emit("room joined", roomName);
			player2.emit("room joined", roomName);
		}
	});


	socket.on("disconnect", () => {
		console.log("player disconnected");

		// Remove the player from the queue if they are in it
		const index = playerQueue.indexOf(socket);
		if (index !== -1) {
			playerQueue.splice(index, 1);
		}
	});
});

server.listen(3000, () => {
	console.log("listening on *:3000");
});
