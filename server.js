import dotenv from 'dotenv';
import http from 'http';

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 3000; // default to 3000 if PORT is not set

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(res.method);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello world</h1>');
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
