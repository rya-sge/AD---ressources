/*
---------------------------
File : app.js
Authors : Ryan Sauge
Date : 01/01/2022
Purpose : Read a Json file and display its content
Main sources :
https://stackabuse.com/reading-and-writing-json-files-with-node-js/
https://sebhastian.com/node-read-json-file/
--------------------------- */

const FILE_PATH = "./anime.json"
import fs from 'fs';
console.log("****Read JSON with fs & readFileSync****")

//synchronous way
let rawdata = fs.readFileSync(FILE_PATH);
let animes = JSON.parse(rawdata)
console.log(animes);
let mapAnimes = animes.reduce((map, anime) => map.set(anime.id, anime), new Map())
console.log(mapAnimes)

//non-blocking asynchronous way
async function loadJson() {
    return fs.readFile(FILE_PATH, "utf8", (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        // your JSON file content as object
        let data = JSON.parse(response);
        console.log("****Read JSON with fs & ReadFile****")
        mapAnimes = data.reduce((map, anime) => map.set(anime.id, anime), new Map())
        console.log(mapAnimes)
        return mapAnimes;
    });

}

//fs.readFile
loadJson();

//Experimental module
import ANIMES_LIST from "./anime.json"
console.log("****Read JSON with experimental import****")
mapAnimes = ANIMES_LIST.reduce((map, anime) => map.set(anime.id, anime), new Map())

console.log("**Converto to map**")
console.log(mapAnimes)
