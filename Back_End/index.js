const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "Vishal@123",
    database: "NoteDataBase",
})

app.use(bodyParser.urlencoded({extended:true}));

app.post("/api/insert",(req, res)=>{

    const note_title = req.body.note_title;
    const note_content = req.body.note_content;

    const sqlInsert = "INSERT INTO note_data (note_title, note_content) VALUES (?,?)";
    db.query(sqlInsert,[note_title, note_content],(err, result)=>{
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    })    
})

app.get("/api/get",(req, res)=>{

    const sqlInsert = "SELECT * FROM note_data";

    db.query(sqlInsert,(err, result)=>{
        res.send(result);
    }) 
})

app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM note_data WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, () => {
    console.log("server is running on port 3001");
});