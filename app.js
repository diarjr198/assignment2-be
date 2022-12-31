const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routers/routes");
const connectDB = require("./configs/connectionDB");
const user = require("./controllers/user.controller");
const port = 8080;

connectDB();

const timerDurationSeconds = 5;
let timerStart = new Date().getTime();

setInterval(async () => {
    await user.market();
    timerStart = new Date().getTime();
}, timerDurationSeconds * 1000);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send("Welcome to my app");
})

app.use('/api', routes)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`app running on http://localhost:${port}`);
})