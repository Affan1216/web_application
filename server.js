var express = require("express");
var app = express();

app.use(express.json())

var db = require('./database-connections')
app.use(express.static("./js"))

app.listen(8080, "127.0.0.1")
console.log("Web server running")

//POST
app.route('/product').post(function(req,res){
    var sql = 'INSERT INTO product (name, description, price, category_id, picture) VALUES(?,?,?,?,?) '

    var parameter = [req.body.name, req.body.description, req.body.price, req.body.category, req.body.imagepath]

    db.query(sql, parameter, function(error,result){
        if(error){
            throw error;
        }else{
            res.json(result)
        }
    });
});

//GET
app.route('/product').get(function(req, res){
    //var sql = "SELECT * FROM product "
    var sql = "SELECT product.*, category.name AS category_name FROM product INNER JOIN category ON product.category_id = category.id";

    var parameter = [req.body.name, req.body.description, req.body.price, req.body.category, req.body.imagepath, req.body.category_name]

    db.query(sql, function(error,result){
        if(error){
            throw error;
        }else{
            res.json(result)
        }
    });
})
//UPDATE
app.route('/product/:id').put(function(req, res){
    var sql = "UPDATE product SET name = ? , description = ? , price = ? , category_id = ? , picture = ? where id = ?"

    var parameter = [req.body.name, req.body.description, req.body.price, req.body.category, req.body.image_path, req.params.id]

    db.query(sql,parameter, function(error,result){
        if(error){
            throw error;
        }else{
            res.json(result)
        }
        });
});

app.route('/product/:id').get(function(req, res){
    var sql = "SELECT * FROM product where id = ?"

    var parameter = [req.params.id]

    db.query(sql,parameter, function(error,result){
        if(error){
            throw error;
        }else{
            res.json(result)
        }
    });
});

app.route('/product/:id').delete(function(req, res){
    var sql = "DELETE FROM product where id=?"

    var parameter = [req.params.id]

    db.query(sql,parameter, function(error,result){
        if(error){
            throw error;
        }else{
            res.json(result)
        }
})
});