const transactionForm = document.querySelector("form");
const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const typeInput = document.querySelector("#type");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");
const transactionList = document.querySelector("#transaction-list");
const balanceElement = document.querySelector(".balance-card p");
const incomeElement = document.querySelector(".income-card p");
const expenseElement = document.querySelector(".expense-card p");

let transactions = [];

transactionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value;
    const amount = amountInput.value;
    const type = typeInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;

    const transaction = {
        description: description,
        amount: Number(amount),
        type: type,
        category: category,
        date: date
    };

    transactions.push(transaction);
    displayTransactions();
    calculateTotals();
    transactionForm.reset();
});

function displayTransactions() {
    transactionList.innerHTML = "";

    transactions.forEach(function (transaction) {
        const listItem = document.createElement("li");

        console.log("Transaction type:", transaction.type);
        if (transaction.type === "income") {
            listItem.classList.add("income");
        } else {
            listItem.classList.add("expense");
        }

        const descriptionElement = document.createElement("strong");
        descriptionElement.textContent = transaction.description;

        const amountElement = document.createElement("span");
        amountElement.textContent = transaction.amount;

        const typeElement = document.createElement("span");
        typeElement.textContent = transaction.type;

        const categoryElement = document.createElement("span");
        categoryElement.textContent = transaction.category;

        const dateElement = document.createElement("span");
        dateElement.textContent = transaction.date;

        listItem.appendChild(descriptionElement);
        listItem.appendChild(amountElement);
        listItem.appendChild(typeElement);
        listItem.appendChild(categoryElement);
        listItem.appendChild(dateElement);

        transactionList.appendChild(listItem);
    });
}
function calculateTotals() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function (transaction) {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        }

        if (transaction.type === "expense") {
            totalExpense += transaction.amount;
        }
    });

    incomeElement.textContent = `BDT ${totalIncome.toFixed(2)}`;
    expenseElement.textContent = `BDT ${totalExpense.toFixed(2)}`;

    const balance = totalIncome - totalExpense;

    balanceElement.textContent = `BDT ${balance.toFixed(2)}`;
}