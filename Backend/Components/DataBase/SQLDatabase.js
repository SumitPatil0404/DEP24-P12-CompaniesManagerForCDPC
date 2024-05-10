const { Pool } = require('pg');

const DB = {
  isConnected: false,

  async connect() {

    const connectionString = "postgres://default:7k6HNruQtWEK@ep-old-haze-a4mx703b.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
       const pool = new Pool({
      connectionString: connectionString,
      ssl: {
        rejectUnauthorized: false // Use this only for local development. For production, provide proper SSL configurations.
      }
    });
    try {
      this.client = await pool.connect();
      this.isConnected = true
      console.log('Connected to the database!');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw error;
    }
  },

  async disconnect() {
    try {
      await this.client.release();
      console.log('Disconnected from the database!');
    } catch (error) {
      console.error('Error disconnecting from the database:', error);
      throw error;
    }
  },

  async runQuery(query) {
    try {
      if (!this.isConnected) {
        await this.connect(); // Establish the connection if not already connected
      }

      const result = await this.client.query(query);
      return { result: result.rows, error: null };
    } catch (error) {
      console.error('Error running query:', error);
      return { result: null, error: error };
    }
  }
};

async function main() {


  let createUserTableQuery = `CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    name VARCHAR(255),
    position VARCHAR(255),
    department VARCHAR(255),
    phone VARCHAR(15),
    cycle_id INT REFERENCES placement_cycle(cycle_id)
);`

// let createSuperUserTableQuery = `CREATE TABLE superusers (
//   email VARCHAR(255) PRIMARY KEY,
//   name VARCHAR(255),
//   position VARCHAR(255),
//   department VARCHAR(255),
//   phone VARCHAR(15)
// );`
let createPlacementCycle = `CREATE TABLE placement_cycle (
  cycle_id SERIAL PRIMARY KEY,
  cycle Int
 
);`

let createCompaniesTableQuery = `CREATE TABLE companies (
  company_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  details TEXT,
  company_details TEXT,
  updates TEXT,
  status VARCHAR(100) DEFAULT 'Pending',
  assigned BOOLEAN DEFAULT FALSE,
  jaf TEXT,
  inf TEXT,
  user_id INT REFERENCES users(user_id),
  cycle_id INT REFERENCES placement_cycle(cycle_id)
);
`

let insertadmin =`insert into users( email,
  name,
  position,
  department,
  phone,
  cycle_id) values('2021csb1135@iitrpr.ac.in','Sumit Patil','HPC','ALL','9637857375',1)`


//   let messageTableQuery = `CREATE TABLE messages (
//     message_id SERIAL PRIMARY KEY,
//     sender_id INT,
//     receiver_id INT,
//     message_text TEXT,
//     sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (sender_id) REFERENCES users(user_id),
//     FOREIGN KEY (receiver_id) REFERENCES users(user_id)
// );
// `


  let messageTableQuery = `CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INT,
    receiver_id INT,
    message_text TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

let createNotificationTableQuery = `CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  sender_email VARCHAR(255) NOT NULL,
  receiver_email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  seen BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

let updates=
`
CREATE TABLE updates (
  id SERIAL PRIMARY KEY,
  text TEXT,
  company_id INT,
  user_id INT,
  cycle_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (cycle_id) REFERENCES placement_cycle(cycle_id),
  FOREIGN KEY (company_id) REFERENCES companies(company_id)
);

`










  

  // let result = await DB.runQuery(createUserTableQuery);
  // let result1 = await DB.runQuery(createSuperUserTableQuery);
  // let result2 = await DB.runQuery(createCompaniesTableQuery);
  // let result3 = await DB.runQuery(createNotificationTableQuery);

  // console.log(result);
  // console.log(result1);
  // console.log(result2);
  // console.log(result3);
  let result4 = await DB.runQuery(query); 
  console.log(result4);

}


DB.connect();
// main();

module.exports = DB;
