require("dotenv").config();
const express = require("express");
const cors = require("cors")
const morgan = require("morgan");
const db = require('./db')
const app = express();

app.use(cors());
app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try{
        const results = await db.query("select * from restaurants");
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows,
            },
        });
    } catch(err){
        console.log(err)

    }
});

//get an individual restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const results = await db.query(
            "select * from restaurants where id = $1", [req.params.id]
        );
        console.log(results.rows[0]);
        console.log(req.body);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        })
    } catch(err){
        console.log(err)
    }

})

//delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = db.query("DELETE FROM restaurants where id = $1", [req.params.id])
        res.status(204).json({
            status: "delete successful"
        })
    } catch(err){
        console.log(err)
    }
    console.log("deleted")
});

// update an individual restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params);
    try{
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [
            req.body.name, req.body.location, req.body.price_range, req.params.id
        ]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        })
    } catch(err){

    }
});

//create restaurant
app.post("/api/v1/restaurants", async(req, res) => {
    console.log(req.body);
    try{
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
            [req.body.name, req.body.location, req.body.price_range]
        );
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch(err){
        console.log(err)
    }
});

const port = process.env.PORT || 3006;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});