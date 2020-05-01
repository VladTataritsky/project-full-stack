const Sequelize = require("sequelize");
const bodyParser = require("body-parser");
const express = require('express');
const app = express();


const sequelize = new Sequelize("orders", "sa", "123", {
  dialect: "mssql",
  host: "localhost",
  port: "1433"
});


const CUSTOMERINFO = sequelize.define("customerInfo", {
    firstName: {type: Sequelize.STRING, allowNull: false,},
    lastName: {type: Sequelize.STRING, allowNull: false},
    address: {type: Sequelize.STRING, allowNull: false},
    phone: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, allowNull: false},
    ZIP: {type: Sequelize.STRING, allowNull: false},
    region: {type: Sequelize.STRING, allowNull: false},
    country: {type: Sequelize.STRING, allowNull: false},
  },
  {
    tableName: 'CustomerInfo'
  }
)

const ORDERINFO = sequelize.define("orderInfo", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    customerId: {
      type: Sequelize.INTEGER, allowNull: false,
      references: {model: CUSTOMERINFO, key: 'id'}
    },
    status: {type: Sequelize.STRING, allowNull: false},
  },
  {
    tableName: 'orderInfo'
  }
);


const PRODUCTINFO = sequelize.define("ProductInfo", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {type: Sequelize.STRING, allowNull: false},
    price: {type: Sequelize.STRING, allowNull: false},
  }, {
    tableName: 'ProductInfo'
  }
)

const ORDERPRODUCT = sequelize.define("orderProduct", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: ORDERINFO, key: 'id'},
    },
    productId: {
      type: Sequelize.INTEGER, allowNull: false,
      references: {model: PRODUCTINFO, key: 'id'},
    },
    quantity: {
      type: Sequelize.STRING, allowNull: false,

    },

  }
)


sequelize.sync().then(() => {
  console.log('connection success');
})
  .catch(err => console.log(err));

// First Step

ORDERINFO.create({
  customerId: 1,
  status: "shipped",
}).then(res => {
  console.log(res)
}).catch(err => console.log(err));

CUSTOMERINFO.create({
  firstName: "Nick",
  lastName: "Jackson",
  phone: "+375334568721",
  email: "tataritskii@gmail.com",
  address: "Nemiha 22",
  ZIP: "333432",
  region: "Minsk",
  country: "Belarus",
}).then(res => {
  console.log(res)
}).catch(err => console.log(err));

// Second step

/*
ORDERPRODUCT.create({
  orderId: 1,
  productId: 1,
  quantity: "5"
}).then(res => {
  console.log(res)
}).catch(err => console.log(err));


PRODUCTINFO.create({
  name: "eggs",
  price: "2",
}).then(res => {
  console.log(res)
}).catch(err => console.log(err));
*/

/////////////////




/*
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.get('/api/Orders', (req, res) => {
  sequelize.sync().then(() => {
    let result1 = [];
    ORDERINFO.findAll().then(order => {
      order.forEach(el => {
        result1.push({
          id: el.id,
          customerId: el.customerId,
          status: el.status,
          shippedAt: el.createdAt,
          createdAt: el.createdAt
        })
      })
    }).catch(err => console.log(err));
    let result2 = [];
    CUSTOMERINFO.findAll().then(customer => {
      customer.forEach(el => {
        result2.push({
          firstName: el.firstName,
          lastName: el.lastName,
          address: el.address,
          phone: el.phone,
          email: el.email,
          ZIP: el.ZIP,
          region: el.region,
          country: el.country,
        })
      })
      let result = [];
      result.push(...result1, ...result2)
      console.log(result)
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
    PRODUCT.destroy({where: {productId: ll}})
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
  PRODUCT.create(req.body).then(res => {
    console.log(res)
  }).catch(err => console.log(err));
  res.send("data was added")
});

app.put('/api/Orders/:id', (req, res) => {
  let id = req.params.id;
  if (!req.body) return res.sendStatus(400);
  ORDER.update(req.body,
    {where: {orderId: id}}
  ).then(res => {
    console.log(res);
  }).catch(err => console.log(err));
  res.send("data was updated")
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
*/
