import dotenv from "dotenv";
import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
dotenv.config(); // Load environment variables from .env file
//Get cureent path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
console.log(__filename);

const PORT = process.env.PORT || 3000; // default to 3000 if PORT is not set

const server = http.createServer((req, res) => {
  try {
    if (req.method == "GET") {
      if (req.url == "/") {
        console.log(req.url);
        console.log(req.method);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Home page</h1>");
      } else if (req.url == "/about") {
        console.log(req.url);
        console.log(req.method);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>About page</h1>");
      } else {
        console.log(req.url);
        console.log(req.method);
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>Page not found</h1>");
      }
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    console.error(error.message);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
