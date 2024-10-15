import dotenv from "dotenv";
import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
console.log(__filename);

const PORT = process.env.PORT || 3000; // default to 3000 if PORT is not set

const server = http.createServer(async (req, res) => {
  try {
    let filepath;
    if (req.method === "GET") {
      if (req.url === "/") {
        console.log(req.url);
        console.log(req.method);
        filepath = path.join(__dirname, "public", "index.html");
      } else if (req.url === "/about") {
        console.log(req.url);
        console.log(req.method);
        filepath = path.join(__dirname, "public", "about.html");
      } else {
        throw new Error("Not found");
      }

      const data = await fs.readFile(filepath);
      const ext = path.extname(filepath);

      // Set the content type based on the file extension
      let contentType = "text/html";
      if (ext === ".ico") contentType = "image/x-icon";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    console.error(error.message);
    if (error.message === "Not found") {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
    } else {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server error");
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
