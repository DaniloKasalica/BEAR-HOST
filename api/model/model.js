const sql = require("./db.js")

/*
    
      */

  const createtabletoken = `CREATE TABLE IF NOT EXISTS Token  (
      TOKEN varchar(255) 
    );`
  
    const createtablepacket = `CREATE TABLE IF NOT EXISTS Packets (
      PacketID int(11) NOT NULL auto_increment,
      PacketName varchar(255),
      UNIQUE INDEX (PacketName),
      PRIMARY KEY (PacketID)
    );`

    const createtablecomments = `CREATE TABLE IF NOT EXISTS Comments (
      CommentID int(11) NOT NULL auto_increment,
      Grade int(1),
      Comment Varchar(255) UNIQUE,
      Name Varchar(15),
      Job Varchar(20),
      PRIMARY KEY (CommentID)
    );`

    const createtablemarketing = `CREATE TABLE IF NOT EXISTS Marketing (
      MarketingID int(11) NOT NULL auto_increment,
      Title varchar(255) UNIQUE ,
      Description_1 varchar(255),
      Description_2 varchar(255),
      PacketID int(11),
      PRIMARY KEY (MarketingID),
      FOREIGN KEY (PacketID) REFERENCES Packets (PacketID)
    );`

    const createtableproducts = `CREATE TABLE IF NOT EXISTS Products  (
      ProductID int(11) NOT NULL auto_increment,
      ProductName varchar(255) NOT NULL UNIQUE,
      PacketID int(11) NOT NULL,
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
      FOREIGN KEY (PacketID) REFERENCES Packets (PacketID)
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

      const createtablecart = `CREATE TABLE IF NOT EXISTS Cart(
        CartID int(11) NOT NULL auto_increment,
        UserID int(11) Unique,
        OrderTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (CartID),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
      )`
    const createtableproductcart = `CREATE TABLE IF NOT EXISTS Cart_Products(
        CartProductID int(11) NOT NULL auto_increment,
        CartID int(11) NOT NULL,
        ProductID int(11)  NOT NULL,
        PricePacket int(1),
		    PRIMARY KEY (CartProductID),
        FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
        FOREIGN KEY (CartID) REFERENCES Cart(CartID)
      )`

/*
      const createvieworder = `CREATE VIEW Orders_View
      AS
      SELECT orders.OrderID,orders.UserID,OrderTime,ProductID,Pricepacket,email
      FROM Orders 
      JOIN order_products ON orders.OrderID = order_products.OrderID
      JOIN users ON orders.UserID = users.UserID
      `
      */
      sql.query(createtablepacket,(err,data)=>{
        if(err){
          console.log(err)
        }
      })
       sql.query(createtableuser, (err,data)=>{
        if(err)
        console.log(err)
      })
      sql.query(createtablemarketing, (err,data)=>{
      if(err)
      console.log(err)
    })
    
      sql.query(createtableproducts, (err,data)=>{
       if(err)
       console.log(err)
     })
    sql.query(createtableorder, (err,data)=>{
      if(err)
      console.log(err)
    })
    sql.query(createtableproductorder, (err,data)=>{
      if(err)
      console.log(err)
    })
   sql.query( createtabletoken , (err,data)=>{
    if(err)
    console.log(err)
  })
  sql.query( createtablecomments , (err,data)=>{
   if(err)
   console.log(err)
 })
 sql.query( createtablecart , (err,data)=>{
  if(err)
  console.log(err)
})
sql.query( createtableproductcart , (err,data)=>{
 if(err)
 console.log(err)
})

/*
sql.query(createvieworder,(err,data)=>{
  if(err){
    console.log(err)
  }
})
      const createvieworder = `CREATE VIEW Orders_View
      AS
      SELECT orders.OrderID,orders.UserID,OrderTime,ProductID,Pricepacket,email
      FROM Orders 
      JOIN order_products ON orders.OrderID = order_products.OrderID
      JOIN users ON orders.UserID = users.UserID
      `
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

/*
   sql.query(`
   INSERT INTO Packets (PacketName) VALUES ('Shared');
   INSERT INTO Packets (PacketName) VALUES ('VPS');
   INSERT INTO Packets (PacketName) VALUES ('Dedicated');
   INSERT INTO Packets (PacketName) VALUES ('Cloud')`,(err,data)=>{
     if(err)
     console.log(err)
   })
   sql.query(`
   INSERT INTO Comments (Grade, Comment,Name, Job) VALUES (4,'Asdf asdf asdsakd asdsa dask sadkkd asdkd sad ','Pear Johanson','Profesor');
   INSERT INTO Comments (Grade, Comment,Name, Job) VALUES (4,'Dsa dasd asd ads sad asd adsa ads ','Petar drugi','Biznismen');
   INSERT INTO Comments (Grade, Comment,Name, Job) VALUES (5,'Sdad sada sdas dsa dasd asda sdas dasd asd asd asd asd asdas ds','Mihailo Sumaher','Vodoinstalater')`,(err,data)=>{
     if(err)
     console.log(err)
   })
   sql.query(`
   INSERT INTO Marketing (Title, Description_1, Description_2, PacketID) VALUES ('Shared Hosting', 'Fully managed, enterprise cloud hosting with failover support, load balancing and email hosting, starting at just ', 'Fully managed, enterprise cloud hosting with failover support and load balancing, including clustered email hosting and advanced administration options.', '1');
   INSERT INTO Marketing (Title, Description_1, Description_2, PacketID) VALUES ('Dedicated Private Cloud', 'Enterprise cloud servers with fully dedicated resources and KVM virtualization, starting at just ', 'Enterprise cloud servers with fully dedicated resources and KVM virtualization for up to 32 virtual machines, including access to our deployment API for advanced automation tasks.', '3');
   INSERT INTO Marketing (Title, Description_1, Description_2, PacketID) VALUES ('Virtual Cloud Servers', 'High performance cloud servers on enterprise infrastructure with KVM virtualization and dynamic scaling, starting at just ', 'High performance cloud servers on enterprise infrastructure with KVM virtualization, full access to our deployment API for advanced developer and scaling operations.', '2');
   INSERT INTO Marketing (Title, Description_1, Description_2, PacketID) VALUES ('Montenegro Cloud Servers', 'Designed specially for Montenegro starting at just ', 'Designed specially for Montenegro, fully managed and provides high performance.', '4');`)

   sql.query(`
   INSERT INTO Products (ProductName, PacketID, Price_1, Description_price, Description_1, Value_1, Description_2, Value_2, Description_3, Value_3) VALUES ('VPS-20', '2', 20, 'month', 'dsadsa', '2', ' sadd sa', '2', ' dasd ', '3');
   INSERT INTO Products (ProductName, PacketID, Price_1, Description_price, Description_1, Value_1, Description_2, Value_2, Description_3, Value_3) VALUES ('VPS-40', '2', 50, 'month', 'dsa sad a', '3', ' sad dsa', '3', ' dsa ', '23');
   INSERT INTO Products (ProductName, PacketID, Price_1,  Description_price, Description_1, Value_1, Description_2, Value_2) VALUES ('VPS-60', '2', 80, 'month', 'd sad', '312', '  sadsadsad asd', '44');
   INSERT INTO Products (ProductName, PacketID, Price_1, Price_2, Price_3,Description_price, Description_1, Value_1, Description_2, Value_2) VALUES ('Businss', '1', 100, 80, 60, 'year', ' dsa ', '22', ' dsasa', '3');
   INSERT INTO Products (ProductName, PacketID, Price_1, Price_2, Price_3, Description_price, Description_1, Value_1, Description_2, Value_2) VALUES ('Business Plus', '1', 400, 300, 250, 'year', 'dsad', '1', ' dsa ', '2');
   INSERT INTO Products (ProductName, PacketID, Price_1, Price_2, Price_3, Description_price, Description_1, Value_1, Description_2, Value_2) VALUES ('Basi', '1',80, 70, 40, 'year', 'dsadas', '3', 'asdsad sad ', '3');
   INSERT INTO Products (ProductName, PacketID, Price_1, Price_2, Price_3,Description_price, Description_1, Value_1, Description_2, Value_2) VALUES ('Busess', '3', 50, 80, 60, 'year', ' dsa ', '22', ' dsasa', '3');
   INSERT INTO Products (ProductName, PacketID, Price_1, Price_2, Price_3, Description_price, Description_1, Value_1, Description_2, Value_2) VALUES ('Bussiness Plus', '3', 500, 300, 250, 'year', 'dsad', '1', ' dsa ', '2');
   INSERT INTO Products (ProductName, PacketID, Price_1, Price_2, Price_3, Description_price, Description_1, Value_1, Description_2, Value_2) VALUES ('Basssic', '3',80, 70, 40, 'year', 'dsadas', '3', 'asdsad sad ', '3');
   
   INSERT INTO Products (ProductName, PacketID, Price_1, Price_2, Price_3,Description_price, Description_1, Value_1, Description_2, Value_2) VALUES ('Businesds', '4', 50, 80, 60, 'year', ' dsa ', '22', ' dsasa', '3');
   INSERT INTO Products (ProductName, PacketID, Price_1, Price_2, Price_3, Description_price, Description_1, Value_1, Description_2, Value_2) VALUES ('Busineass Plus', '4', 500, 300, 250, 'year', 'dsad', '1', ' dsa ', '2');
   INSERT INTO Products (ProductName, PacketID, Price_1, Price_2, Price_3, Description_price, Description_1, Value_1, Description_2, Value_2) VALUES ('Basiddc', '4',80, 70, 40, 'year', 'dsadas', '3', 'asdsad sad ', '3');`)
  
  
    */



module.exports = Module;