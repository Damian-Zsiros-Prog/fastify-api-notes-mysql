let notesController = require("../controllers/notes.controller");

async function routes(fastify, options) {
    fastify.get("/", function (request, reply) {
        reply.redirect("/notes");
    });
    fastify.get("/notes", notesController.getNotesList);
    fastify.get("/notes/:id", notesController.getNoteById);
    fastify.post("/notes/add", notesController.addNote);
    fastify.put("/notes/update/:idNote", notesController.editNote);
    fastify.delete("/notes/delete/:idNote", notesController.deleteNote);
}

module.exports = routes;
