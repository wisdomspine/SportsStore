import jsf from "json-schema-faker";
import schema from "./dataSchema.js";
import fs from "fs";
jsf.extend('faker', ()=>require("faker"));
const generatedData=jsf.generate(schema);
generatedData.orders=[];
const json= JSON.stringify(generatedData);
fs.writeFile("./data.json", json, e=>{
    if(e){
        //console.error(e);
    }
})
