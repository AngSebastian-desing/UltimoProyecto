const connection = require('../config/connection');

function list(req, res) {
    if(connection) {
        let sql = "SELECT b.Name, b.Publisher, b.Category, b.Year, f.ID FROM boardgames as b INNER JOIN favorites as f on b.ID= f.IdBoardgame";
        connection.query(sql, (e, boardgame) => {
            if(e) {
                res.status(400).json(e);
            } else {
                res.json(boardgame);
            }
        })
    }
}

function create(req, res) {
    if(connection){
        const favorites = req.body
        let sql = "INSERT INTO favorites set ? ";
        connection.query(sql, [favorites], (e, data) => {
            if(e) {
                res.status(400).json(e);
            } else {
                res.json({error: false, result: data, mensaje: "Favorito registrado con exito!"})
            }
        })
    }
}

function dlete(req, res){
    if(connection) {
        const {id} = req.params;

        let sql = "DELETE FROM favorites WHERE id = ?";
        connection.query(sql, [id], (e, data) => {
            if(e){
                res.status(400).json(e);
            } else {
                let mensaje = "";
                if(data.affectedRows === 0)
                    mensaje = "Favorito no encontrado";
                else
                    mensaje = "Favorito eliminado con éxito";
                res.json({error: false, result: data, mensaje});
            }
        });

    }
}
module.exports = {
    list,
    create,
    dlete
}