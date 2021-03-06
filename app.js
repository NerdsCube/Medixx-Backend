/* eslint-disable no-console */
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const http = require("http");
const server = http.createServer(app);
const stream = require("./socket/stream.js");
const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

require("dotenv").config();
const routes = require("./routes/routes");

// setup body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// allowing cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

(async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: false,
    };
    // connect you DB here
    await mongoose.connect("mongodb+srv://olashina:quadri201@medicx.n7bq5.mongodb.net/Medicx?retryWrites=true&w=majority", options);
    console.log("connected to DB");
  } catch (err) {
    console.log(err.toString());
  }
})();

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server Up",
  });
});

// Spin up dev server
const PORT = process.env.PORT || 8080;

// io.on("connection", (socket) => {
//   socket.emit("me", socket.id);

//   socket.on("disconnect", () => {
//     socket.broadcast.emit("callEnded");
//   })

//   socket.on("callUser", (data) => {
//     io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name});

//   })

//   socket.on("answerCall", (data) => io.to(data.to).emit("callAccepted"), data.signal )
// })

io.of( '/stream' ).on( 'connection', stream );

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
