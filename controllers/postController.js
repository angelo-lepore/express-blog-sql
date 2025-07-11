// importiamo l'array posts
const posts = require("../data/posts");

// importiamo il modulo "connection"
const connection = require("../db/connection");

/* rotte CRUD */

/* index (read all) */
function index(req, res) {
  // definiamo una query SQL che seleziona tutta la tabella "posts"
  const sql = "SELECT * FROM posts";
  // eseguiamo la query usando la connessione al database
  connection.query(sql, (err, results) => {
    // se c'è un errore durante l'esecuzione della query, restituiamo un errore 500 al client
    if (err) return res.status(500).json({ error: "Database query failed" });
    // se non ci sono errori, restituiamo i risultati della query in formato JSON
    res.json(results);
  });
}

/* show (read) */
function show(req, res) {
  // estrae l'ID dalla URL e lo converte da stringa a numero
  const id = parseInt(req.params.id);
  // definiamo la query SQL per selezionare un elemento dalla tabella "posts" con l'ID specificato
  const sql = "SELECT * FROM posts WHERE id = ? ;";
  // esegue la query sul database, passando l'ID come parametro
  connection.query(sql, [id], (err, results) => {
    // se si verifica un errore durante la connessione o l'esecuzione della query
    if (err) return res.status(500).json({ error: "Database query failed" });
    // se non viene trovato alcun risultato (l'ID non esiste nella tabella "posts"),
    if (results.length === 0)
      return res.status(404).json({ error: "Post not found" });
    // se l'elemento è stato trovato, lo restituisce come risposta JSON
    return res.json(results[0]);
  });
}

/* store (create) */
function store(req, res) {
  // estraiamo i dati (title, content, image) dal corpo della richiesta HTTP
  const { title, content, image } = req.body;
  // definiamo la query SQL per inserire un elemento dalla tabella "posts"
  const sql = "INSERT INTO posts (title, content, image) VALUES (?, ?, ?)";
  // esegue la query passando i valori ricevuti come parametri
  connection.query(sql, [title, content, image], (err, results) => {
    // se c'è un errore durante l'inserimento nel database
    if (err) return res.status(500).json({ error: "Failed to insert post" });
    // se l'inserimento ha successo, restituisce lo status 201 (Created)
    res.status(201);
    // e un oggetto JSON contenente l'ID del nuovo post creato
    res.json({ id: results.insertId });
  });
}

/* update (edit) */
function update(req, res) {
  // estraiamo l'ID del post dalla URL
  const { id } = req.params;
  // estraiamo i nuovi valori dal corpo della richiesta
  const { title, content, image } = req.body;
  // definiamo la query SQL per aggiornare un post esistente
  const sql = "UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?";
  // esegue la query, passando i nuovi valori e l'ID
  connection.query(sql, [title, content, image, id], (err, results) => {
    // se si verifica un errore durante la query
    if (err) return res.status(500).json({ error: "Failed to update post" });
    // se nessuna riga è stata modificata, il post con quell'ID non esiste
    if (results.affectedRows === 0) {
      // quindi restituisce un errore
      return res.status(404).json({ error: "Post not found" });
    }
    // altrimenti conferma l'aggiornamento
    res.json({ message: "Post update successfully" });
  });
}

/* modify (partial edit) */
function modify(req, res) {
  // estraiamo l'ID del post dalla URL
  const { id } = req.params;
  // estraiamo i nuovi valori dal corpo della richiesta
  const { title } = req.body;
  // definiamo la query SQL per aggiornare un post esistente
  const sql = "UPDATE posts SET title = ? WHERE id = ?";
  // esegue la query, passando i nuovi valori e l'ID
  connection.query(sql, [title, id], (err, results) => {
    // se si verifica un errore durante la query
    if (err) return res.status(500).json({ error: "Failed to modify post" });
    // se nessuna riga è stata modificata, il post con quell'ID non esiste
    if (results.affectedRows === 0) {
      // quindi restituisce un errore
      return res.status(404).json({ error: "Post not found" });
    }
    // altrimenti conferma l'aggiornamento
    res.json({ message: "Post title updated successfully" });
  });
}

/* destroy (delete) */
function destroy(req, res) {
  // estrae l'ID dalla URL e lo converte da stringa a numero
  const id = parseInt(req.params.id);
  // definiamo la query SQL per eliminare l'elemento dalla tabella "posts" con l'ID specificato
  const sql = "DELETE FROM posts WHERE id = ? ;";
  // esegue la query sul database, passando l'ID come parametro
  connection.query(sql, [id], (err, results) => {
    // gestisce eventuali errori durante l'esecuzione della query
    if (err) return res.status(500).json({ error: "Failed to delete pizza" });
    // verifichiamo se è stato effettivamente eliminato un elemento dalla tabella
    if (results.affectedRows === 0) {
      // se nessuna riga è stata eliminata, l'ID non esiste nel database e ci restituisce questo errore
      return res.status(404).json({ error: "Post not found" });
    }
    // se l'eliminazione è avvenuta con successo, restituisce una conferma
    return res.json({ message: "Post deleted successfully" });
  });
}

// esportiamo tutto
module.exports = { index, show, store, update, modify, destroy };
