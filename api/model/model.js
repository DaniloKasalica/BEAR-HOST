const sql = require("./db.js")

/*
  const createtabletoken = `CREATE TABLE IF NOT EXISTS Token  (
      TOKEN varchar(255) 
    );`
  );`
  const createtableproducts = `CREATE TABLE IF NOT EXISTS Products  (
      ProductID int(11) NOT NULL auto_increment,
      Firstcol varchar(255)  ,
      Secondcol varchar(255),
      Thirdcol varchar(255),
      Fourthcol varchar(255),
      PRIMARY KEY (ProductID)
    );`
    
  const createtableproducts = `CREATE TABLE IF NOT EXISTS Products  (
    ProductID int(11) NOT NULL auto_increment,
    Firstcol varchar(255)  ,
    Secondcol varchar(255),
    Thirdcol varchar(255),
    Fourthcol varchar(255),
    PRIMARY KEY (ProductID)
  );`
  
 const createtableuser = `CREATE TABLE IF NOT EXISTS Users  (
    PersonID int(11) NOT NULL auto_increment,
    Username varchar(255) NOT NULL,
    LastName varchar(255),
    IsActive BOOLEAN,
    FirstName varchar(255),
    Email varchar(255),
    Password varchar(255),
    PRIMARY KEY (Username,PersonID) )`
  sql.query(createtableuser, (err,data)=>{
    if(err)
    console.log(err)
    console.log(data)
  })

     */

  const  Module = {}
  Module.query = ( query,args ) => {
      return new Promise( ( resolve, reject ) => {
          sql.query( query, args, ( err, rows ) => {
              if ( err )
                return  reject( err );
                resolve(rows)
          });
      });
  }
  Module.close =  () => {
      return new Promise( ( resolve, reject ) => {
          sql.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }

module.exports = Module;