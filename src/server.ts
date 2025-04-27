import express from "express";
import "dotenv/config";
import { handlers } from "./handlers.js";
import cors from "cors";
import helmet from "helmet";

const app = express();
const port = process.env.PORT;
const version = process.env.API_VERSION;

// Express middleware to parse request bodies (replaces body-parser package)
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/healthcheck", (req, res) => {
	res.send(`The API is healthy, running version ${version}`);
});

app.post(`/api/${version}/user`, handlers.createUser);
app.get(`/api/${version}/users`, handlers.fetchAllUsers);
app.get(`/api/${version}/user`, handlers.fetchUser);
app.put(`/api/${version}/user`, handlers.updateUser);
app.delete(`/api/${version}/user`, handlers.deleteUser);
app.post(`/api/${version}/item`, handlers.createItem);
app.get(`/api/${version}/items`, handlers.fetchAllItems);
app.get(`/api/${version}/item/:id`, handlers.fetchItem);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
