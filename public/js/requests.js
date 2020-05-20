const GETdata = () => {
  document.getElementsByClassName('refreshIcon')[0].classList.add('spin-active');
  document.getElementsByClassName('add-orders-img')[0].src = './icons/refresh.png'
  document.getElementsByClassName('add-orders-img')[0].classList.add('spin-active');
  fetch("http://localhost:3000/api/Orders", {
    method: "GET",
  })
    .then(res => res.json())
    .then(data => {
        Orders = data;
      document.getElementsByClassName('refreshIcon')[0].classList.remove('spin-active');
      document.getElementsByClassName('add-orders-img')[0].src = './icons/plus.png'
      document.getElementsByClassName('add-orders-img')[0].classList.remove('spin-active');
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
          GETfillData();
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
          if (el.orderInfo.id === orderIndex) {
            mapFn(el.customerInfo.address);
          }
          localStorage.setItem('lastOrder', currentOrder.orderInfo.id);
        })
      }
    ).then(() => {
    GETproducts()
  });
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

const GETproductsCatalog = () => {
  fetch(`http://localhost:3000/api/products`, {
    method: "GET",
  })
    .then(res => res.json())
    .then(data => {
       let ul = document.getElementsByClassName('catalog-products')[0];
       ul.innerHTML = '';
       data.forEach(el => {
         ul.innerHTML+=`<li>${el.name} - ${el.price} EUR</li>`
       })
      }
    );
}

const GETcustomerList = () => {
  fetch(`http://localhost:3000/api/customers`, {
    method: "GET",
  })
    .then(res => res.json())
    .then(data => {
        let ul = document.getElementsByClassName('customer-list')[0];
        ul.innerHTML = '';
        data.forEach(el => {
          ul.innerHTML+=`<button class="popup-customer-li">${el.firstName} ${el.lastName}</button>`
        })
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
    .then(() => document.getElementsByClassName('orders-list')[0].lastChild.click()
    )
}

const POSTproduct = (data, id) => {
  fetch(`http://localhost:3000/api/Orders/${id}/products`, {
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
    "firstName": shipToData[0],
    "lastName": customerData[0].split(" ")[1],
    "address": shipToData[1],
    "phone": customerData[3],
    "email": customerData[2],
    "ZIP": shipToData[2],
    "region": shipToData[3],
    "country": shipToData[4]
  };
  fetch(`http://localhost:3000/api/Orders/${currentOrder.orderInfo.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(() => GETdata())
};

