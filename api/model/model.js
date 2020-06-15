const sql = require("./db.js")

/*
    
      */

  const createtabletoken = `CREATE TABLE IF NOT EXISTS Token  (
      TOKEN varchar(255) 
    );`
  
    const createtablemarketing = `CREATE TABLE IF NOT EXISTS Marketing (
      Name varchar(255),
      Firstcol varchar(255),
      Secondcol varchar(255),
      Thirdcol varchar(255),
      PRIMARY KEY (Name)
    );`

    const createtableproducts = `CREATE TABLE IF NOT EXISTS Products  (
      ProductID int(11) NOT NULL auto_increment,
      ProductName varchar(255),
      ParentName varchar(255),
      Price_1 int(4),
      Price_2 int(4),
      Price_3 int(4),
      Description_price varchar(255),
      Description_1 varchar(255),
      Value_1 varchar(255),
      Description_2 varchar(255),
      Value_2 varchar(255),
      Description_3 varchar(255),
      Value_3 varchar(255),
      Description_4 varchar(255),
      Value_4 varchar(255),
      Description_5 varchar(255),
      Value_5 varchar(255),
      PRIMARY KEY (ProductID,ProductName),
      FOREIGN KEY (ParentName) REFERENCES Marketing (Name)
    );`

    const createtableuser = `CREATE TABLE IF NOT EXISTS Users  (
       PersonID int(11) NOT NULL auto_increment,
       Username varchar(255) NOT NULL,
       LastName varchar(255),
       IsActive BOOLEAN,
       FirstName varchar(255),
       Email varchar(255),
       Password varchar(255),
       Role BOOLEAN DEFAULT false,
       PRIMARY KEY (PersonID,Username) 
       )`
       
       createtabletoken 
       sql.query(createtableuser, (err,data)=>{
        if(err)
        console.log(err)
        console.log(data)
      })
      sql.query(createtableproducts, (err,data)=>{
       if(err)
       console.log(err)
       console.log(data)
     })
      sql.query(createtablemarketing, (err,data)=>{
      if(err)
      console.log(err)
      console.log(data)
    })
      sql.query(createtableuser, (err,data)=>{
     if(err)
     console.log(err)
     console.log(data)
   })
   sql.query( createtabletoken , (err,data)=>{
    if(err)
    console.log(err)
    console.log(data)
  })
 
  
   
    
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