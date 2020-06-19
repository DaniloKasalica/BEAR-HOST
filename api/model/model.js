const sql = require("./db.js")

/*
    
      */

  const createtabletoken = `CREATE TABLE IF NOT EXISTS Token  (
      TOKEN varchar(255) 
    );`
  
    const createtablemarketing = `CREATE TABLE IF NOT EXISTS Marketing (
      MarketingID int(11) NOT NULL auto_increment,
      Name varchar(255) ,
      Firstcol varchar(255),
      Secondcol varchar(255),
      Thirdcol varchar(255),
      UNIQUE INDEX (Name),
      PRIMARY KEY (MarketingID)
    );`

    const createtableproducts = `CREATE TABLE IF NOT EXISTS Products  (
      ProductID int(11) NOT NULL auto_increment,
      ProductName varchar(255) NOT NULL,
      MarketingID int(11) NOT NULL,
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
      PRIMARY KEY (ProductID),
      UNIQUE INDEX (ProductName),
      FOREIGN KEY (MarketingID) REFERENCES Marketing (MarketingID)
    );`

    const createtableuser = `CREATE TABLE IF NOT EXISTS Users  (
      UserID int(11) NOT NULL auto_increment,
      Username varchar(255) NOT NULL,
      LastName varchar(255),
      IsActive BOOLEAN,
      FirstName varchar(255),
      Email varchar(255) NOT NULL UNIQUE,
      Password varchar(255),
      Role BOOLEAN DEFAULT false,
      PRIMARY KEY (UserID),
      UNIQUE INDEX (Username) 
      )`
       const createtableorder = `CREATE TABLE IF NOT EXISTS Orders(
        OrderID int(11) NOT NULL auto_increment,
        UserID int(11),
        OrderTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (OrderID),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
      )`
      const createtableproductorder = `CREATE TABLE IF NOT EXISTS Order_Products(
        OrderProductID int(11) NOT NULL auto_increment,
        OrderID int(11) NOT NULL,
        ProductID int(11)  NOT NULL,
        PricePacket int(1) NOT NULL,
		    PRIMARY KEY (OrderProductID),
        FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
        FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
      )`//PricePacket- koje od 3 kolone za cijenu je izabrao 
      const createvieworder = `CREATE VIEW  Orders_View
      AS
      SELECT orders.OrderID,orders.UserID,OrderTime,ProductID,Pricepacket,email
      FROM Orders 
      JOIN order_products ON orders.OrderID = order_products.OrderID
      JOIN users ON orders.UserID = users.UserID
      `
       sql.query(createtableuser, (err,data)=>{
        if(err)
        console.log(err)
        console.log(data)
      })
      sql.query(createtablemarketing, (err,data)=>{
      if(err)
      console.log(err)
      console.log(data)
    })
    
      sql.query(createtableproducts, (err,data)=>{
       if(err)
       console.log(err)
       console.log(data)
     })
    sql.query(createtableorder, (err,data)=>{
      if(err)
      console.log(err)
      console.log(data)
    })
    sql.query(createtableproductorder, (err,data)=>{
      if(err)
      console.log(err)
      console.log(data)
    })
   sql.query( createtabletoken , (err,data)=>{
    if(err)
    console.log(err)
    console.log(data)
  })
 
  sql.query(createvieworder,(err,data)=>{
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