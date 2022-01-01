/*
---------------------------
File : server.js
Authors : Ryan Sauge
Date : 01/01/2022
Purpose : Server with ejs
--------------------------- */


import express from "express";
import logger from "morgan";
import ANIMES from "./anime.json"
/*
To create a map, not useful at the moment
let mapAnimes = ANIMES.reduce((map, person) => map.set(person.id, person), new Map())
 */

const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded());

let captchaValue;
app.get("/", (_, res) => {
    //Generate a captcha
    captchaValue = Math.random() * 100;
    res.render("anime", {
        captcha: captchaValue
    });
});


app.post("/anime", (req, res) => {
    let response = {
        animes: []
    }
    console.log("body", req.body.captcha);
    if (captchaValue == req.body.captcha) {
        /*
            Using mapAnimes does not work because it is not possible to access
            an element of a map with an index
         */
        response.animes.push(ANIMES[Math.floor(Math.random() * ANIMES.length)]);
        response.animes.push(ANIMES[Math.floor(Math.random() * ANIMES.length)]);
        console.log(response)

    }
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server listens on http://localhost:${port}`);
});
