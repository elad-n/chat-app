const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { inspect } = require("util");

app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

const PORT = process.env.PORT || 3001;

class Users {
	constructor() {
		this.users = [];
		this.objId = 0;
	}

	add(name) {
		this.users.push({ name: name, id: this.objId++ });
		return this.objId - 1;
	}

	exists(id) {
		return this.users.find(value => {
			return value.id === Number(id);
		});
	}
}

class Rooms {
	constructor(users) {
		this.rooms = [{ name: "main", users: [], text: [], id: 0 }];
		this.objId = 1;
		this.users = users;
	}

	add(name) {
		this.rooms.push({ name: name, users: [], text: [], id: this.objId++ });
		return this.objId - 1;
	}

	addUser(roomId, userId) {
		const room = this.getRoom(roomId);
		if (!room) {
			throw Error("Room not found");
		}

		if (!this.users.exists(userId)) {
			throw Error("User not found");
		}
		room.users.push(userId);
	}

	deleteUser(roomId, userId) {
		const room = this.getRoom(roomId);
		if (!room) {
			throw Error("Room not found");
		}

		if (!this.users.exists(userId)) {
			throw Error("User not found");
		}
		room.users = room.users.filter(value => {
			return Number(userId) !== value;
		});
	}

	addText(roomId, userId, text) {
		const room = this.getRoom(roomId);
		if (!room) {
			throw Error("Room not found");
		}

		if (!this.users.exists(userId)) {
			throw Error("User not found");
		}

		room.text.push({
			text: text,
			userId: userId
		});
	}

	getRooms() {
		return this.rooms.map(value => {
			return { name: value.name, id: value.id };
		});
	}

	getRoom(id) {
		return this.rooms.find(value => {
			return value.id === Number(id);
		});
	}
}
const users = new Users();
const rooms = new Rooms(users);


// Add a single user
const roomId = rooms.add("Chillin around")
const userId = users.add("Lumigo")
rooms.addUser(roomId, userId)
rooms.addText(roomId, userId, "whasup!!")

app.post("/users", (req, res, next) => {
	console.info(`User joined ${inspect(req.body)}`);
	const userId = users.add(req.body.name);
	res.json({
		userId: userId
	});
});

app.get("/users", (req, res, next) => {
	res.json(users.users);
});

app.get("/rooms", (req, res, next) => {
	res.json(rooms.getRooms());
});

app.post("/rooms", (req, res, next) => {
	console.info(`Adding a room ${inspect(req.body)}`);
	const roomtId = rooms.add(req.body.name);
	res.json({
		roomId: roomtId
	});
});

app.get("/rooms/:roomId", (req, res, next) => {
	const room = rooms.getRoom(req.params.roomId);
	if (!room) {
		res.status(404).send("Not found");
		return;
	}

	res.json({
		usersCount: room.users.length,
		textCount: room.text.length,
		name: room.name
	});
});

app.get("/rooms/:roomId/users", (req, res, next) => {
	const room = rooms.getRoom(req.params.roomId);
	if (!room) {
		res.status(404).send("Not found");
		return;
	}

	res.json({
		users: room.users
	});
});

app.post("/rooms/:roomId/users", (req, res, next) => {
	try {
		console.info(`Adding a user ${inspect(req.body)}`);
		rooms.addUser(req.params.roomId, req.body.userId);
		res.status(200).send("SUCCESS");
	} catch (e) {
		res.status(404).send(e.message);
	}
});

app.delete("/rooms/:roomId/users/:userId", (req, res, next) => {
	try {
		console.info(`Deleting a user ${req.params.userId}`);
		rooms.deleteUser(req.params.roomId, req.params.userId);
		res.status(200).send("SUCCESS");
	} catch (e) {
		res.status(404).send(e.message);
	}
});

app.get("/rooms/:roomId/text", (req, res, next) => {
	const room = rooms.getRoom(req.params.roomId, res);
	if (room) {
		res.json({text: room.text});
	} else {
		res.status(404).send("Room not found");
	}
});

app.post("/rooms/:roomId/text", (req, res, next) => {
	try {
		console.info(`Adding a text ${inspect(req.body)}`);
		rooms.addText(req.params.roomId, req.body.userId, req.body.text);
		res.status(200).send(true);
	} catch (e) {
		res.status(404).send(e.message);
	}
});

app.listen(PORT, () => {
	console.log("Server running on port:", PORT);
});
