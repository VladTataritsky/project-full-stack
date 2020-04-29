const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const express = require('express');
const app = express();


const sequelize = new Sequelize("orders", "sa", "123", {
  dialect: "mssql",
  host: "localhost",
  port: "1433"
});

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
    name: {type: Sequelize.STRING,  allowNull: false},
    price: {type: Sequelize.STRING, allowNull: false},
    currency: {type: Sequelize.STRING, allowNull: false},
    quantity: {type: Sequelize.STRING, allowNull: false},
    totalPrice: {type: Sequelize.STRING, allowNull: false},
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: ORDER, key: 'orderId'},
    }
  }
)

sequelize.sync().then(result => {
  console.log('connection success');
})
  .catch(err => console.log(err));

/*
ORDER.create({
  customer: "Nick",
  status: "shipped",
  totalPrice: "111",
  currency: "BYN",
  shipToName: "level222",
  shipToAddress: "Nemiha 22",
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
}).catch(err => console.log(err));


PRODUCT.create({
  name: "Milk",
  price: "2",
  currency: "BYN",
  quantity: "3",
  totalPrice: "6",
  orderId: 1
}).then(res => {
  console.log(res)
}).catch(err => console.log(err));
*/

app.use(bodyParser.json());
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
      el = order;
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

app.delete('/api/Orders/:id/products/:ll', (req, res) => {
  let id = req.params.id;
  let ll = req.params.ll;
  console.log(id, ll)
  sequelize.sync().then(() => {
    PRODUCT.destroy({where: { productId: ll}})
    res.send("Data has been removed");

  })
});

app.post('/api/Orders', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  ORDER.create(req.body
  ).then(res => {
    console.log(res)
  }).catch(err => console.log(err));
  res.send("data was added")
});

app.post('/api/OrderProducts', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  PRODUCT.create( req.body ).then(res => {
    console.log(res)
  }).catch(err => console.log(err));
  res.send("data was added")
});

app.put('/api/Orders/:id', (req, res) => {
  let id = req.params.id;
  if (!req.body) return res.sendStatus(400);
  ORDER.update( req.body,
    {where: {orderId: id}}
  ).then(res => {
    console.log(res);
}).catch(err => console.log(err));
  res.send("data was updated")
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
