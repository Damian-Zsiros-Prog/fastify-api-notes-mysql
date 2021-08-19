const mysqlPromise = require("../config/database");

const notesModel = {
    notesList: async function () {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var res = [{}];

        try {
            res = await connection.execute(`SELECT * FROM notes`);
            connection.release();
        } catch (err) {
            console.error(err);
            connection.release();
            return false;
        }
        return res.length > 0 ? res[0] : null;
    },
    noteById: async function (params) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var res = [{}];

        try {
            res = await connection.execute(`SELECT * FROM notes WHERE id = ?`, [
                params.id,
            ]);
            connection.release();
        } catch (err) {
            console.error(err);
            connection.release();
            return false;
        }
        return res.length > 0 ? res : null;
    },
    noteAdd: async function (params) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var res = [{}];
        const { name, description, important } = params;
        try {
            res = await connection.execute(
                `INSERT INTO notes (name,description,important) VALUES(?,?,?)`,
                [name, description, important]
            );
            connection.release();
        } catch (err) {
            console.error(err);
            connection.release();
            return false;
        }
        return res;
    },
    noteUpdate: async function (params) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var res = [{}];
        const { idNote, name, description, important } = params;
        try {
            res = await connection.execute(
                `UPDATE notes SET name = ?,description = ? ,important = ? WHERE id = ?`,
                [name, description, important, idNote]
            );
            connection.release();
        } catch (err) {
            console.error(err);
            connection.release();
            return false;
        }
        return res;
    },
    notesDelete: async function (params) {
        const connection = await mysqlPromise.DATABASE.getConnection();
        var res = [{}];
        const { idNote } = params;
        console.log(idNote);
        try {
            res = await connection.execute(`DELETE FROM notes WHERE id = ?`, [
                idNote,
            ]);
            connection.release();
        } catch (err) {
            console.error(err);
            connection.release();
            return false;
        }
        return res;
    },
};

module.exports = notesModel;
