import express from "express";
import https from "https";
import fs from "fs";
import history from "connect-history-api-fallback";
import jsonServer from "json-server";
import bodyParser from "body-parser";
import auth from "./authMiddleware";

const router= jsonServer.router("data.json");

const enableHttps= false;
const sslOptions = {};
if(enableHttps){
    sslOptions.cert= fs.readFileSync("./ssl/sportsstore.crt");
    sslOptions.key= fs.readFileSync("./ssl/sportsstore.pem");
}

const app= express();

app.use(bodyParser.json());
app.use(auth);
app.use("/api", router);
app.use(history());
app.use("/", express.static("./dist/SportsStore"));

app.listen(80, ()=> console.log("Server running on port 80"));

if(enableHttps){
    https.createServer(sslOptions, app).listen(443, ()=>console.log("HTTPS Server running on port 443"));
}else{
    console.log("HTTPS disabled");
}