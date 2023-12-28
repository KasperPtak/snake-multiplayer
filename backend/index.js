const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = 80; //standard http port

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

app.use(cors());

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

		if (playerQueue.length >= 2) {
			// shift is just default js, takes first element of array and returns, if it finds one
			const player1 = playerQueue.shift();
			const player2 = playerQueue.shift();

			// Create a "unique" room name xd
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

server.listen(PORT, () => {
	console.log(`listening on http://localhost:${PORT}`);
});