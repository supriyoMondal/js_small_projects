const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];


//format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function addData(user) {
    data.push(user);
    updateDOM()
}

//Update Dom
function updateDOM(providedData = data) {
    main.innerHTML = ` <h2><strong>Person</strong>Wealth</h2>`;
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `
        <strong>${item.name}</strong> ${formatMoney(item.money)}
        `;
        main.appendChild(element);
    })
}

// fetch random user and add money
const getRandomUser = async () => {
    try {
        let res = await fetch('https://randomuser.me/api/');
        res = await res.json();
        const user = res.results[0];
        const newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000)
        }
        addData(newUser)
    } catch (error) {
        console.log(error.message);
    }
}

function doubleMoney() {
    data.forEach(item => {
        item.money = item.money * 2;
    })
    updateDOM();
}

function sortMoney() {
    data.sort((a, b) => a.money - b.money);
    updateDOM();
}
function filterMillionaires() {
    data = data.filter(_ => _.money >= 1000000);
    updateDOM();
}
function calculateWealth() {
    let total = data.reduce((acc, _) => acc += _.money, 0);

    let wealthEl = document.createElement('div');
    wealthEl.innerHTML = `
    <h3>Total Wealth
    <strong> ${formatMoney(total)} </strong>
    </h3>
    `;
    main.appendChild(wealthEl);
}



//add user
addUserBtn.addEventListener('click', getRandomUser)

doubleBtn.addEventListener('click', doubleMoney);

sortBtn.addEventListener('click', sortMoney);
showMillionairesBtn.addEventListener('click', filterMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth)

getRandomUser();
getRandomUser();
getRandomUser();