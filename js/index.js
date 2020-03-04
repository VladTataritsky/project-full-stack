import {Orders} from "../js/data.js"

const productTableData = document.getElementsByClassName("products-table")[0];
let orderIndex = 0;
let productIdsArr = [];

const refreshProductIdsArr = () => {
  Orders[orderIndex].products.forEach((el, i) => {
    productIdsArr.push(i);
  });
};
refreshProductIdsArr();

// function which renders data in order block
const orderDataTemp = () => {
  const orderInfoData = document.getElementsByClassName("js-order-info-data")[0];
  document.getElementsByClassName("js-orders-quantity")[0].innerHTML = `Orders(${Orders.length})`;
  orderInfoData.innerHTML = ` <h2>Order ${Orders[orderIndex].id}</h2>
                <br>
                <p>Customer: ${Orders[orderIndex].OrderInfo.customer}</p>
                <p>Ordered: ${Orders[orderIndex].OrderInfo.createdAt}</p>
                <p>Shipped: ${Orders[orderIndex].OrderInfo.shippedAt}</p>
                <p class="price">
                </p>`;
};
orderDataTemp();

// function which renders data in ship block
const shipDataTemp = () => {
  const shipToData = document.getElementsByClassName("js-ship-to-data")[0];
  shipToData.innerHTML = `<li>${Orders[orderIndex].ShipTo.name}</li>
                        <li>${Orders[orderIndex].ShipTo.Address}</li>
                        <li>${Orders[orderIndex].ShipTo.ZIP}</li>
                        <li>${Orders[orderIndex].ShipTo.Region}</li>
                        <li>${Orders[orderIndex].ShipTo.Country}</li>`;

  const customerInfo = document.getElementsByClassName("js-customer-info")[0];
  customerInfo.innerHTML = `<li>${Orders[orderIndex].CustomerInfo.firstName} ${Orders[orderIndex].CustomerInfo.lastName}</li>
                        <li>${Orders[orderIndex].CustomerInfo.address}</li>
                        <li>Developer</li>
                        <li><a href="tel:${Orders[orderIndex].CustomerInfo.phone}">${Orders[orderIndex].CustomerInfo.phone}</a></li>`;
};
shipDataTemp();

// function which renders data in table
const tableDataTemp = (item) => {
  productTableData.innerHTML = ` <tr>
                    <th>Product<button  data-table="product" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                    <th>Unit Price<button data-table="price" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                    <th>Quantity<button data-table="quantity" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                    <th>Total<button  data-table="total" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                </tr>`;

  let fullPrice = 0;
  item.forEach((i) => {
    fullPrice += parseFloat(Orders[orderIndex].products[i].totalPrice);
    document.getElementsByClassName("price")[0].innerHTML = `${fullPrice}<br>
      <small>
      <small>${Orders[orderIndex].products[i].currency}</small>
      </small>`;
    let tr = document.createElement("tr");
    tr.innerHTML = `<td><h4>${Orders[orderIndex].products[i].name}</h4>
                        <span>${Orders[orderIndex].products[i].id}</span></td>
                    <td data-label="Unit Price"><b>${Orders[orderIndex].products[i].price}</b> ${Orders[orderIndex].products[i].currency}</td>
                    <td data-label="Quantity">${Orders[orderIndex].products[i].quantity}</td>
                    <td data-label="Total"><b>${Orders[orderIndex].products[i].totalPrice}</b> ${Orders[orderIndex].products[i].currency}</td>`;
    productTableData.appendChild(tr);
  })
};

// function which renders data in table with applied filters
const productDataTemp = (sortProductsArr) => {
  let item = [];
  typeof sortProductsArr !== "undefined" ? item = sortProductsArr : item = productIdsArr;
  document.getElementsByClassName("js-line-items-quantity")[0].innerHTML = `Line items(${item.length})`;
  tableDataTemp(item)
};
productDataTemp();

// function which get order id by click on list of orders
const getOrderId = () => {
  const orderContent = document.getElementsByClassName("order-content");
  for (let i = 0; i < orderContent.length; i++) {
    orderContent[i].addEventListener("click", (event) => {
      orderIndex = event.target.getAttribute("data-id") - 1;
      productIdsArr = [];
      refreshProductIdsArr();
      orderDataTemp();
      shipDataTemp();
      productDataTemp();
    })
  }
};

// function which fills orders list by orders
const orderData = (item) => {
  ordersList.innerHTML = "";
  if (item.length === 0) {
    ordersList.innerHTML = "<h3 class='no-results'>No results</h3>";
  } else {
    item.forEach((index) => {
      let orderContent = document.createElement("div");
      orderContent.classList.add("order-content");
      orderContent.tabIndex = 0;
      orderContent.setAttribute("data-id", Orders[index].id);
      orderContent.innerHTML =
               `<h3>Order ${Orders[index].id}</h3>
                <p>${Orders[index].OrderInfo.customer}</p>
                <p>Shipped: ${Orders[index].OrderInfo.shippedAt}</p>
                <h2 class="date">${Orders[index].OrderInfo.createdAt}</h2>
                <p class="order-status">${Orders[index].OrderInfo.status}</p>`;
      ordersList.appendChild(orderContent);
      getOrderId();
    });
  }
};


// function which refresh orders data
const refreshOrderData = () => {
  let item = [];
  Orders.forEach((el, i) => {
    item.push(i)
  });
  orderData(item);
  if (window.screen.width >= maxPhoneSizeScreen) {
    ordersList.firstChild.classList.add("focus-order-content");
  }
};
refreshOrderData();
document.getElementsByClassName("refreshIcon")[0].addEventListener("click", refreshOrderData);

// function which filtered orders list
const filterOrdersList = () => {
  const ordersIds = [];
  let filteredOrdersId = [];
  Orders.forEach((el, i) => {
    for (let key in el.OrderInfo) {
      if (el.OrderInfo[key].toLowerCase().includes(sidebarInput.value.toLowerCase())) {
        ordersIds.push(i)
      }
    }
    filteredOrdersId = ordersIds.filter((item, pos) => {
      return ordersIds.indexOf(item) === pos;
    });
  });
  orderData(filteredOrdersId);
  document.getElementsByClassName("js-orders-quantity")[0].innerHTML = `Orders(${filteredOrdersId.length})`;
};
document.getElementsByClassName("btn-search")[0].addEventListener("click", filterOrdersList);

// function which filtered table products
const filterTable = () => {
  const productsIds = [];
  Orders[orderIndex].products.forEach((prod, index) => {
    for (let key in prod) {
      if (prod[key].toLowerCase().includes(productsInput.value.toLowerCase())) {
        productsIds.push(index)
      }
    }
    productIdsArr = productsIds.filter((unItem, pos) => {
      return productsIds.indexOf(unItem) === pos;
    });
  });
  let productTableData = document.getElementsByClassName("products-table")[0];
  if (productIdsArr.length === 0) {
    productTableData.innerHTML = "<h3 class='no-results'>No results</h3>";
  } else {
    tableDataTemp(productIdsArr)
  }
  document.getElementsByClassName("js-line-items-quantity")[0].innerHTML = `Line items(${productIdsArr.length})`;
};
document.getElementsByClassName("btn-search")[1].addEventListener("click", filterTable);

// function which sorts table products
let count = 0;
const sortTable = () => {
  let result;
  count++;
  const compare = (a, b) => {
    if (count === 1 && a[1] < b[1]) {
      return -1;
    }
    if (count === 2 && a[1] > b[1]) {
      return -1;
    }
    if (count === 3) {
      productDataTemp();
      count = 0;
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

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-sort-table")) {
    sortTable();
  }
  if (event.target.classList.contains("order-content")) {
    focusOrder();
  }
});




