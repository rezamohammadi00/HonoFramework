import { serve } from "@hono/node-server";
import { Hono } from "hono";
import userRoutes from "./routes/userRoutes.js"; // files must import as .js
const app = new Hono();
app.route("/users", userRoutes);
const port = Number(process.env.PORT) || 3000;
console.log(`Server is running on http://localhost:${port}`);
serve({
    fetch: app.fetch,
    port,
});
