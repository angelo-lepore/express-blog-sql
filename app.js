// importiamo express
const express = require("express");
const app = express();
const port = 3010;

// middleware per gestire le richieste a rotte non esistenti (errore 404)
const notFound = require("./middlewares/notFound");

// middleware per la gestione centralizzata degli errori
const handleError = require("./middlewares/handleError");

// importiamo router
const posts_router = require("./routers/post");

// mettiamo il server in ascolto
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

// definiamo la prima rotta
app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

// registro il body-parser
app.use(express.json());

// configuriamo gli asset statici
app.use(express.static("public"));

// indichiamo con use che esistono nuove rotte
app.use("/posts", posts_router);

// registro le middleware
app.use(notFound);
app.use(handleError);
