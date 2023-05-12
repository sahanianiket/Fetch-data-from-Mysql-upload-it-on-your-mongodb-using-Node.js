var mysql=require('mysql');
const { MongoClient } = require('mongodb');


var pool = mysql.createConnection({
    host: "your host",
    user: "your user",
    password: "password",
    database: "your database name",
    connectionLimit:10
  });

  var fetchdata=[];

pool.connect(function(err) {
    if (err) throw err;
    //Select all customers and return the result object:
    pool.query("SELECT * FROM your_databasemname", function (err, result, fields) {
      if (err) throw err;
      fetchdata=result;
      console.log(fetchdata.length);
      main();
    });
  });

// mongodb part
// Connection URL

    const url =  'your mongodb url';
const client = new MongoClient(url);

// Database Name
const dbName = 'testing';


 async function  main() {
    
    // Use connect method to connect to the server
     await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    //db.createCollection("checking"); for creating collection in your mongodb
    
    const collection = db.collection('temp');
  
    const insertResult= await collection.insertMany(fetchdata);
console.log('Inserted documents =>', fetchdata.length);
    
  return 'done.';
  
  }

  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
    
      
    







   

  
