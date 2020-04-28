const GETdata = () => {
  document.getElementsByClassName('refreshIcon')[0].classList.add('spin-active');
  document.getElementsByClassName('add-orders-img')[0].src = './icons/refresh.png'
  document.getElementsByClassName('add-orders-img')[0].classList.add('spin-active');
  fetch("http://localhost:3000/api/Orders", {
    method: "GET",
  })
    .then(res => res.json())
    .then(data => {
        Orders = data
        if (Orders.length !== 0) {
          GETorderData();
          if (localStorage.getItem("lastOrder") !== null) {
            orderIndex = localStorage.getItem("lastOrder");
          } else {
            orderIndex = Orders[0].id
          }
          let ordersList = document.getElementsByClassName('orders-list')[0];
          let elements = ordersList.querySelectorAll(".order-content");
          elements.forEach((el) => {
            if (el.attributes['data-id'].value === orderIndex) {
              el.click()
            }
          });
          GETfillData()
          GETproducts();
          document.getElementsByClassName('refreshIcon')[0].classList.remove('spin-active');
          document.getElementsByClassName('add-orders-img')[0].src = './icons/plus.png'
          document.getElementsByClassName('add-orders-img')[0].classList.remove('spin-active');
        } else {
          ordersList.innerHTML = "<h3 class='no-results'>No orders available</h3>";
        }
      }
    );
}

const GETfillData = () => {
  fetch(`http://localhost:3000/api/Orders/${orderIndex}`, {
    method: "GET",
  })
    .then(res => res.json())
    .then(data => {
        currentOrder = data
        GETorderDataTemp();
        GETshipDataTemp();
        Orders.forEach(el => {
          if (el.id === orderIndex) {
            mapFn(el.customerInfo.address);
          }
          localStorage.setItem('lastOrder', currentOrder.id);
        })
      }
    );
};

const GETproducts = () => {
  fetch(`http://localhost:3000/api/Orders/${orderIndex}/products`, {
    method: "GET",
  })
    .then(res => res.json())
    .then(data => {
        productsList = data

        GETtableDataTemp();
      }
    );
}

// DELETE section

const DELETEorder = (id) => {
  fetch(`http://localhost:3000/api/Orders/${id}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
  })
    .then(res => res.json())
    .then(res => {
      GETdata();
    })
    .catch(err => console.error(err))
}

const DELETEproduct = (id, fk) => {
  fetch(`http://localhost:3000/api/Orders/${id}/products/${fk}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
  })
    .then(() => GETproducts())
}

// POST section


const POSTorder = (data) => {
  fetch("http://localhost:3000/api/Orders", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) => GETdata())
    .then((d) => document.getElementsByClassName('orders-list')[0].lastChild.click()
    )
}

const POSTproduct = (data) => {
  fetch("http://localhost:3000/api/OrderProducts", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(() => GETproducts()
  )
}

// PUT section

const PUTorder = (shipToData, customerData) => {
  let data = {
    "shipTo": {
      "name": shipToData[0],
      "address": shipToData[1],
      "ZIP": shipToData[2],
      "region": shipToData[3],
      "country": shipToData[4]
    },
    "customerInfo": {
      "firstName": customerData[0],
      "lastName": '',
      "address": customerData[1],
      "phone": customerData[2],
      "email": customerData[3]
    }
  };
  fetch(`http://localhost:3000/api/Orders/${currentOrder.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(() => GETdata())
    .then(() => GETorderData()
    )
};

