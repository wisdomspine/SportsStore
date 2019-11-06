const express =require( "express");
const https =require( "https");
const fs =require( "fs");
const history =require( "connect-history-api-fallback");
const jsonServer =require( "json-server");
const bodyParser =require( "body-parser");
const auth =require( "./authMiddleware");
const process =require( "process");

const router= jsonServer.router("data.json");

const enableHttps= false;
const sslOptions = {};
if(enableHttps){
    sslOptions.cert= fs.readFileSync("./ssl/sportsstore.crt");
    sslOptions.key= fs.readFileSync("./ssl/sportsstore.pem");
}

const app= express();
const PORT=process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(auth);
app.use("/api", router);
app.use(history());
app.use("/", express.static("./dist/SportStore"));

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

if(enableHttps){
    https.createServer(sslOptions, app).listen(443, ()=>console.log("HTTPS Server running on port 443"));
}else{
    console.log("HTTPS disabled");
}