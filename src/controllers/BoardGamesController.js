const connection = require('../config/connection');

function list(req, res) {
    if(connection) {
        let sql = "SELECT * FROM boardgames";

        connection.query(sql, (e, boardgame) => {
            if(e) {
                res.status(400).json(e);
            } else {
                res.json(boardgame);
            }
        })
    }
}

function getBoardGame(req, res) {
    if(connection){
        const {id} = req.params;

        let sql = `SELECT * FROM boardgames WHERE id = ${connection.escape(id)}`;

        connection.query(sql, (e, boardgame) => {
            if(e) {
                res.status(400).json(e);
            } else {
                let mensaje = "";
                if(boardgame === undefined || boardgame.length === 0)
                    mensaje="Boardgame no encontrado";
                res.json({result: boardgame[0], mensaje});
            }
        });
    }
}
function create(req, res) {
    if(connection){
        const boardgame = req.body;
        let sql = "INSERT INTO boardgames set ?";

        connection.query(sql, [boardgame], (e, data) => {
            if(e) {
                res.status(400).json(e);
            } else {
                res.json({error: false, result: data, mensaje: "¡Boardgame registrado con exito!"})
            }
        })
    }
}

function edit(req, res) {
    if(connection) {
        const { id } = req.params;
        const boardgame = req.body;

        let sql = "UPDATE boardgames set ? WHERE id = ?";

        connection.query(sql, [boardgame, id], (e, data) => {
            if(e) {
                res.status(400).json(e);
            } else {
                let mensaje = "";
                if(data.changedRows === 0)
                    mensaje ="La información es la misma";
                else
                    mensaje ="Boardgame actualizada con exito"
                res.json({error: false, result: data, mensaje});
            }
        });
    }
}

function dlete(req, res){
    if(connection) {
        const {id} = req.params;

        let sql = "DELETE FROM boardgames WHERE id = ?";
        connection.query(sql, [id], (e, data) => {
            if(e){
                res.status(400).json(e);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0)
                    mensaje = "Boardgame no encontrado";
                else
                    mensaje = "Boardgame eliminado con éxito";
                res.json({error: false, result: data, mensaje});
            }
        });

    }
}

module.exports = {
    list,
    getBoardGame,
    create,
    edit,
    dlete
}