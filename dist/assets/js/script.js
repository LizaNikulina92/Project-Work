// BASKET TYPE 0: start at line 4
// decommentare TYPE 0; commentare TYPE 1, TYPE 2, TYPE 3
// commentare selectedList() alla riga 38
let selectedArr = [];

// BASKET TYPE 1: start at line 9 
// decommentare TYPE 1; commentare TYPE 0, TYPE 2, TYPE 3
// decommentare selectedList() alla riga 38
/* let arrProducts = [
    {name: "The Lord of the Rings", price: "50.50", imported: 'no', category: "books"},
    {name: "Game of Thrones", price: "25.00", imported: 'no', category: "books"},
    {name: "Music CD", price: "10.00", imported: 'no', category: "other"},
    { name: "Chocolate bar", price: "9.99", imported: 'no', category: "food"}
]; */

// BASKET TYPE 2: start at line 19
// decommentare TYPE 2; commentare TYPE 0, TYPE 1, TYPE 3
// decommentare selectedList() alla riga 38
/* let selectedArr = [
    {name: "Chocolate bar", price: "9.99", imported: 'yes', category: "food"},
    {name: "Bottle of perfume", price: "50.50", imported: "yes", category: "other"}]; */

// BASKET TYPE 3: start at line 26
// decommentare TYPE 3; commentare TYPE 0, TYPE 1, TYPE 2
// decommentare selectedList() alla riga 38
/* let selectedArr= [
    {name: "Bottle of perfume", price: "50.50", imported: "yes", category: "other"},
    {name: "Bottle of perfume", price: "50.50", imported: "no", category: "other"},
    {name: "Headache pills", price: "15.00", imported: 'no', category: "medical-products"},
    {name: "Box of chocolates", price: "14.99", imported: 'yes', category: "food"},
    {name: "Box of chocolates", price: "14.99", imported: 'yes', category: "food"},
    {name: "Box of chocolates", price: "14.99", imported: 'yes', category: "food"}
]; */

document.addEventListener("DOMContentLoaded", function () {
    console.log('prova')
    productCard();
    /* selectedList(); */ //decommentare per utilizzare TYPE 1, TYPE 2, TYPE 3
    genReceipt();
})


let urlAPI = 'https://instilla-sales-tax-problem.s3.eu-central-1.amazonaws.com/sales-tax-problem-test.json';
let allProduct = fetch(urlAPI).then(response => response.json());

function productCard() {
    allProduct.then(arrProducts => {
        arrProducts.forEach(element => {
            let allCardsContainer = document.querySelector('#products');
            let cardContainer = document.createElement('div');
            cardContainer.className = 'col';
            allCardsContainer.append(cardContainer);
            let card = document.createElement('div');
            card.className = 'card';
            cardContainer.append(card);
            let cardImg = document.createElement('img');
            cardImg.className = 'card-img-top';
            cardImg.src = element.image;
            card.append(cardImg);
            let cat = document.createElement('div');
            cat.className = 'alert';
            cat.setAttribute('value', `${element.category}`)
            cat.innerText = element.category;
            card.append(cat);
            let cardBody = document.createElement('div');
            cardBody.className = 'card-body bg-light';
            card.append(cardBody);
            let cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.innerText = element.name;
            cardBody.append(cardTitle);
            let price = document.createElement('p');
            price.className = 'card-text';
            price.innerText = `$ ${element.price}`;
            cardBody.append(price);
            let checkCont = document.createElement('div');
            checkCont.className = 'form-check';
            cardBody.append(checkCont);
            let checkInput = document.createElement('input');
            checkInput.className = 'form-check-input';
            checkInput.id = 'imported-product';
            checkInput.type = 'checkbox';
            checkCont.append(checkInput);
            let checkLabel = document.createElement('label');
            checkLabel.className = 'form-check-label';
            checkLabel.setAttribute('for', 'imported-product');
            checkLabel.innerText = 'Apply import duty';
            checkCont.append(checkLabel);
            let btn = document.createElement('button');
            btn.className = 'btn btn-primary mt-3';
            btn.type = 'button';
            btn.innerText = 'Add to cart';
            btn.onclick = function () {
                if (checkInput.checked === true) {
                    element.imported = 'yes';
                } else {
                    element.imported = 'no';
                }
                newProd = JSON.parse(JSON.stringify(element));
                selectedArr.push(newProd);
                selectedList();
            }
            cardBody.append(btn);
        })
    })
}


function selectedList() {
    let tBody = document.querySelector('#selected-list');
    tBody.innerHTML = '';

    selectedArr.forEach(element => {
        let tr = document.createElement('tr');
        tBody.append(tr);
        let tTitle = document.createElement('th');
        tTitle.setAttribute('scope', 'row');
        tTitle.innerText = element.name;
        tr.append(tTitle);
        let tDuty = document.createElement('td');
        tDuty.innerText = element.imported;
        tr.append(tDuty);
        let tPrice = document.createElement('td');
        tPrice.innerText = `$ ${(+element.price + +taxCalc()).toFixed(2)}`;
        tPrice.className = 'prod-price text-center';
        tr.append(tPrice);
        let tTax = document.createElement('td');
        function taxCalc() {
            if (element.imported === 'yes') {
                if (element.category === 'other') {
                    let tax = +element.price * 0.15;
                    let resTax = Math.round(tax.toFixed(3) * 100) / 100;
                    return resTax.toFixed(2);
                } else {
                    let tax = +element.price * 0.05;
                    let resTax = Math.round(tax.toFixed(3) * 100) / 100;
                    return resTax.toFixed(2);
                }
            } else {
                if (element.category === 'other') {
                    let tax = +element.price * 0.1;
                    let resTax = Math.round(tax.toFixed(3) * 100) / 100;
                    return resTax.toFixed(2);
                } else {
                    let tax = +element.price * 0;
                    let resTax = Math.round(tax.toFixed(3) * 100) / 100;
                    return resTax.toFixed(2);
                }
            }
        }
        tTax.innerText = `$ ${taxCalc()}`;
        tTax.className = 'prod-tax text-end';
        tr.append(tTax);
        let delBtn = document.createElement('td');
        delBtn.className = 'text-end'
        tr.append(delBtn);
        let btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-danger btn-sm';
        btn.onclick = function () {
            let index = selectedArr.indexOf(element);
            selectedArr.splice(index, 1);
            selectedList();
        }
        delBtn.append(btn);
        let btnIcon = document.createElement('i');
        btnIcon.className = 'bi bi-trash';
        btn.append(btnIcon);
    })
}

function genReceipt() {
    let totPriceReceipt = document.querySelector('#tot-price');
    let totTaxReceipt = document.querySelector('#tot-tax');
    document.querySelector('#total-btn').addEventListener("click", function () {
        let sumPrice = [];
        let prices = document.querySelectorAll('.prod-price');
        for (item of prices) {
            item = Number(item.innerHTML.replace(/[^0-9\.]+/g, ""));
            sumPrice.push(item);
        }
        let totPrice = 0;
        for (let i = 0, n = sumPrice.length; i < n; i++) {
            totPrice += sumPrice[i];
        }
        totPriceReceipt.innerHTML = totPrice.toFixed(2);

        let sumTax = [];
        let taxes = document.querySelectorAll('.prod-tax');
        for (item of taxes) {
            item = Number(item.innerHTML.replace(/[^0-9\.]+/g, ""));
            sumTax.push(item);
        }
        let totTax = 0;
        for (let i = 0, n = sumTax.length; i < n; i++) {
            totTax += sumTax[i];
        }
        totTaxReceipt.innerHTML = totTax.toFixed(2);
    })
}

function enableBtn() {
    document.querySelector('#total-btn').disabled = false;
}

function disableBtn() {
    document.querySelector('#total-btn').disabled = true;
}
