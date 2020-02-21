// import {Orders} from 'js/data'
const menuBtn = document.getElementById('menuBtn');
const aside = document.getElementsByTagName('aside')[0];
const personBtn = document.getElementById('personBtn');
const truckBtn = document.getElementById('truckBtn');
const input = document.getElementById('input');
const closeIcon = document.getElementById('closeIcon');

const menuState = () => {
  if (aside.classList.contains('hide-menu')) {
    aside.classList.remove('hide-menu');
    aside.classList.add('show-menu');
  } else {
    aside.classList.remove('show-menu');
    aside.classList.add('hide-menu');
  }
};
menuBtn.addEventListener('click', menuState);

personBtn.addEventListener('click', () => {
  document.getElementById('shippingContainer').style.display = 'none';
  document.getElementById('processorInfContainer').style.display = 'block';
  truckBtn.firstElementChild.classList.remove('circle-active');
  personBtn.firstElementChild.classList.add('circle-active');
  personBtn.style.borderBottom = '3px solid #738fa4';
  truckBtn.style.borderBottom = '3px solid transparent';
});

truckBtn.addEventListener('click', () => {
  document.getElementById('processorInfContainer').style.display = 'none';
  document.getElementById('shippingContainer').style.display = 'block';
  personBtn.firstElementChild.classList.remove('circle-active');
  truckBtn.firstElementChild.classList.add('circle-active');
  truckBtn.style.borderBottom = '3px solid #738fa4';
  personBtn.style.borderBottom = '3px solid transparent';
});

input.addEventListener('focus', () => {
  document.getElementById('refreshIcon').style.display = 'none';
  document.getElementById('searchIcon').style.right = 15 + 'px';
  // input.length !== 0 ? closeIcon.style.display = 'inline' : closeIcon.style.display = 'none';
});

input.addEventListener('blur', () => {
  closeIcon.style.display = 'none';
  document.getElementById('refreshIcon').style.display = 'inline';
  document.getElementById('searchIcon').style.right = 40 + 'px';
});

input.addEventListener('input', (event) => {
  event.target.value !== event.target.pattern ? closeIcon.style.display = 'inline' : closeIcon.style.display = 'none';
});


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
const orderInfoFn = () => {
  document.getElementsByClassName('orders-quantity')[0].innerHTML = `Orders(${Orders.length})`;
  document.getElementsByClassName('line-items-quantity')[0].innerHTML = `Line items(${Orders[orderIndex].products.length})`;


  let orderInfoData = document.getElementsByClassName('order-info-data')[0];
  orderInfoData.innerHTML = ` <h2>Order ${Orders[orderIndex].id}</h2>
                <br>
                <p>Customer: ${Orders[orderIndex].OrderInfo.customer}</p>
                <p>Ordered: ${Orders[orderIndex].OrderInfo.createdAt}</p>
                <p>Shipped: ${Orders[orderIndex].OrderInfo.shippedAt}</p>
                <p class="price">
                </p>`;


  let shipToData = document.getElementsByClassName('ship-to-data')[0];
  shipToData.innerHTML = `<li>${Orders[orderIndex].ShipTo.name}</li>
                        <li>${Orders[orderIndex].ShipTo.Address}</li>
                        <li>${Orders[orderIndex].ShipTo.ZIP}</li>
                        <li>${Orders[orderIndex].ShipTo.Region}</li>
                        <li>${Orders[orderIndex].ShipTo.Country}</li>`;


  let customerInfo = document.getElementsByClassName('customer-info')[0];
  customerInfo.innerHTML = `<li>${Orders[orderIndex].CustomerInfo.firstName} ${Orders[orderIndex].CustomerInfo.lastName}</li>
                        <li>${Orders[orderIndex].CustomerInfo.address}</li>
                        <li>Developer</li>
                        <li><a href="tel:${Orders[orderIndex].CustomerInfo.phone}">${Orders[orderIndex].CustomerInfo.phone}</a></li>`;


  let productTableData = document.getElementsByClassName('product-table-data')[0];
  productTableData.innerHTML = ` <tr>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>`;
  let fullPrice = 0;
  Orders[orderIndex].products.forEach((el) => {
    fullPrice += parseInt(el.totalPrice);
    document.getElementsByClassName('price')[0].innerHTML = `${fullPrice}<br>
    <small>
    <small>${el.currency}</small>
    </small>`
    let tr = document.createElement('tr');
    tr.innerHTML = `<td><h4>${el.name}</h4>
                        <span>${el.id}</span></td>
                    <td data-label="Unit Price"><b>${el.price}</b> ${el.currency}</td>
                    <td data-label="Quantity">${el.quantity}</td>
                    <td data-label="Total"><b>${el.totalPrice}</b> ${el.currency}</td>`;
    productTableData.appendChild(tr);
  })


};
orderInfoFn();

const getId = () => {
  const arr = document.getElementsByClassName('order-content');
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', (event) => {
      orderIndex = event.target.getAttribute('data-id') - 1;
      orderInfoFn()
    })
  }
};
getId();

const refreshData = () => {
  document.getElementsByClassName('orders')[0].innerHTML = '';
  Orders.forEach((el) => {
    let orderContent = document.createElement('div');
    orderContent.classList.add('order-content');
    orderContent.tabIndex = 0;
    orderContent.setAttribute('data-id', el.id);
    orderContent.innerHTML =
      `<h3>Order ${el.id}</h3>
                <p>${el.OrderInfo.customer}</p>
                <p>Shipped: ${el.OrderInfo.shippedAt}</p>
                <h2 class="date">${el.OrderInfo.createdAt}</h2>
                <p class="order-status">${el.OrderInfo.status}</p>`;
    document.getElementsByClassName('orders')[0].appendChild(orderContent);
    getId();
  })
};
refreshData();
document.getElementById('refreshIcon').addEventListener('click', refreshData);