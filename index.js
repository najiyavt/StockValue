
function handleFormSubmit(event){
    event.preventDefault();
    const productDetails = {
        price: event.target.price.value,
        product: event.target.product.value,
    };

    axios
      .post("https://crudcrud.com/api/082950f08b044c5880c6f6b9c5727351/products" , productDetails)
      .then((res) =>  showOnScreen(res.data))
      .catch((err) => console.log(err))
    
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
}

const h1 = document.createElement('h1')
h1.textContent = "Products";

const h2 = document.createElement('h2');
h2.id='totalPrice';
 //h2.textContent = 'Total Value Worth of Products: Rs 0';

document.body.append(h1);
document.body.append(h2);

let totalPrice = 0 ;

function updateTotalPrice(price){
    totalPrice += price;
    document.getElementById('totalPrice').textContent = `Total Value Worth of Products: Rs ${totalPrice}`;

}
function getData(){
    axios  
      .get("https://crudcrud.com/api/082950f08b044c5880c6f6b9c5727351/products")

      .then((res) => {
        const resData = res.data;
        
         resData.forEach((user) => {
            
            const ul=document.querySelector('ul');
            const li=document.createElement('li');

            const item = document.createTextNode(`${user.price} - ${user.product}  `);
            li.appendChild(item)

            //li.innerHTML=`${user.price} - ${user.product}`;

            const deleteBtn = document.createElement('button')
            deleteBtn.textContent= "Delete product";
            li.appendChild(deleteBtn)

            ul.appendChild(li);

            deleteBtn.addEventListener('click' , function(event) {
                ul.removeChild(event.target.parentElement)
    
                axios
                 .delete("https://crudcrud.com/api/082950f08b044c5880c6f6b9c5727351/products/${user._id}")
                 .then((data) => {
                    console.log(data);
                    updateTotalPrice(-parseInt(user.price)); 
                })
                 .catch((err) => console.log(err));
            })
            updateTotalPrice(parseInt(user.price));
         })
      })
      .catch((err) => console.log(err));
}

function showOnScreen(user){

    const ul=document.querySelector('ul');
    const li=document.createElement('li');

    // const item = document.createTextNode(`${user.price} - ${user.product}`);
    // li.appendChild(item);
    li.innerHTML=`${user.price} - ${user.product}`;


    const deleteBtn = document.createElement('button')
    deleteBtn.textContent= "Delete product";
    li.appendChild(deleteBtn)

    ul.appendChild(li);

    deleteBtn.addEventListener('click' , function(event) {
        ul.removeChild(event.target.parentElement)

        axios
          .delete("https://crudcrud.com/api/082950f08b044c5880c6f6b9c5727351/products/${user._id}")
          .then((data) => {
            console.log(data);
            updateTotalPrice(-parseInt(user.price));
          })
          .catch((err) => console.log(err));
        })
    }

getData();  
document.querySelector("form").addEventListener("submit", handleFormSubmit);
  




