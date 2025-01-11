import { Hono } from "hono";

import users from "../models/users.js"; // files must import as .js

const app = new Hono();

app.get("/", (c) => {
  console.log("users geted", users);

  return c.json(users);
});

app.post("/", async (c) => {
  const { firstName, lastName } = await c.req.json();
  const newUser = { id: users.length + 1, name: `${firstName} ${lastName}` };
  users.push(newUser);

  console.log("new user added", users);

  return c.json(newUser);
});

app.get("/:id", (c) => {
  const id = c.req.param("id");
  const user = users.find((user) => user.id === Number(id));
  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  console.log("user geted", user);

  return c.json(user);
});

app.delete("/:id", (c) => {
  const id = c.req.param("id");
  const userIndex = users.findIndex((user) => user.id === Number(id));
  if (userIndex === -1) {
    return c.json({ message: "User not found" }, 404);
  }

  console.log("user deleted", users[userIndex]);

  users.splice(userIndex, 1);
  return c.json({ message: "User deleted" });
});

export default app;
