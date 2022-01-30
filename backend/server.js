import express from "express";

const app = express();

app.get("/api/productList", (request, response) => {
  response.send("Products");
});

app.get("/", (request, response) => {
  response.send("Server is Ready");
});

app.listen(5000, () => {
  console.log("Serve at http://localHost:5000");
});
