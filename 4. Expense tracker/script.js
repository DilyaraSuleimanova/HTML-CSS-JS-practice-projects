const balanceElement = document.getElementById("balance");
const incomeAmountElement = document.querySelector(".income-amount");
const expenseAmountElement = document.querySelector(".expense-amount");
const transactionListElement = document.getElementById("transaction-list");
const transactionFormElement = document.getElementById("transaction-form");
const descriptionElement = document.getElementById("description");
const amountElement = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormElement.addEventListener("submit", addTransaction);

function addTransaction(e) {
    e.preventDefault();

    const description = descriptionElement.value.trim();
    const amount = parseFloat(amountElement.value);

    transactions.push({
        id:Date.now(),
        description,
        amount,
    })

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionFormElement.reset();
}

function updateTransactionList() {
    transactionListElement.innerHTML = "";

    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach((transaction) => {
        const transactionElement = createTransactionElement(transaction);
        transactionListElement.appendChild(transactionElement);
    });
}

function createTransactionElement(transaction) {
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>${formatCurrency(transaction.amount)}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        </span>
    `;

    return li;
}

function updateSummary() {
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    const income = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expenses = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    balanceElement.textContent = formatCurrency(balance);
    
    if (balance < 0) {
        balanceElement.style.color = "#e61818";
    } else {
        balanceElement.style.color = "#249d28";
    }
    balanceElement.textContent = formatCurrency(balance);
    incomeAmountElement.textContent = formatCurrency(income);
    expenseAmountElement.textContent = formatCurrency(expenses !== 0 ? -expenses : expenses);
}

function formatCurrency(number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KZT",
    }).format(number);
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    localStorage.setItem("transactions", JSON.stringify(transactions));
    
    updateTransactionList();
    updateSummary();
}

updateTransactionList();
updateSummary();