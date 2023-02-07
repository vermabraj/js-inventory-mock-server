const api = "http://localhost:3000/products";

let showPros = async () => {
  let res = await fetch(api);
  res = await res.json();
  renderDom(res);
};
showPros();
let productCard = ({ id, name, price, description, delivery, image }) => {
  let div = document.createElement("div");
  div.setAttribute("class", "item");
  let n = document.createElement("h3");
  let p = document.createElement("p");
  let d = document.createElement("p");
  let de = document.createElement("p");
  let ig = document.createElement("img");
  let deleteBtn = document.createElement("button");
  let updateBtn = document.createElement("button");
  n.innerText = name;
  p.innerText = price;
  p.setAttribute("class", "product_price");
  d.innerText = description;
  de.innerText = delivery;
  de.setAttribute("class", "product_delivery");
  ig.src = image;
  ig.setAttribute("id", "productimg");
  deleteBtn.innerText = "DELETE";
  deleteBtn.setAttribute("class", "remove_item");
  updateBtn.innerText = "UPDATE";
  updateBtn.setAttribute("class", "update_price");

  deleteBtn.onclick = () => {
    deleteProduct(id);
  };

  updateBtn.onclick = () => {
    updateProduct(id);
  };
  div.append(n, p, d, de, ig, deleteBtn, updateBtn);
  return div;
};

let renderDom = async (data) => {
  let cont = document.getElementById("container");
  cont.innerHTML = null;

  data.forEach((el) => {
    let card = productCard(el);
    cont.append(card);
  });
};
let addProduct = async (e) => {
  e.preventDefault();

  let form = document.getElementById("form");
  let name = form.name.value;
  let price = +form.price.value;
  let description = form.description.value;
  let delivery = form.delivery.value;
  let image = form.image.value;

  let product = { name, price, description, delivery, image };

  let res = await fetch(api, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    },
  });
  form.name.value = null;
  form.price.value = null;
  form.description.value = null;
  form.delivery.value = null;
  form.image.value = null;
};

let deleteProduct = async (id) => {
  let res = await fetch(`${api}/${id}`, {
    method: "DELETE",
  });
  showProduct();
};
let updateProduct = async (id) => {
  let newprice = window.prompt("Enter New Price");
  let data = { price: newprice };
  let res = await fetch(`${api}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  showProduct();
};
let asc = async () => {
  let res = await fetch(`${api}?_sort=price&_order=asc`);
  res = await res.json();
  renderDom(res);
};

let des = async () => {
  let res = await fetch(`${api}?_sort=price&_order=desc`);
  res = await res.json();
  renderDom(res);
};

let filtG = async () => {
  //    let price=document.querySelector(".product_price").value;
  let res = await fetch(`${api}?price_lte=4000`);
  res = await res.json();

  renderDom(res);
};
let filtL = async () => {
  let res = await fetch(`${api}?price_gte=4001`);
  res = await res.json();

  renderDom(res);
};
