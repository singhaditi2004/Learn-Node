import { createServer } from "http";
const PORT = process.env.PORT;
const users = [
  { id: 1, name: "jhon" },
  { id: 2, name: "doe" },
  { id: 3, name: "jane" },
  { id: 4, name: "smith" },
];

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} `);
  next();
};

const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};

const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};
const getUserByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((user) => user.id == parseInt(id));
  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User not found" }));
  }
  res.end();
};
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route not found" }));
  res.end();
};

const createUserHandler = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const user = JSON.parse(body);
    users.push(user);
    res.statusCode = 201;
    res.write(JSON.stringify(user));
    res.end();
  });
};
const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/[0-9]+/) &&
        req.method === "GET"
      ) {
        getUserByIdHandler(req, res);
      } 
       else if(req.url==='/api/users' && req.method=="POST"){
        createUserHandler(req, res);
       }
      else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
