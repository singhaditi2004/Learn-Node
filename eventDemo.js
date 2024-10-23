import { EventEmitter } from "events";

const myEmitter = new EventEmitter();
function greetHandler() {
  console.log("Hello World");
}

function goodbyeHandler() {
  console.log("Goodbye World");
}
// Register event listeners
myEmitter.on("greet", greetHandler);
myEmitter.on("goodbye", goodbyeHandler);
myEmitter.emit("greet");
myEmitter.emit("goodbye");
