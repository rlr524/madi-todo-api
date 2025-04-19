import express from "express";
import "dotenv/config";
import { handlers } from "./handlers.js";

const app = express();
const port = process.env.PORT;
const version = process.env.API_VERSION;

app.use(express.json());

app.get("/healthcheck", (req, res) => {
	res.send(`The API is healthy, running version ${version}`);
});

app.post(`/api/${version}/user`, handlers.createUser);
app.get(`/api/${version}/users`, handlers.fetchAllUsers);
app.get(`/api/${version}/user`, handlers.fetchUser);
app.put(`/api/${version}/user`, handlers.updateUser);
app.delete(`/api/${version}/user`, handlers.deleteUser);
app.post(`/api/${version}/item`, handlers.createItem);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
