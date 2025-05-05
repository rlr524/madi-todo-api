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
// Middleware to handle cross-origin requests
app.use(cors());
// Middleware to pre-populate common headers with best practices for security
app.use(helmet());

app.get("/healthcheck", (req, res) => {
	res.send(`The API is healthy, running version ${version}`);
});

app.post(`/api/${version}/user`, handlers.createUser);
app.get(`/api/${version}/users`, handlers.fetchAllUsers);
app.get(`/api/${version}/user/:id`, handlers.fetchUser);
app.put(`/api/${version}/user`, handlers.updateUser);
app.delete(`/api/${version}/user`, handlers.deleteUser);
app.post(`/api/${version}/item`, handlers.createItem);
app.get(`/api/${version}/items`, handlers.fetchAllItems);
app.get(`/api/${version}/item/:id`, handlers.fetchItemById);
app.get(`/api/${version}/items/:userId`, handlers.fetchAllItemsByUser);
app.put(`/api/${version}/item`, handlers.updateItem);
app.delete(`/api/${version}/item`, handlers.deleteItem);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
