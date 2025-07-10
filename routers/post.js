// importiamo express
const express = require("express");
const router = express.Router();

// importiamo le funzioni del controller
const postController = require("../controllers/postController");

/* rotte CRUD */

/* index (read) */
// router per ottenere tutti i post, con possibilità di filtro tramite query string
router.get("/", postController.index);

/* show (read) */
// route per ottenere un post specifico tramite ID
router.get("/:id", postController.show);

/* store */
// route per creare un nuovo post
router.post("/", postController.store);

/* update */
// route per modificare un post esistente in modo integrale
router.put("/:id", postController.update);

/* modify */
// route per modificare un post esistente in modo parziale
router.patch("/:id", postController.modify);

/* destroy */
// route per cancellare un post esistente
router.delete("/:id", postController.destroy);

// esportiamo router
module.exports = router;
