const notesModel = require("../models/notes.model");

async function getNotesList(request, reply) {
    const notesData = await notesModel.notesList();
    if (notesData.length > 0) {
        return reply.status(200).send({ notes: notesData });
    } else {
        return reply.status(204).send({ message: "Not exists notes!" });
    }
}

async function getNoteById(request, reply) {
    const { id } = request.params;
    const noteData = await notesModel.noteById({ id });
    if (noteData.length > 0) {
        return reply.status(200).send({ note: noteData[0] });
    } else {
        return reply.status(500).send({ error: "Note Not found!" });
    }
}

async function addNote(request, reply) {
    const { name, description, important } = request.body;
    if (name && description && important) {
        const notesAddState = await notesModel.noteAdd(request.body);
        if (notesAddState) {
            return reply.status(200).send({
                message: "Note added correctly",
                noteAddedInfo: {
                    name,
                    description,
                    important,
                },
            });
        } else {
            return reply.status(200).send({
                message: "Note added incorrectly",
            });
        }
    } else {
        return reply.status(400).send({ error: "Missing content for request" });
    }
}

async function editNote(request, reply) {
    const { name, description, important } = request.body;
    const { idNote } = request.params;
    if (idNote) {
        if (name || description || important) {
            const noteUpdatedState = await notesModel.noteUpdate({
                ...request.body,
                ...request.params,
            });
            if (noteUpdatedState) {
                return reply.status(200).send({
                    message: "Note updated correctly",
                    noteUpdatedInfo: {
                        id: idNote,
                        name,
                        description,
                        important,
                    },
                });
            } else {
                return reply.status(200).send({
                    message: "Note updated incorrectly",
                });
            }
        } else {
            return reply
                .status(400)
                .send({ error: "There is no content of the note to edit" });
        }
    } else {
        return reply
            .status(400)
            .send({ error: "The id of the note to edit does not exist" });
    }
}

async function deleteNote(request, reply) {
    const { idNote } = request.params;
    const noteDeleteState = await notesModel.notesDelete({ idNote });
    if (noteDeleteState) {
        return reply.status(200).send({
            message: "Note deleted correctly",
            noteDeletedInfo: {
                idNote,
            },
        });
    } else {
        return reply.status(200).send({
            message: "Note deleted incorrectly",
        });
    }
}

module.exports = {
    getNotesList,
    getNoteById,
    addNote,
    editNote,
    deleteNote,
};
