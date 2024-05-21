const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const routeRoute = require('./routes/root');
const employeeRoute = require("./routes/api/employee");
const corsOptions = require("./config/corsOption");
const cookieParser = require("cookie-parser");
const verifyJwt = require('./middleware/verifyJWT');

const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));


app.use("/", routeRoute);
app.use('/register', require('./routes/api/register'));
app.use('/auth', require('./routes/api/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/api/logout'));

app.use(verifyJwt)
app.use("/employee", employeeRoute);



app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));