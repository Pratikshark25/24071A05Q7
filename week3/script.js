
// PRODUCTS 
const products = [
  { name: "Shoes", price: 999, img: "https://images.pexels.com/photos/19090/pexels-photo.jpg" },
  { name: "Bag", price: 499, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQDsY1b1y3fo7fPJX-uXb35VhpA41VwUC4pw&s" },
  { name: "Watch", price: 1299, img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49" },
  { name: "T-Shirt", price: 299, img: "https://images.pexels.com/photos/6786614/pexels-photo-6786614.jpeg" },
  { name: "Sunglasses", price: 699, img: "https://images.pexels.com/photos/249210/pexels-photo-249210.jpeg" },
  { name: "Headphones", price: 899, img: "https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg" },
  { name: "Wallet", price: 399, img: "https://images.pexels.com/photos/910122/pexels-photo-910122.jpeg" }
];

// CART
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

//COMMON
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function showCount() {
  const c = document.getElementById("count");
  if (c) c.innerText = cart.length;
}

//REGISTER VALIDATION
function registerUser() {
  if (ruser.value === "" || rpass.value === "") {
    alert("All fields are required");
    return;
  }
  if (rpass.value.length < 4) {
    alert("Password must be at least 4 characters");
    return;
  }
  localStorage.setItem("user", ruser.value);
  localStorage.setItem("pass", rpass.value);
  alert("Registration Successful");
  location.href = "index.html";
}

//LOGIN VALIDATION 
function loginUser() {
  if (luser.value === "" || lpass.value === "") {
    alert("Please enter username and password");
    return;
  }
  if (
    luser.value === localStorage.getItem("user") &&
    lpass.value === localStorage.getItem("pass")
  ) {
    alert("Login Successful");
    location.href = "catalog.html";
  } else {
    alert("Invalid username or password");
  }
}

// CATALOG
function loadCatalog() {
  showCount();

  document.getElementById("items").innerHTML =
    products.map((p, i) => `
      <div class="col-md-3 mb-4">
        <div class="card h-100 text-center">
          
          <img 
            src="${p.img}" 
            class="card-img-top" 
            alt="${p.name}"
            style="height:180px; object-fit:cover;"
          >

          <div class="card-body">
            <h6 class="card-title">${p.name}</h6>
            <p class="card-text">₹${p.price}</p>
            <button 
              class="btn btn-primary btn-sm"
              onclick="addToCart(${i})">
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    `).join("");
}


function addToCart(i) {
  cart.push(products[i]);
  saveCart();
  showCount();
}

// CART VALIDATION 
function loadCart() {
  showCount();
  const div = document.getElementById("cartItems");

  if (cart.length === 0) {
    div.innerHTML = "<p class='text-center'>Cart is empty</p>";
    return;
  }

  div.innerHTML =
    cart.map((c, i) => `
      <div class="d-flex justify-content-between border p-2 mb-2">
        <span>${c.name}</span>
        <span>Rs. ${c.price}</span>
        <button class="btn btn-danger btn-sm"
          onclick="removeItem(${i})">X</button>
      </div>
    `).join("");
}

function removeItem(i) {
  cart.splice(i, 1);
  saveCart();
  loadCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }
  alert("Checkout successful");
  cart = [];
  localStorage.removeItem("cart");
  loadCart();
  showCount();
}
