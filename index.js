require("dotenv").config();

const session = require("express-session");
const flash = require("connect-flash");
const msal = require("@azure/msal-node");

var authRouter = require("./routes/auth");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use("/auth", authRouter);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// In-memory storage of logged-in users
// For demo purposes only, production apps should store
// this in a reliable storage
app.locals.users = {};

// MSAL config
const msalConfig = {
  auth: {
    clientId: process.env.OAUTH_APP_ID,
    authority: process.env.OAUTH_AUTHORITY,
    clientSecret: process.env.OAUTH_APP_SECRET,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

// Create msal application object
app.locals.msalClient = new msal.ConfidentialClientApplication(msalConfig);

const pg = require("pg");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const db = require("./queries");

app.get("/ChatRooms", db.getList);
app.get("/ChatRooms/:id", db.getOne);
app.post("/ChatRooms", db.create);
app.put("/ChatRooms:id", db.update);
app.delete("/ChatRooms/:id", db.deleteEvent);
app.post("/SendInvites/:id", db.SendInvites);

app.get("/users_emails", db.getListEmail);
app.get("/users_emails/:id", db.getOne);
app.post("/users_emails", db.createEmail);
app.put("/users_emails/:id", db.update);
app.delete("/users_emails/:id", db.deleteEmail);

const { sendEmail } = require("./mail");

app.post("/api/sendMail", (req, res) => {
  console.log(req.body);
  sendEmail(req.body.email, req.body.name, "hello");
});

/* 
  const { sendMail } = require('./mail');


app.post('/api/mail', (req, res) => {

  console.log(req.body)

  sendMail(req.body.title, req.body.body, req.body.timeAndDate, req.body.email, "hello")
})

 */
