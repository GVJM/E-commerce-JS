// Products Section




const dBProducts = [
    {id:0, name: 'Iphone X', category:'eletronic',price:4999.99, img:'assets/images/products/iphone.jpg'},
    {id:1, name: 'Poco X3 Pro', category:'eletronic',price:1399.99, img:'assets/images/products/x3pro.jpg'},
    {id:2, name: 'Samsung S20', category:'eletronic',price:2999.99, img:'assets/images/products/s20.webp'},
    {id:3, name: 'Notebook Lenovo', category:'eletronic',price:3599.99, img:'assets/images/products/notebookLenovo.webp'},
    {id:4, name: 'Computador Básico', category:'eletronic',price:2999.99, img:'assets/images/products/computadorb1.png'},
    {id:5, name: 'GTX 1050 TI', category:'eletronic',price:1319.99, img:'assets/images/products/gtx1050ti.jpg'}
];

function generateProduct(product, index, arr){
    console.log(product);
    let newDiv = document.createElement('div');
    newDiv.classList.add('col');
    if(product.name.length>16){
        newDiv.innerHTML=`
        <div class="card">
            <div class='product-img-div mx-auto'>
                <img src=${product.img} class="product-img my-auto" alt="${product.name} image.">
            </div>
            <div class="card-body">
                <h5 class="card-title fs-6">${product.name}</h5>
                <p class="card-text">R$ ${product.price}</p>
                <button data-product-id='${product.id}' class="btn btn-addToCart btn-outline-warning">Adicionar ao carrinho</button>
            </div>
        </div>`
    }else{
        newDiv.innerHTML=`
        <div class="card">
            <div class='product-img-div mx-auto'>
                <img src=${product.img} class="product-img my-auto" alt="${product.name} image.">
            </div>
            <div class="card-body">
                <h5 class="card-title fs-6">${product.name}<br><br></h5>
                <p class="card-text">R$ ${product.price}</p>
                <button data-product-id='${product.id}' class="btn btn-addToCart btn-outline-warning">Adicionar ao carrinho</button>
            </div>
        </div>`
    };
    document.querySelector(`.${product.category}ProductsContainer`).appendChild(newDiv);
};

dBProducts.forEach(generateProduct);

// Cart Section

// HTML elements and other variables
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.querySelector('.cart-modal');
const cartModalClose = document.querySelector('.cart-close');
const productsSection = document.querySelector('#products');
const addToCartBtns = document.querySelectorAll('.btn-addToCart');
const cartForm = document.getElementById('cart-form');
const cartTotal = document.getElementById('cart-total');
let cartList = [];


// Cart Functions
function cartToggle(){
    cartModal.classList.toggle('hidden');
    productsSection.classList.toggle('hidden');
};



cartModalClose.addEventListener('click',cartToggle);
cartBtn.addEventListener('click',cartToggle);
function generateCartDiv(product, index, arr){
    let newDiv = document.createElement('div');
    newDiv.innerHTML=`
    <div class="row container-flex mt-1 flex-wrap g-0">
        <div class="badge bg-white text-dark align-middle fs-5 text-wrap text-center border fw-normal  col-md-8">${product.name}</div>
        <div class='col col-md-2'>
            <input type="number" value="1" min='0' id='${product.id}' name='${product.name}' class="form-control text-center form-input" placeholder="Qnt." aria-label="Quantidade" aria-describedby="basic-addon2">
        </div>
        <button type="button" data-product-id=${product.id} class="col col-md-2 btn btn-outline-danger btn-cart-remove ">Remover</button>
    </div>`;
    cartForm.appendChild(newDiv);
    let cartRmvBtns =  document.querySelectorAll('.btn-cart-remove');
    cartRmvBtns.forEach(removeCartItemEventFunc)
        // function(){btn.addEventListener('click',removeCartItem())});
};

function updateCart (){
    cartForm.innerHTML=`<form id='cart-form'></form>`
    cartList.forEach(generateCartDiv);
    
};

function addToCartEventFunc(button, index, arr){
    let productId = button.getAttribute('data-product-id');
    button.addEventListener('click', function(){
        let item = dBProducts.find(product => product.id  == productId);
        if(!cartList.includes(item)){cartList.push(item);};
        console.log(cartList);
        updateCart();
        updateTotal();
    });
};

function removeCartItemEventFunc(button, index, array){
    button.addEventListener('click',function(){
        cartList= cartList.filter( product => product.id !== Number(button.getAttribute('data-product-id')));
        updateCart();
        updateTotal();
    })
};

addToCartBtns.forEach(addToCartEventFunc);



function updateTotal(){
    let formInput = document.querySelectorAll('.form-input');
    let total = 0;
    formInput.forEach((element,indice)=>total+= Number(element.value)*dBProducts.find(product => product.id  == Number(element.id)).price);
    console.log(total);
    total=total.toFixed(2);
    cartTotal.innerHTML =`Total: R$ ${total}`;
}

cartForm.addEventListener('click',updateTotal);