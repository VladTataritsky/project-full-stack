const http = require('http');
const fs = require('fs');
const Sequelize = require("sequelize");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const sequelize = new Sequelize("orders", "sa", "123", {
  dialect: "mssql",
  host: "localhost",
  port: "1433"
});

const urlencodedParser = bodyParser.urlencoded({extended: false});




const ORDER = sequelize.define("order", {
    orderId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    customer: {type: Sequelize.STRING, allowNull: false},
    status: {type: Sequelize.STRING, allowNull: false},
    totalPrice: {type: Sequelize.STRING, allowNull: false},
    currency: {type: Sequelize.STRING, allowNull: false},
    shipToName: {type: Sequelize.STRING, allowNull: false},
    shipToAddress: {type: Sequelize.STRING, allowNull: false},
    ZIP: {type: Sequelize.STRING, allowNull: false},
    region: {type: Sequelize.STRING, allowNull: false},
    country: {type: Sequelize.STRING, allowNull: false},
    customerFirstName: {type: Sequelize.STRING, allowNull: false},
    customerLastName: {type: Sequelize.STRING, allowNull: false},
    customerAddress: {type: Sequelize.STRING, allowNull: false},
    customerPhone: {type: Sequelize.STRING, allowNull: false},
    customerEmail: {type: Sequelize.STRING, allowNull: false},
  }
)

const PRODUCT = sequelize.define("product", {
    productId: {
      type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    name: {type: Sequelize.STRING, primaryKey: true, allowNull: false},
    price: {type: Sequelize.STRING, allowNull: false},
    currency: {type: Sequelize.STRING, allowNull: false},
    quantity: {type: Sequelize.STRING, allowNull: false},
    totalPrice: {type: Sequelize.STRING, allowNull: false},
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: ORDER, key: 'orderId'}
    }
  }
)

sequelize.sync().then(result => {
  console.log('connection success');
})
  .catch(err => console.log(err));


/*PRODUCT.create({
  name: "milk",
  price: "5",
  currency: "BYN",
  quantity: "2",
  totalPrice: "10",
  orderId: 2
}).then(res => {
  console.log(res)
}).catch(err => console.log(err));*/

/*ORDER.create({
  customer: "Nick",
  status: "shipped",
  totalPrice: "3134",
  currency: "BYN",
  shipToName: "level222",
  shipToAddress: "nemiha 22",
  ZIP: "333432",
  region: "Mogilev",
  country: "Belarus",
  customerFirstName: "John",
  customerLastName: "Williams",
  customerAddress: "Paris",
  customerPhone: "+375334568721",
  customerEmail: "tataritskii@gmail.com",
}).then(res => {
  console.log(res)
}).catch(err => console.log(err));*/


/*
const server = http.createServer((req, res) => {
   if (req.method === "POST") {
    sequelize.sync().then(() => {
      let result = "";

      req.on("data", data => {
        result += data
      });
      req.on("end", () => {
        const url = req.url.split("/")[2];
        const recievedData = JSON.parse(result);
        tableNames[url].create(recievedData).then(res => {
          console.log(res);
        }).catch(err => console.log(err));
        res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
        res.end("Data has been added");
      });
    })
      .catch(err => {
        res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
        res.end('connection error:', err)
      })
  }

  else if (req.method === "PUT") {
    sequelize.sync().then(() => {
      let result = "";

      req.on("data", data => {
        result += data
      });
      req.on("end", () => {
        const url = req.url.split("/")[2];
        const recievedData = JSON.parse(result);
        console.log(recievedData)
        let keyObj = Object.keys(recievedData)[0]
        let keyVal = recievedData[tableNames[url]];
        console.log(recievedData.keyObj)
        console.log({keyObj: keyVal})
        tableNames[url].update({FACULTY_NAME: "22228"},
          {where: {PULPIT: "111"}}
        ).then(res => {
          console.log(res);
        })
      }).catch(err => console.log(err));
      res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
      res.end("Data has been updated");
    })
      .catch(err => {
        res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
        res.end('connection error:', err)
      })
  } else if (req.method === "DELETE") {
    sequelize.sync().then(() => {
      const id = req.url.split("/")[3];
      const url = req.url.split("/")[2];
      tableNames[url].destroy({where: {PULPIT: "111"}})
      res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
      res.end("Data has been removed");
    })
      .catch(err => {
        res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
        res.end('connection error:', err)
      })
  } else {
    res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
    res.end("wrong method");
  }
}).listen(3000);*/

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/api/Orders', (req, res) => {
  sequelize.sync().then(() => {
    let result;
    ORDER.findAll().then(order => {
      result = order.map(el => {
        return {
          id: el.orderId,
          summary: {
            createdAt: el.createdAt,
            customer: el.customer,
            status: el.status,
            shippedAt: el.updatedAt,
            totalPrice: el.totalPrice,
            currency: el.currency
          },
          shipTo: {
            name: el.shipToName,
            address: el.shipToAddress,
            ZIP: el.ZIP,
            region: el.region,
            country: el.country,
          },
          customerInfo: {
            firstName: el.customerFirstName,
            lastName: el.customerLastName,
            address: el.customerAddress,
            phone: el.customerPhone,
            email: el.customerEmail,
          }
        }
      })
      res.send(JSON.stringify(result))
    }).catch(err => console.log(err));
  })
});


app.get('/api/Orders/:id', (req, res) => {
  let id = req.params.id;
  sequelize.sync().then(() => {
    let result;
    ORDER.findOne({where: {orderId: id}}).then(order => {
      el = order
      result = {
        id: el.orderId,
        summary: {
          createdAt: el.createdAt,
          customer: el.customer,
          status: el.status,
          shippedAt: el.updatedAt,
          totalPrice: el.totalPrice,
          currency: el.currency
        },
        shipTo: {
          name: el.shipToName,
          address: el.shipToAddress,
          ZIP: el.ZIP,
          region: el.region,
          country: el.country,
        },
        customerInfo: {
          firstName: el.customerFirstName,
          lastName: el.customerLastName,
          address: el.customerAddress,
          phone: el.customerPhone,
          email: el.customerEmail,
        }
      }
      res.send(JSON.stringify(result))
    }).catch(err => console.log(err));
  })
});

app.get('/api/Orders/:id/products', (req, res) => {
  let id = req.params.id;
  sequelize.sync().then(() => {
    PRODUCT.findAll({where: {orderId: id}}).then(product => {
      res.send(JSON.stringify(product))
    }).catch(err => console.log(err));
  })
});

app.delete('/api/Orders/:id', (req, res) => {
  let id = req.params.id;
  sequelize.sync().then(() => {
    PRODUCT.destroy({where: {orderId: id}})
    ORDER.destroy({where: {orderId: id}})
    res.send("Data has been removed");

  })
});

app.delete('api/Orders/:id/products/:fk', (req, res) => {
  let id = req.params.id;
  let fk = req.params.fk;
  console.log(id, fk)
  sequelize.sync().then(() => {
    PRODUCT.destroy({where: {orderId: id, productId: fk}})
    res.send("Data has been removed");

  })
});

app.post('/api/Orders', urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
