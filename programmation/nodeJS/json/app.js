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
let persons = JSON.parse(rawdata)
console.log(persons);
let mapPersons = persons.reduce((map, person) => map.set(person.id, person), new Map())
console.log(mapPersons)

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
        mapPersons = data.reduce((map, person) => map.set(person.id, person), new Map())
        console.log(mapPersons)
        return mapPersons;
    });

}
loadJson();
import PERSONS_LIST from "./anime.json"
console.log("****Read JSON with experimental import****")
mapPersons = PERSONS_LIST.reduce((map, person) => map.set(person.id, person), new Map())

console.log("**COnverto to map**")
console.log(mapPersons)
