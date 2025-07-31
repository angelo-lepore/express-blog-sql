// importiamo il modulo mysql2
const mysql = require("mysql2");

// creo un oggetto contenente le credenziali per connettersi al database MySQL
const credetials = {
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password,
  database: process.env.db_name,
};

// creo una connessione al database
const connection = mysql.createConnection(credetials);

// tento di stabilire la connessione al database
connection.connect((err) => {
  if (err) {
    // se c'è un errore durante la connessione, lancia un'eccezione e interrompe l'esecuzione
    throw err;
  }
  // se la connessione ha successo, stampa un messaggio nella console
  console.info("✅ Connection successfull");
});

// Esporta il modulo "connection"
module.exports = connection;
