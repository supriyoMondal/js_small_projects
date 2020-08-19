const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const text = document.getElementById('text');
const form = document.getElementById('form');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     { id: 1, text: 'Flower', amount: -20 },
//     { id: 2, text: 'Salary', amount: 300 },
//     { id: 3, text: 'Book', amount: -10 },
//     { id: 4, text: 'Camera', amount: 150 }
// ]

let localStorageTransaction = JSON.parse(localStorage.getItem('item')) || [];

const getRandomId = () => Math.floor(Math.random() * 10000000);

let transactions = localStorageTransaction;

function removeTransaction(id) {
    transactions = transactions.filter(_ => _.id != id);
    init();

    localStorage.setItem('item', JSON.stringify(transactions));

}

function addTransaction(e) {
    e.preventDefault()

    if (!amount.value || !text.value) return;

    let transaction = {
        id: getRandomId(),
        text: text.value,
        amount: +amount.value
    }
    transactions.push(transaction);
    localStorage.setItem('item', JSON.stringify(transactions));
    addTransactionDOM(transaction);
    updateValues();

    text.value = '';
    amount.value = '';
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
    let sign = transaction.amount > 0 ? '+' : '-';

    const item = document.createElement('li');

    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

    item.innerHTML = `
    ${transaction.text}
          <span>${sign}${Math.abs(transaction.amount)}</span>
          <button class="delete-btn"
          onclick="removeTransaction(${transaction.id})"
          >x</button>
    `;

    list.appendChild(item);
}

//update the balance income expense
function updateValues() {
    const amounts = transactions.map(_ => _.amount);
    const total = amounts.reduce((acc, i) => acc += i, 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, i) => acc += i, 0)
        .toFixed(0);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc, i) => acc += i, 0) * -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

//Init app
function init() {
    list.innerHTML = '';
    transactions.forEach(transaction => addTransactionDOM(transaction));
    updateValues();
}
init();

form.addEventListener('submit', addTransaction)