var mysql=require('mysql');
const { MongoClient } = require('mongodb');


var pool = mysql.createConnection({
    host: "185.15.210.108",
    user: "user_crm",
    password: "dM>2;iQvCUbO}ir@",
    database: "tend_tenders",
    connectionLimit:10
  });

  var fetchdata=[];

pool.connect(function(err) {
    if (err) throw err;
    //Select all customers and return the result object:
    pool.query("SELECT * FROM tbl_tenders_client_archive limit 1500000,1000000", function (err, result, fields) { //SELECT * FROM `tbl_tenders_client_archive` limit 100000
      if (err) throw err;
      fetchdata=result;
      console.log(fetchdata.length);
      main();
    });
  });
// mongodb part
// Connection URL

    const url =  'mongodb://admin:YMHddp03558@node135103-env-1628475.nl.realcloud.in/?authMechanism=DEFAULT';
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
  
  //   const findResult = await collection.findOne({});
  // console.log('Found documents =>', findResult);
  
  
//   var data=[fetchdata];
//   console.log(data.length);

  //  for(let i=0;i<fetchdata.length;i++){
    // console.log("going to insert =>"+fetchdata[i]);
    // // console.log(fetchdata.length);
     

    const insertResult= await collection.insertMany(fetchdata);
console.log('Inserted documents =>', fetchdata.length);
    
    
    
    // console.log('Insert documents =>', insertResult);
    // console.log(i);
  //  } 
  return 'done.';
  
  }
  // client.context.callbackWaitsForEmptyEventLoop = false;
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
    
      
    







   

  