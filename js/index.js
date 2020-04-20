let Orders;
let currentOrder;
let productsList;

let orderIndex = 0;
let productIdsArr = [];
let ordersIdsArr = [];
let sortCount = 0;

const GETdata = () => {
  document.getElementsByClassName('refreshIcon')[0].classList.add('spin-active');
  document.getElementsByClassName('add-orders-img')[0].src = './icons/refresh.png'
  document.getElementsByClassName('add-orders-img')[0].classList.add('spin-active');
  fetch("http://localhost:3000/api/Orders", {
    method: "GET",
  })

    .then(res => res.json())
    .then(data => {
        const after = Date.now();
        Orders = data
        GETorderData();
        orderIndex = Orders[0].id
        GETfillData()
        GETproducts();
        document.getElementsByClassName('refreshIcon')[0].classList.remove('spin-active');
        document.getElementsByClassName('add-orders-img')[0].src = './icons/plus.png'
        document.getElementsByClassName('add-orders-img')[0].classList.remove('spin-active');
      }
    );
}
GETdata();

// function which fills orders list by orders
const GETorderData = (item) => {
  if (typeof item === 'undefined') {
    item = [];
    Orders.forEach((el, i) => {
      item.push(i)
    });
  }
  ordersList.innerHTML = "";
  if (item.length === 0) {
    ordersList.innerHTML = "<h3 class='no-results'>No orders available</h3>";
  } else {
    item.forEach((index) => {
      let orderContent = document.createElement("div");
      orderContent.classList.add("order-content");
      orderContent.tabIndex = 0;
      orderContent.setAttribute("data-id", Orders[index].id);
      orderContent.innerHTML =
        `<h3>Order ${Orders[index].id}</h3>
               <p>${Orders[index].summary.customer}</p>
               <p>Shipped: ${Orders[index].summary.shippedAt.slice(0, 10)}</p>
               <h2 class="date">${Orders[index].summary.createdAt.slice(0, 10)}</h2>
               <p class="order-status">${Orders[index].summary.status}</p>
<img class="bin-img" src="./icons/trash.png" alt="">`;
      ordersList.appendChild(orderContent);
      // getOrderId();
    });
  }
};
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
        })
      }
    );
};


// function which renders data in order block
const GETorderDataTemp = () => {
  const orderInfoData = document.getElementsByClassName("js-order-info-data")[0];
  document.getElementsByClassName("js-orders-quantity")[0].innerHTML = `Orders(${Orders.length})`;
  orderInfoData.innerHTML = ` <h2>Order ${currentOrder.id}</h2>
                <br>
                <p>Customer: ${currentOrder.summary.customer}</p>
                <p>Ordered: ${currentOrder.summary.createdAt.slice(0, 10)}</p>
                <p>Shipped: ${currentOrder.summary.shippedAt.slice(0, 10)}</p>
                <p class="price">
                </p>`;
};

// function which renders data in ship block
const GETshipDataTemp = () => {
  let shipToData = document.getElementsByClassName("js-ship-to-data")[0];
  let customerInfo = document.getElementsByClassName("js-customer-info")[0];
  shipToData.innerHTML = '';
  customerInfo.innerHTML = '';

  let el = currentOrder
  let inputShipToVal = [el.shipTo.name, el.shipTo.address, el.shipTo.ZIP, el.shipTo.region, el.shipTo.country];
  let inputCustInfVal = [`${el.customerInfo.firstName} ${el.customerInfo.lastName}`, el.customerInfo.address, '-', el.customerInfo.phone];
  inputShipToVal.forEach((elem) => {
    shipToData.innerHTML += `<li>${elem}</li>`;
  });
  inputCustInfVal.forEach((elem) => {
    customerInfo.innerHTML += `<li>${elem}</li>`;
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


// function which renders data in table
const GETtableDataTemp = (item) => {
  if (typeof item === 'undefined') {
    productIdsArr = [];
    productsList.forEach((el, i) => {
      productIdsArr.push(i);
    });
    item = productIdsArr;
  }
  document.getElementsByClassName("table-products")[0].innerHTML = '';
  let fullPrice = 0;
  if (productsList.length !== 0) {
    item.forEach((i) => {
      fullPrice += parseFloat(productsList[i].totalPrice);
      document.getElementsByClassName("price")[0].innerHTML = `${fullPrice}<br>
     <small>
     <small>${productsList[i].currency}</small>
     </small>`;
      let tr = document.createElement("tr");
      tr.innerHTML = `<td><h4>${productsList[i].name}</h4>
                       <span>${productsList[i].id}</span></td>
                   <td data-label="Unit Price"><b>${productsList[i].price}</b> ${productsList[i].currency}</td>
                   <td data-label="Quantity">${productsList[i].quantity}</td>
                   <td data-label="Total"><b>${productsList[i].totalPrice}</b> ${productsList[i].currency}<img class="remove-product-img" src="./icons/trash.png"></td>`;
      document.getElementsByClassName("table-products")[0].appendChild(tr);
    })
  } else {
    document.getElementsByClassName("price")[0].innerHTML = `${fullPrice}<br>
     <small>
     <small>EUR</small>
     </small>`;
    document.getElementsByClassName("table-products")[0].innerHTML = "<h3 class='no-results'>No products yet</h3>";
  }
};

// get id order func to click to order
ordersList.addEventListener("click", (event) => {
  if (event.target.classList.contains("order-content")) {
    orderIndex = +event.target.getAttribute("data-id");
    productIdsArr = [];
    GETfillData();
    GETproducts();

    document.getElementById("productsInput").value = '';
    document.getElementById("sidebarInput").value = '';
    sortCount = 0;
  }
})

// function which filters orders list
const filterOrdersList = () => {
  const ordersIds = [];
  let filteredOrdersId = [];
  Orders.forEach((el, i) => {
    for (let key in el.summary) {
      if (el.summary[key] === document.getElementById("sidebarInput").value) {
        ordersIds.push(i);
      }
    }
    filteredOrdersId = ordersIds.filter((item, pos) => {
      return ordersIds.indexOf(item) === pos;
    });
  });
  GETorderData(filteredOrdersId);
  document.getElementsByClassName("js-orders-quantity")[0].innerHTML = `Orders(${filteredOrdersId.length})`;
};
document.getElementsByClassName("btn-search")[0].addEventListener("click", filterOrdersList);


// function which filtered table products
const filterTable = () => {
  sortCount = 0;
  console.log(currentOrder)
  const productsIds = [];
  productsList.forEach((prod, index) => {
    for (let key in prod) {
      if (prod[key] === document.getElementById("productsInput").value) {
        productsIds.push(index);
        console.log(productsIds);
      }
    }
    productIdsArr = productsIds.filter((unItem, pos) => {
      return productsIds.indexOf(unItem) === pos;
    });
  });
  if (productIdsArr.length === 0) {
    document.getElementsByClassName("table-products")[0].innerHTML = "<h3 class='no-results'>No results</h3>";
  } else {
    GETtableDataTemp(productIdsArr)
  }
  document.getElementsByClassName("js-line-items-quantity")[0].innerHTML = `Line items(${productIdsArr.length})`;
};
document.getElementsByClassName("btn-search")[1].addEventListener("click", filterTable);


// DELETE section

const DELETEorder = (id) => {
  console.log(id)
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

const DELETEproduct = (id) => {
  console.log(id)
  fetch(`http://localhost:3000/api/OrderProducts/${id}`, {
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


// POST section


const POSTorder = (data) => {
  fetch("http://localhost:3000/api/Orders", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(() => GETdata())
    .then(() => document.getElementsByClassName('orders-list')[0].lastChild.click()
    )
}


const toJSONString = (form) => {
  let obj = {};
  let elements = document.querySelectorAll("input");
  elements.forEach((el) => {
    let element = el;
    let name = element.name;
    let value = element.value;

    if (name) {
      obj[name] = value;
    }
  });
  return JSON.stringify(obj);
};

document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("form-popup");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const date = new Date(Date.now()).toDateString();
    let json = toJSONString(this);
    json = JSON.parse(json);
    console.log(json)
    let data = {
      "summary": {
        "createdAt": date,
        "customer": json.firstName,
        "status": "pending",
        "shippedAt": "2017-09-17T19:00:30.422Z",
        "totalPrice": 220,
        "currency": "EUR"
      },
      "shipTo": {
        "name": "Leverx",
        "address": "Nemiga 18",
        "ZIP": "2111",
        "region": "Minsk",
        "country": "Belarus"
      },
      "customerInfo": {
        "firstName": json.firstName,
        "lastName": json.lastName,
        "address": json.address,
        "phone": json.phone,
        "email": json.email
      }
    };

    POSTorder(data);


    document.getElementsByClassName('popup')[0].style.display = 'none';
  });
});
toJSONString()


document.addEventListener("click", (event) => {
  /* if (event.target.classList.contains("js-sort-table")) {
     sortTable();
   }*/
  if (event.target.classList.contains("order-content")) {
    focusOrder()
  }
  if (event.target.innerHTML === 'Edit') {
    document.getElementsByClassName('edit-toggle-btn')[0].innerHTML = 'Display';
    document.getElementsByClassName('edit-toggle-btn')[1].innerHTML = 'Display';
    let shipToData = document.getElementsByClassName("js-ship-to-data")[0];
    let el = currentOrder
    /* let inputShipToVal = [el.shipTo.name, el.shipTo.address, el.shipTo.ZIP, el.shipTo.region, el.shipTo.country];
     let inputCustInfVal = [`${el.customerInfo.firstName} ${el.customerInfo.lastName}`, el.customerInfo.address, '-', el.customerInfo.phone];
      inputShipToVal.forEach(el, () => {
     shipToData.innerHTML += `<input value='${el}'>`;
   })*/

    shipToData.innerHTML = `
      <input value='${el.shipTo.name}'>
      <input value="${el.shipTo.address}">
      <input value="${el.shipTo.ZIP}">
      <input value="${el.shipTo.region}">
      <input value="${el.shipTo.country}">`;


    const customerInfo = document.getElementsByClassName("js-customer-info")[0];

    customerInfo.innerHTML = `
      <input value='${el.customerInfo.firstName} ${el.customerInfo.lastName}'>
      <input value="${el.customerInfo.address}">
      <input value="Developer">
      <input value="${el.customerInfo.phone}">`;


  }
  else if (event.target.innerHTML === 'Display') {
    document.getElementsByClassName('edit-toggle-btn')[0].innerHTML = 'Edit';
    document.getElementsByClassName('edit-toggle-btn')[1].innerHTML = 'Edit';
    GETshipDataTemp()
  }
  if (event.target.classList.contains('remove-product-img')) {
    event.target.parentNode.parentNode.style.display = 'none';
    //let id = event.target.getAttribute('data-id') - 1;
    // Orders.splice(id, 1);
  }
});


const POSTproduct = () => {
  let data = {
    "name": "Eggs",
    "price": 3,
    "currency": "EUR",
    "quantity": 10,
    "totalPrice": 30,
    "orderId": currentOrder.id
  }
  fetch("http://localhost:3000/api/OrderProducts", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('bin-img')) {
    let id = event.target.parentNode.getAttribute('data-id');
    DELETEorder(id);
  }
  if (event.target.classList.contains('add-product-img')) {
    POSTproduct()
    GETproducts()
  }
  if (event.target.classList.contains('refreshIcon')) {
    console.log('lll')
    GETdata()
  }

  /*if (event.target.id === 'submit-popup-btn') {
    POSTorder()
    GETdata()
  }*/
})

/*document.getElementById('submit-popup-btn').addEventListener('click', () => {
  console.log('click')
  POSTorder()
  GETdata()
})*/

/*
if (Orders.length !== 0) {



// function which renders data in table with applied filters
  const productDataTemp = (sortProductsArr) => {
    let item = [];
    typeof sortProductsArr !== "undefined" ? item = sortProductsArr : item = productIdsArr;
    document.getElementsByClassName("js-line-items-quantity")[0].innerHTML = `Line items(${item.length})`;
    tableDataTemp(item);
  };
  productDataTemp();


// function which sorts table products
  const sortTable = () => {
    let result;
    sortCount++;
    const sortBtnState = () => {
      for (let i = 0; i < document.getElementsByClassName('table-img-wrapper').length; i++) {
        document.getElementsByClassName('table-img-wrapper')[i].className = 'table-img-wrapper';
        document.getElementsByClassName('table-img-wrapper')[i].style.opacity = '0.3';
      }
    };
    const compare = (a, b) => {
      if (sortCount === 1 && a[1] < b[1]) {
        sortBtnState();
        event.target.firstChild.classList.add('table-sort-asc');
        event.target.firstChild.style.opacity = '1';
        return -1;
      }
      if (sortCount === 2 && a[1] > b[1]) {
        sortBtnState();
        event.target.firstChild.classList.add('table-sort-desc');
        event.target.firstChild.style.opacity = '1';
        return -1;
      }
      if (sortCount === 3) {
        sortBtnState();
        event.target.firstChild.style.opacity = '1';
        productDataTemp();
        sortCount = 0;
      }
    };

    let sortTableArr = [];
    productIdsArr.forEach((i) => {
      if (event.target.getAttribute("data-table") === "quantity") {
        sortTableArr.push([i, Number(Orders[orderIndex].products[i].quantity)]);
      } else if (event.target.getAttribute("data-table") === "total") {
        sortTableArr.push([i, Number(Orders[orderIndex].products[i].totalPrice)]);
      } else if (event.target.getAttribute("data-table") === "price") {
        sortTableArr.push([i, Number(Orders[orderIndex].products[i].price)]);
      } else if (event.target.getAttribute("data-table") === "product") {
        sortTableArr.push([i, Orders[orderIndex].products[i].name]);
      }
    });

    sortTableArr.sort(compare).forEach((el) => {
      el.pop()
    });
    result = [].concat(...sortTableArr);
    productDataTemp(result);

  };

  const removeOrder = (event) => {
    event.target.parentElement.style.display = 'none';
    let id = event.target.getAttribute('data-id') - 1;
    Orders.splice(id, 1);
    console.log(Orders);
  };

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-sort-table")) {
      sortTable();
    }
    if (event.target.classList.contains("order-content")) {
      focusOrder()
    }
    if (event.target.classList.contains("bin-img")) {
      removeOrder(event);
    }
    if (event.target.innerHTML === 'Edit') {
      document.getElementsByClassName('edit-toggle-btn')[0].innerHTML = 'Display';
      document.getElementsByClassName('edit-toggle-btn')[1].innerHTML = 'Display';
      let shipToData = document.getElementsByClassName("js-ship-to-data")[0];
      let el = Orders[orderIndex]
      let inputShipToVal = [el.ShipTo.name, el.ShipTo.Address, el.ShipTo.ZIP, el.ShipTo.Region, el.ShipTo.Country];
      let inputCustInfVal = [`${el.CustomerInfo.firstName} ${el.CustomerInfo.lastName}`, el.CustomerInfo.address, '-', el.CustomerInfo.phone];
      /!* inputShipToVal.forEach(el, () => {
         shipToData.innerHTML += `<input value='${el}'>`;
       })*!/

      shipToData.innerHTML = `
      <input value='${Orders[orderIndex].ShipTo.name}'>
      <input value="${Orders[orderIndex].ShipTo.Address}">
      <input value="${Orders[orderIndex].ShipTo.ZIP}">
      <input value="${Orders[orderIndex].ShipTo.Region}">
      <input value="${Orders[orderIndex].ShipTo.Country}">`;


      const customerInfo = document.getElementsByClassName("js-customer-info")[0];

      customerInfo.innerHTML = `
      <input value='${Orders[orderIndex].CustomerInfo.firstName} ${Orders[orderIndex].CustomerInfo.lastName}'>
      <input value="${Orders[orderIndex].CustomerInfo.address}">
      <input value="Developer">
      <input value="${Orders[orderIndex].CustomerInfo.phone}">`;


    }
    else if (event.target.innerHTML === 'Display') {
      document.getElementsByClassName('edit-toggle-btn')[0].innerHTML = 'Edit';
      document.getElementsByClassName('edit-toggle-btn')[1].innerHTML = 'Edit';
      shipDataTemp()
    }
    if (event.target.classList.contains('remove-product-img')) {
      event.target.parentNode.parentNode.style.display = 'none';
      //let id = event.target.getAttribute('data-id') - 1;
      // Orders.splice(id, 1);
    }
  });


} else {
  ordersList.innerHTML = "<h3 class='no-results'>No orders available</h3>";
}
*/



