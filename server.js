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
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
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
);


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
);

sequelize.sync().then(() => {
  console.log('connection success');
})
  .catch(err => console.log(err));


app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


/*app.get('/api/Orders', (req, res) => {
  sequelize.sync().then(() => {
    let orderInfo = [];
    let customerInfo = [];
    let result = [];
    ORDERINFO.findAll().then(order => {
      orderInfo = order
    }).then(() => {
      CUSTOMERINFO.findAll().then(customer => {
        customerInfo = customer;
        orderInfo.forEach((el, i) => {
          result.push({
            orderInfo: orderInfo[i],
            customerInfo: customerInfo[i]
          });
        });
        res.send(JSON.stringify(result))
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  })
});*/

app.get('/api/Orders', (req, res) => {
  sequelize.sync().then(() => {
    let orderInfo = [];
    let customerInfo = [];
    let result = [];
    CUSTOMERINFO.findAll().then(customer => {
      let custId = customer.map(el => {
        return el.id
      });
      customerInfo = customer;
      ORDERINFO.findAll({where: {customerId: custId}}).then(order => {
        orderInfo = order;
        orderInfo.forEach((ord, i) => {
          customerInfo.forEach((cust, j) => {
            if(ord.customerId === cust.id) {
              result.push({
                orderInfo: ord,
                customerInfo: cust
              });
            }
          })
        });
        res.send(JSON.stringify(result))
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  })
});

app.get('/api/Orders/:id', (req, res) => {
  let currentId = req.params.id;
  sequelize.sync().then(() => {
    let currentOrder = [];
    let currentCustomer = [];
    let result = [];
    ORDERINFO.findOne({where: {id: currentId}}).then(order => {
      currentOrder = order;
      CUSTOMERINFO.findOne({where: {id: order.customerId}}).then(customer => {
        currentCustomer = customer;
        result = {
          orderInfo: currentOrder,
          customerInfo: currentCustomer
        };
        res.send(JSON.stringify(result))
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  })
});

app.get('/api/products', (req, res) => {
  sequelize.sync().then(() => {
    PRODUCTINFO.findAll().then(products => {
      res.send(JSON.stringify(products))
    }).catch(err => console.log(err));
  })
});

app.get('/api/customers', (req, res) => {
  sequelize.sync().then(() => {
    CUSTOMERINFO.findAll().then(customers => {
      res.send(JSON.stringify(customers))
    }).catch(err => console.log(err));
  })
});

app.get('/api/Orders/:id/products', (req, res) => {
  let currentOrder = +req.params.id;
  sequelize.sync().then(() => {
    let orderProduct = [];
    let productInfo = [];
    let result = [];
    ORDERPRODUCT.findAll({
      where: {orderId: currentOrder}, order: [
        ['productId', 'ASC'],
      ]
    }).then(order => {
      orderProduct = order;
      let productIds = order.map(el => el.productId);
      PRODUCTINFO.findAll({
        where: {
          id: productIds
        }
      }).then(products => {
        productInfo = products;
        products.forEach((el, i) => {
          result.push({
              orderProduct: orderProduct[i],
              productInfo: productInfo[i]
            }
          );
        });
        res.send(JSON.stringify(result))
      })
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
});

app.delete('/api/Orders/:id', (req, res) => {
  let currentId = req.params.id;
  sequelize.sync().then(() => {
    ORDERPRODUCT.destroy({where: {orderId: currentId}});
    ORDERINFO.destroy({where: {id: currentId}});
    CUSTOMERINFO.destroy({where: {id: currentId}});
    res.send("Data has been removed");

  })
});

app.delete('/api/Orders/:id/products/:fk', (req, res) => {
  let id = req.params.id;
  let fk = req.params.fk;
  sequelize.sync().then(() => {
    ORDERPRODUCT.destroy({where: {orderId: id, productId: fk}})
    res.send("Data has been removed");

  })
});

app.post('/api/Orders', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if(!req.body.firstName) {
    CUSTOMERINFO.create(req.body.customerInfo
  ).then(() => {
    CUSTOMERINFO.findOne({where: {firstName: req.body.customerInfo.firstName}}).then((customer) => {
      req.body.orderInfo.customerId = customer.id;
    }).then(() => ORDERINFO.create(req.body.orderInfo))
  }).catch(err => {
    console.log(err)
  }).catch(err => {
    console.log(err)
  });
  res.send("data was added")
  } else {
    CUSTOMERINFO.findOne({where: {firstName: req.body.firstName}}).then((customer) => {
      CUSTOMERINFO.create(customer
      ).catch(err => {
        console.log(err)
        ORDERINFO.create({
            customerId: customer.id,
            status: "pending"
          }
        ).catch(err => {
          console.log(err)
        });
        res.send("data was added")
      });


    })
  }
});

/*
app.post('/api/Orders', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  CUSTOMERINFO.create(req.body.customerInfo
  ).then(() => {
    CUSTOMERINFO.findOne({where: {firstName: req.body.customerInfo.firstName}}).then((customer) => {
      req.body.orderInfo.customerId = customer.id;
    }).then(() => ORDERINFO.create(req.body.orderInfo))
  }).catch(err => {
    console.log(err)
  }).catch(err => {
    console.log(err)
  });
  res.send("data was added")
});
*/


app.post('/api/Orders/:id/products', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  let currentId = req.params.id;
  let productId;
  PRODUCTINFO.findOne({where: {name: req.body.name}}).then(product => {
    productId = +product.id;
    ORDERPRODUCT.findOne({where: {productId: productId, orderId: currentId}}).then(el => {
      if (el !== null) {
        ORDERPRODUCT.update({quantity: req.body.quantity}, {
          where: {
            productId: productId
          }
        })
      } else {
        ORDERPRODUCT.create({
          orderId: +currentId,
          productId: productId,
          quantity: req.body.quantity
        }).then(res => {
          console.log(res)
        }).catch(err => console.log(err));
      }
    })
  });
  res.send("data was added")
});

app.put('/api/Orders/:id', (req, res) => {
  let currentId = req.params.id;
  if (!req.body) return res.sendStatus(400);
  CUSTOMERINFO.update(req.body,
    {where: {id: currentId}}
  ).then(res => {
    console.log(res);
  }).catch(err => console.log(err));
  res.send("data was updated")
});


app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
