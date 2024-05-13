const express = require('express');
const app = express();
const path = require("path");
const { logger } = require('./middleware/logEvent');
const cors = require("cors");


const PORT = process.env.PORT || 4500;

// custom middleware
app.use(logger);

const whiteList = [
    "https://your-site.com",
    "http://localhost:3000",
    "https://www.google.com",
]


const corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    
    optionSuccessStatus: 200
}

app.use(cors());


// built in middleware, to handle url encodad data in other word=> form data: 'contentype' application/x-www-form-urlencoded

app.use(express.urlencoded({extended: false}));


// to handle json responses
app.use(express.json());




//serving static files
app.use(express.static(path.join(__dirname, "public")));

app.get("^/$|/index(.html)?", (req, res) => {
    // res.sendFile("./views/new-page.html", {root: __dirname})  //This line is used to access the file inside folder
    res.sendFile(path.join(__dirname, "views", "index.html")) 
})
app.get("/new-page(.html)?", (req, res) => {
    // res.sendFile("./views/new-page.html", {root: __dirname})  //This line is used to access the file inside folder
    res.sendFile(path.join(__dirname, "views", "new-page.html")) 
})

app.get("/old-page(.html)?", (req, res) => {
    res.redirect(301, "new-page.html")
}) 


// ROUTE HANDLER => This is to access the page that we are not inside the file or folder for
                 //

app.get("/hello(.html)?", (req, res, next) => {
   console.log("You are trying to acees hello.html");
   next();
},
(req, res) => {
    res.send("Hello Zainab, Nafisat and Basirat!")
}
);


// routes handlers we want to chain together with the help of route handlers
//


const one = (req, res, next) => {
    console.log("one");
    next();
} 
const two = (req, res, next) => {
    console.log("two");
    next();
} 
const three = (req, res, next) => {
    console.log("three");
    res.send("finished!!");
} 


app.get("/chain(.html)?", [one, two, three]);


app.all("*", (req, res) => {
    res.status(400);
    if(req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));

    } else if(req.accepts("json")) {
        res.json({error: "404! Not Found"});

    } else {
        res.type("txt").send("404! Not Found")
    }
});



app.listen(PORT, () => console.log(`server running on port ${PORT}`));





