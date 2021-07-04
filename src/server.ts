import app from "./app";
require("dotenv").config();

app.listen(process.env.API_PORT, () =>
  console.log(`Server listening on port: ${process.env.API_PORT}`)
);
