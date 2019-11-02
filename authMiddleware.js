  
const jwt = require("jsonwebtoken");

const APP_SECRET = "myappsecret";
const USERNAME = "admin";
const PASSWORD = "secret";

module.exports = function (req, res, next) {

    if (/^(\/api)?\/login/.test(req.url) && req.method == "POST") {
        if (req.body != null && req.body.name == USERNAME 
                && req.body.password == PASSWORD) {
            let token = jwt.sign({ data: USERNAME, expiresIn: "1h" }, APP_SECRET);
            res.json({ success: true, token: token });
        } else {
            res.json({ success: false });
        }
        res.end();
        return;
    } else if (((/^(\/api)?\/products/.test(req.url) || /^(\/api)?\/categories/.test(req.url))  && req.method != "GET")
        || (/^(\/api)?\/orders/.test(req.url) && req.method != "POST")) {
        let token = req.headers["authorization"];
        if (token != null && token.startsWith("Bearer<")) {
            console.log(req.headers["authorization"])
            token = token.substring(7, token.length - 1);
            try {
                jwt.verify(token, APP_SECRET);
                next();
                return;
            } catch (err) { }
        }
        res.statusCode = 401;
        res.end();
        return;
    }
    next();
}