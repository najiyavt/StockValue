const ul = document.querySelector('ul');

function handleFormSubmit(event) {
    event.preventDefault();
    const productDetails = {
        price: event.target.price.value,
        product: event.target.product.value,
    };

    axios
        .post("https://crudcrud.com/api/18970b7f1a9d44c4b0f6d23511305001/products", productDetails)
        .then((res) => {
            getData();
        })
        .catch((err) => console.log(err));
}

function getData() {
    axios
        .get("https://crudcrud.com/api/18970b7f1a9d44c4b0f6d23511305001/products")
        .then((res) => {
            showOnScreen(res.data);
            updateTotalPrice(res.data);
        })
        .catch((err) => console.log(err));
}

const h1 = document.createElement('h1');
h1.textContent = "Products";

let totalPrice = 0;
const h2 = document.createElement('h2');
h2.textContent = `Total Value Worth of Products: Rs ${totalPrice}`;
h2.id = 'totalPrice';

document.body.appendChild(h1);
document.body.appendChild(h2);

function updateTotalPrice(products) {
    totalPrice = 0;
    products.forEach((product) => {
        totalPrice += parseInt(product.price);
    });
    document.getElementById('totalPrice').textContent = `Total Value Worth of Products: Rs ${totalPrice}`;
}

function showOnScreen(user) {
    ul.innerHTML = '';
    user.forEach((data) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <label>${data.price} -</label> 
        <label>${data.product}</label> 
        <button class='deleteBtn' data-id="${data._id}">Delete</button>
        <button class='editBtn' data-id="${data._id}">Edit</button>
        <div class='editForm' style="display: none;">
            <input type='text' class='editPrice' value="${data.price}">
            <input type='text' class='editProduct' value="${data.product}">
            <button class='saveBtn' data-id="${data._id}">Save</button>
            <button class='cancelBtn' data-id="${data._id}">Cancel</button>
        </div>
        `;
        ul.appendChild(li);
    });

    document.querySelectorAll('.deleteBtn').forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', () => {
            const p = deleteBtn.getAttribute("data-id");
            deleteProduct(p);
        });
    });

    ul.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('editBtn')) {
            const editForm = target.nextElementSibling;
            editForm.style.display = "block";
        } else if (target.classList.contains('saveBtn')) {
            const editForm = target.parentElement;
            const productId = target.getAttribute('data-id');
            const newPrice = editForm.querySelector('.editPrice').value;
            const newProduct = editForm.querySelector('.editProduct').value;
            saveChanges(productId, newPrice, newProduct);
        } else {
            const editForm = target.parentElement;
            editForm.style.display = "none";
        }
    });
}

function saveChanges(productId, newPrice, newProduct) {
    const updatedProductDetails = {
        price: newPrice,
        product: newProduct,
    };
    axios
        .put(`https://crudcrud.com/api/18970b7f1a9d44c4b0f6d23511305001/products/${productId}`, updatedProductDetails)
        .then((response) => {
            getData();
            console.log("Product updated successfully...");
        })
        .catch((error) => console.log(error));
}

function deleteProduct(productId) {
    axios
        .delete(`https://crudcrud.com/api/18970b7f1a9d44c4b0f6d23511305001/products/${productId}`)
        .then((response) => {
            getData();
        })
        .catch((error) => console.log(error));
}

window.addEventListener("DOMContentLoaded", getData);
form.addEventListener("submit", handleFormSubmit);
document.querySelector("form").addEventListener("submit", handleFormSubmit);
