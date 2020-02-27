// import {Orders} from 'js/data'
const productsTable = document.getElementsByClassName('products-table')[0];
const tableSortItem = document.getElementsByClassName('js-sort-table');
const Orders = [
  {
    id: "1",
    OrderInfo: {
      createdAt: "10.08.1991",
      customer: "Alfreds Futterkiste",
      status: "Accepted",
      shippedAt: "8.09.1991"
    },
    ShipTo: {
      name: "Maria Anders",
      Address: "Obere Str. 57",
      ZIP: "12209",
      Region: "Germany",
      Country: "Germany"
    },
    CustomerInfo: {
      firstName: "Maria",
      lastName: "Anders",
      address: "Obere Str. 57",
      phone: "030-0074321",
      email: "Maria.Anders@company.com"
    },
    products: [
      {
        id: "1",
        name: "Chai",
        price: "18",
        currency: "EUR",
        quantity: "2",
        totalPrice: "36"
      },
      {
        id: "2",
        name: "Aniseed Syrup",
        price: "10",
        currency: "EUR",
        quantity: "3",
        totalPrice: "30"
      },
      {
        id: "3",
        name: "Chef Anton's Cajun Seasoning",
        price: "22",
        currency: "EUR",
        quantity: "2",
        totalPrice: "44"
      },
      {
        id: "4",
        name: "Chef Anton's Gumbo Mix",
        price: "36",
        currency: "EUR",
        quantity: "21",
        totalPrice: "756"
      },
      {
        id: "5",
        name: "Grandma's Boysenberry Spread",
        price: "25",
        currency: "EUR",
        quantity: "5",
        totalPrice: "125"
      }
    ]
  },
  {
    id: "2",
    OrderInfo: {
      createdAt: "23.12.2006",
      customer: "Bon app",
      status: "Pending",
      shippedAt: "13.02.2007"
    },
    ShipTo: {
      name: "Laurence Lebihan",
      Address: "12, rue des Bouchers",
      ZIP: "13008",
      Region: "France",
      Country: "France"
    },
    CustomerInfo: {
      firstName: "Laurence",
      lastName: "Lebihan",
      address: "12, rue des Bouchers",
      phone: "91.24.45.40",
      email: "Laurence.Lebihan@company.com"
    },
    products: [
      {
        id: "1",
        name: "Queso Cabrales",
        price: "21",
        currency: "EUR",
        quantity: "5",
        totalPrice: "105"
      },
      {
        id: "2",
        name: "Queso Manchego La Pastora",
        price: "38",
        currency: "EUR",
        quantity: "3",
        totalPrice: "114"
      },
      {
        id: "3",
        name: "Pavlova",
        price: "120",
        currency: "EUR",
        quantity: "5",
        totalPrice: "600"
      },
      {
        id: "4",
        name: "Sir Rodney's Marmalade",
        price: "5",
        currency: "EUR",
        quantity: "3",
        totalPrice: "15"
      },
      {
        id: "5",
        name: "Genen Shouyu",
        price: "40",
        currency: "EUR",
        quantity: "7",
        totalPrice: "280"
      },
      {
        id: "6",
        name: "Tofu",
        price: "23.25",
        currency: "EUR",
        quantity: "1",
        totalPrice: "23.25"
      },
      {
        id: "7",
        name: "Alice Mutton",
        price: "32",
        currency: "EUR",
        quantity: "39",
        totalPrice: "1248"
      }
    ]
  }
];

let orderIndex = 0;
let uniqueTableArr = [];
Orders[orderIndex].products.forEach((el,i) => {
  uniqueTableArr.push(i)
});


const orderData = () => {
  document.getElementsByClassName('js-orders-quantity')[0].innerHTML = `Orders(${Orders.length})`;
  let orderInfoData = document.getElementsByClassName('js-order-info-data')[0];
  orderInfoData.innerHTML = ` <h2>Order ${Orders[orderIndex].id}</h2>
                <br>
                <p>Customer: ${Orders[orderIndex].OrderInfo.customer}</p>
                <p>Ordered: ${Orders[orderIndex].OrderInfo.createdAt}</p>
                <p>Shipped: ${Orders[orderIndex].OrderInfo.shippedAt}</p>
                <p class="price">
                </p>`;

}
orderData()

const shipData = () => {
  let shipToData = document.getElementsByClassName('js-ship-to-data')[0];
  shipToData.innerHTML = `<li>${Orders[orderIndex].ShipTo.name}</li>
                        <li>${Orders[orderIndex].ShipTo.Address}</li>
                        <li>${Orders[orderIndex].ShipTo.ZIP}</li>
                        <li>${Orders[orderIndex].ShipTo.Region}</li>
                        <li>${Orders[orderIndex].ShipTo.Country}</li>`;


  let customerInfo = document.getElementsByClassName('js-customer-info')[0];
  customerInfo.innerHTML = `<li>${Orders[orderIndex].CustomerInfo.firstName} ${Orders[orderIndex].CustomerInfo.lastName}</li>
                        <li>${Orders[orderIndex].CustomerInfo.address}</li>
                        <li>Developer</li>
                        <li><a href="tel:${Orders[orderIndex].CustomerInfo.phone}">${Orders[orderIndex].CustomerInfo.phone}</a></li>`;
}
shipData()

const productData = (sortArr) => {
  let item = [];
  if (sortArr !== undefined) {
    item = sortArr;
  } else {
    for (let i = 0; i < Orders[orderIndex].products.length; i++) {
      item.push(i)
    }
  }
  document.getElementsByClassName('js-line-items-quantity')[0].innerHTML = `Line items(${Orders[orderIndex].products.length})`;
  let productTableData = document.getElementsByClassName('products-table')[0];
  productTableData.innerHTML = ` <tr>
                    <th>Product<button  onclick="sortTable(event)" data-table="product" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                    <th>Unit Price<button onclick="sortTable(event)" data-table="price" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                    <th>Quantity<button  onclick="sortTable(event)" data-table="quantity" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                    <th>Total<button onclick="sortTable(event)" data-table="total" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                </tr>`;
  let fullPrice = 0;
  item.forEach((i) => {
    fullPrice += parseFloat(Orders[orderIndex].products[i].totalPrice);
    document.getElementsByClassName('price')[0].innerHTML = `${fullPrice}<br>
    <small>
    <small>${Orders[orderIndex].products[i].currency}</small>
    </small>`;
    let tr = document.createElement('tr');
    tr.innerHTML = `<td><h4>${Orders[orderIndex].products[i].name}</h4>
                        <span>${Orders[orderIndex].products[i].id}</span></td>
                    <td data-label="Unit Price"><b>${Orders[orderIndex].products[i].price}</b> ${Orders[orderIndex].products[i].currency}</td>
                    <td data-label="Quantity">${Orders[orderIndex].products[i].quantity}</td>
                    <td data-label="Total"><b>${Orders[orderIndex].products[i].totalPrice}</b> ${Orders[orderIndex].products[i].currency}</td>`;
    productTableData.appendChild(tr);
  })

}
productData()


const getId = () => {
  const arr = document.getElementsByClassName('order-content');
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', (event) => {
      orderIndex = event.target.getAttribute('data-id') - 1;
      orderData()
      shipData()
      productData()
    })
  }
};
getId();

const refreshOrderData = () => {
  ordersList.innerHTML = '';
  Orders.forEach((el) => {
    let orderContent = document.createElement('div');
    orderContent.classList.add('order-content');
    orderContent.tabIndex = 0;
    orderContent.setAttribute('data-id', el.id);
    orderContent.setAttribute('onclick', 'focusOrder(event)');
    orderContent.innerHTML =
      `<h3>Order ${el.id}</h3>
                <p>${el.OrderInfo.customer}</p>
                <p>Shipped: ${el.OrderInfo.shippedAt}</p>
                <h2 class="date">${el.OrderInfo.createdAt}</h2>
                <p class="order-status">${el.OrderInfo.status}</p>`;
    ordersList.appendChild(orderContent);
    getId();
  })
};
refreshOrderData()
document.getElementsByClassName('refreshIcon')[0].addEventListener('click', refreshOrderData);

document.getElementsByClassName('btn-search')[0].addEventListener('click', () => {
  const arr = [];
  let uniqueArr = []
  Orders.forEach((el, i) => {
    for (let key in el.OrderInfo) {
      if (el.OrderInfo[key].toLowerCase().includes(sidebarInput.value.toLowerCase())) {
        arr.push(i)
      }
    }
    uniqueArr = arr.filter((item, pos) => {
      return arr.indexOf(item) === pos;
    });
  });
  ordersList.innerHTML = '';
  if (uniqueArr.length === 0) {
    ordersList.innerHTML = '<h3 class="no-results">No results</h3>';
  } else {
    uniqueArr.forEach((index) => {
      let orderContent = document.createElement('div');
      orderContent.classList.add('order-content');
      orderContent.tabIndex = 0;
      orderContent.setAttribute('data-id', Orders[index].id);
      orderContent.setAttribute('onclick', 'focusOrder(event)');
      orderContent.innerHTML =
        `<h3>Order ${Orders[index].id}</h3>
                <p>${Orders[index].OrderInfo.customer}</p>
                <p>Shipped: ${Orders[index].OrderInfo.shippedAt}</p>
                <h2 class="date">${Orders[index].OrderInfo.createdAt}</h2>
                <p class="order-status">${Orders[index].OrderInfo.status}</p>`;
      ordersList.appendChild(orderContent);
      getId()
    })
  }
  document.getElementsByClassName('js-orders-quantity')[0].innerHTML = `Orders(${uniqueArr.length})`;
});


const filterTable = () => {

  let arr2 = [];
  Orders[orderIndex].products.forEach((prod, index) => {
    for (let key in prod) {
      if (prod[key].toLowerCase().includes(productsInput.value.toLowerCase())) {
        arr2.push(index)
      }
    }
    uniqueTableArr = arr2.filter((unItem, pos) => {
      return arr2.indexOf(unItem) === pos;
    });
  });
  arr2 = []
 // sortTable(uniqueTableArr);

  let productTableData = document.getElementsByClassName('products-table')[0];
  if (uniqueTableArr.length === 0) {
    productTableData.innerHTML = '<h3 class="no-results">No results</h3>';
  } else {
    productTableData.innerHTML = ` <tr>
                    <th>Product<button  onclick="sortTable(event)" data-table="product" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                    <th>Unit Price<button onclick="sortTable(event)" data-table="price" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                    <th>Quantity<button  onclick="sortTable(event)" data-table="quantity" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                    <th>Total<button onclick="sortTable(event)" data-table="total" class="js-sort-table"><img src="./icons/sort.png" alt=""></button></th>
                </tr>`;
    let fullPrice = 0;
    uniqueTableArr.forEach((el) => {
      fullPrice += parseFloat(Orders[orderIndex].products[el].totalPrice);
      document.getElementsByClassName('price')[0].innerHTML = `${fullPrice}<br>
    <small>
    <small>${Orders[orderIndex].products[el].currency}</small>
    </small>`;
      let tr = document.createElement('tr');
      tr.innerHTML = `<td><h4>${Orders[orderIndex].products[el].name}</h4>
                        <span>${Orders[orderIndex].products[el].id}</span></td>
                    <td data-label="Unit Price"><b>${Orders[orderIndex].products[el].price}</b> ${Orders[orderIndex].products[el].currency}</td>
                    <td data-label="Quantity">${Orders[orderIndex].products[el].quantity}</td>
                    <td data-label="Total"><b>${Orders[orderIndex].products[el].totalPrice}</b> ${Orders[orderIndex].products[el].currency}</td>`;
      productTableData.appendChild(tr);
    })
  }
  document.getElementsByClassName('js-line-items-quantity')[0].innerHTML = `Line items(${uniqueTableArr.length})`;
};
document.getElementsByClassName('btn-search')[1].addEventListener('click', filterTable)

const sortTable = () => {
  const compare = (a, b) => {
    if (typeof a[1] === "number") {
      return a[1] - b[1];
    } else {
      if (a[1] < b[1])
        return -1;
    }
  };
  let arr1 = [];
 uniqueTableArr.forEach((i) => {
    if (event.target.getAttribute('data-table') === 'quantity') {
      arr1.push([i, Number(Orders[orderIndex].products[i].quantity)]);
    } else if (event.target.getAttribute('data-table') === 'total') {
      arr1.push([i, Number(Orders[orderIndex].products[i].totalPrice)]);
    } else if (event.target.getAttribute('data-table') === 'price') {
      arr1.push([i, Number(Orders[orderIndex].products[i].price)]);
    } else if (event.target.getAttribute('data-table') === 'product') {
      arr1.push([i, Orders[orderIndex].products[i].name]);
    }
  });
  arr1.sort(compare);
  arr1.forEach((el) => el.pop());
  let res = [].concat(...arr1);
  productData(res);
};



