const Pool = require("pg").Pool;
const sendEmail = require("./mail").sendEmail;
const chatRoomUrl = "http://ec2-34-211-54-54.us-west-2.compute.amazonaws.com/";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: "openhuddle",
  password: process.env.DB_PASS,
  port: 5432,
});

const getList = (request, response) => {
  pool.query('SELECT * FROM "ChatRooms"', (error, results) => {
    if (error) {
      throw error;
    }
    results.rows.map((room) => {
      room.link = `${chatRoomUrl}/${room.id}`;
    });
    console.log(results.rows);
    response.setHeader("Content-Range", ": posts 0-24/319");
    response.status(200).json(results.rows);
  });
};

const getListEmail = (request, response) => {
  pool.query("SELECT * FROM user_emails", (error, results) => {
    if (error) {
      throw error;
    }
    response.setHeader("Content-Range", ": posts 0-24/319");
    response.status(200).json(results.rows);
  });
};

const SendInvites = (request, response) => {
  pool.query("SELECT * FROM user_emails", (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
    for (let index = 0; index < results.rows.length; index++) {
      sendEmail(
        results.rows[index].email_address,
        `${chatRoomUrl}/${request.params.id}`,
        "chatRoom"
      );
    }
    return response.status(200);
  });
};

const getOne = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'SELECT * FROM "ChatRooms" WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const create = (request, response) => {
  const { name, createdAt } = request.body;

  pool.query(
    'INSERT INTO "ChatRooms" (name, "createdAt") VALUES ($1,$2)',
    [name, createdAt],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Event added with ID: ${id}`);
    }
  );
};

const createEmail = (request, response) => {
  const { email_address } = request.body;

  pool.query(
    "INSERT INTO user_emails (email_address) VALUES ($1)",
    [email_address],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Event added with ID: ${result.insertId}`);
    }
  );
};

const update = (request, response) => {
  const id = parseInt(request.params.id);
  const { title, body, timeanddate } = request.body;

  pool.query(
    "UPDATE events SET name = $1, body = $2, invites = $3, timeanddate = $4  WHERE id = $5",
    [title, body, timeanddate, id],
    (error, results) => {
      if (error) {
        throw errorr;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteEvent = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'DELETE FROM "ChatRooms" WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

const deleteEmail = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "DELETE FROM user_emails WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getList,
  getOne,
  create,
  update,
  deleteEvent,
  getListEmail,
  createEmail,
  deleteEmail,
  SendInvites,
};
