const express = require("express");
const app = express();

app.get("/callback", (req, _) => {
  console.log(req, "callback");
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}`);
});
