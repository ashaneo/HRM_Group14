module.exports = (app) => {
    const authentication = require("../controllers/authenticationController");
    
    var router = require("express").Router();
    
    // user signup
    router.post("/login", authentication.login);
    
    app.use("/auth", router);
    
    };    