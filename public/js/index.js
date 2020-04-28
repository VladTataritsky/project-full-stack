let Orders;
let currentOrder;
let productsList;
let orderIndex = 0;
let productIdsArr = [];
let sortCount = 0;

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
const GETshipDataTemp = (data) => {
  let shipToData = document.getElementsByClassName("js-ship-to-data")[0];
  let customerInfo = document.getElementsByClassName("js-customer-info")[0];
  shipToData.innerHTML = '';
  customerInfo.innerHTML = '';

  let el = currentOrder
  let inputShipToVal = [el.shipTo.name, el.shipTo.address, el.shipTo.ZIP, el.shipTo.region, el.shipTo.country];
  let inputCustInfVal = [`${el.customerInfo.firstName} ${el.customerInfo.lastName}`, el.customerInfo.address, '-', el.customerInfo.phone];
  if(typeof data === 'undefined') {
    inputShipToVal.forEach((elem) => {
      shipToData.innerHTML += `<li>${elem}</li>`;
    });
    inputCustInfVal.forEach((elem) => {
      customerInfo.innerHTML += `<li>${elem}</li>`;
    });
  } else {
    inputShipToVal.forEach((elem) => {
      shipToData.innerHTML += `<input value='${elem}'>`;
    });
    inputCustInfVal.forEach((elem) => {
      customerInfo.innerHTML += `<input value='${elem}'>`;
    });
  }
};

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
      tr.setAttribute('data-id', productsList[i].id);
      tr.innerHTML = `<td><h4>${productsList[i].name}</h4>
                       <span>${productsList[i].productId}</span></td>
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
  document.getElementsByClassName("js-line-items-quantity")[0].innerHTML = `Line items(${item.length})`;
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
    sortBtnState();
   // window.history.pushState({}, null, `/Orders/${orderIndex}`);
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
  const productsIds = [];
  productsList.forEach((prod, index) => {
    for (let key in prod) {
      if (prod[key] === document.getElementById("productsInput").value) {
        productsIds.push(index);
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
};
document.getElementsByClassName("btn-search")[1].addEventListener("click", filterTable);

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
    let json = {}
    json = toJSONString(this);
    json = JSON.parse(json);
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
  let formProduct = document.getElementById("form-popup-products");
  formProduct.addEventListener("submit", (e) => {
    e.preventDefault();
    let productJson = {};
    productJson = toJSONString(this);
    productJson = JSON.parse(productJson);
    let data = {
      "name": productJson.name,
      "price": productJson.price,
      "currency": "EUR",
      "quantity": productJson.quantity,
      "totalPrice": productJson.price * productJson.quantity,
      "orderId": currentOrder.id
    }
    POSTproduct(data);
    document.getElementsByClassName('popup')[0].style.display = 'none';
  });
});
toJSONString();

// function which sorts table products
const sortTable = () => {
  let result;
  sortCount++;

  const compare = (a, b) => {
    if (sortCount === 1 && a[1] < b[1]) {
      sortBtnState();
      event.target.firstChild.nextSibling.classList.add('table-sort-asc');
      event.target.firstChild.nextSibling.style.opacity = '1';
      return -1;
    }
    if (sortCount === 2 && a[1] > b[1]) {
      sortBtnState();
      event.target.firstChild.nextSibling.classList.add('table-sort-desc');
      event.target.firstChild.nextSibling.style.opacity = '1';
      return -1;
    }
    if (sortCount === 3) {
      sortBtnState();
      event.target.firstChild.nextSibling.style.opacity = '1';
      productDataTemp()
      sortCount = 0;
    }

  };
  let sortTableArr = [];
  productIdsArr.forEach((i) => {
    if (event.target.getAttribute("data-table") === "quantity") {
      sortTableArr.push([i, Number(productsList[i].quantity)]);
    } else if (event.target.getAttribute("data-table") === "total") {
      sortTableArr.push([i, +productsList[i].totalPrice]);
    } else if (event.target.getAttribute("data-table") === "price") {
      sortTableArr.push([i, +productsList[i].price]);
    } else if (event.target.getAttribute("data-table") === "product") {
      sortTableArr.push([i, productsList[i].name]);
    }
  });
  sortTableArr.sort(compare).forEach((el) => {
    el.pop()
  });
  result = [].concat(...sortTableArr);
  productDataTemp(result)

};

// function which renders data in table with applied filters
const productDataTemp = (sortProductsArr) => {
  let item = [];
  typeof sortProductsArr !== "undefined" ? item = sortProductsArr : item = productIdsArr;
  GETtableDataTemp(item);
};

const sortBtnState = () => {
  for (let i = 0; i < document.getElementsByClassName('table-img-wrapper').length; i++) {
    document.getElementsByClassName('table-img-wrapper')[i].className = 'table-img-wrapper';
    document.getElementsByClassName('table-img-wrapper')[i].style.opacity = '0.3';
  }
};


document.addEventListener("click", (event) => {
  if (event.target.classList.contains('bin-img')) {
    let id = event.target.parentNode.getAttribute('data-id');
    let x = confirm(`Remove order ${id}. Are you sure?`)
    if (x) {
      DELETEorder(id);
    }
  }
  if (event.target.classList.contains('remove-product-img')) {
    let fk = +event.target.parentNode.parentNode.getAttribute('data-id');
    let id = currentOrder.id;
    let x = confirm(`Remove this product. Are you sure?`)
    if (x) {
      DELETEproduct(id, fk);
    }
  }
  if (event.target.classList.contains('refreshIcon')) {
    GETdata()
  }
  if (event.target.classList.contains('js-sort-table')) {
    sortTable();
  }
  /* if (event.target.classList.contains("js-sort-table")) {
     sortTable();
   }*/
  if (event.target.classList.contains("order-content")) {
    focusOrder()
  }
  if (event.target.innerHTML === 'Edit') {
    GETshipDataTemp(1)
    document.getElementsByClassName('edit-toggle-btn')[0].innerHTML = 'Display';
    document.getElementsByClassName('edit-toggle-btn')[1].innerHTML = 'Display';
  }
  else if (event.target.innerHTML === 'Display') {
    let shipToData = []
    let shipToForm = document.getElementsByClassName("form-display-shipto")[0];
    let shipToFormEl = shipToForm.querySelectorAll("input");
    shipToFormEl.forEach(el => {
      shipToData.push(el.value)
    })
    let customerData = []
    let customerForm = document.getElementsByClassName("form-display-customer")[0];
    let customerFormEl = customerForm.querySelectorAll("input");
    customerFormEl.forEach(el => {
      customerData.push(el.value)
    })
    PUTorder(shipToData, customerData);
    document.getElementsByClassName('edit-toggle-btn')[0].innerHTML = 'Edit';
    document.getElementsByClassName('edit-toggle-btn')[1].innerHTML = 'Edit';
    GETshipDataTemp()
  }
});