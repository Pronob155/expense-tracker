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
let editingTransactionId = null;

transactionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const description = descriptionInput.value;
    const amount = amountInput.value;
    const type = typeInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;

    const transaction = {
        id: Date.now(),
        description: description,
        amount: Number(amount),
        type: type,
        category: category,
        date: date
    };

    if (editingTransactionId === null) {
        transactions.push(transaction);
    } else {
        const transactionIndex = transactions.findIndex(function (item) {
            return item.id === editingTransactionId;
        });

        transactions[transactionIndex] = transaction;

        editingTransactionId = null;
    }

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

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.classList.add("delete-btn");

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.type = "button";
        editButton.classList.add("edit-btn");

        editButton.addEventListener("click", function () {
            editingTransactionId = transaction.id;

            descriptionInput.value = transaction.description;
            amountInput.value = transaction.amount;
            typeInput.value = transaction.type;
            categoryInput.value = transaction.category;
            dateInput.value = transaction.date;
        });

        deleteButton.addEventListener("click", function () {
            const transactionIndex = transactions.findIndex(function (item) {
                return item.id === transaction.id;
            });

            transactions.splice(transactionIndex, 1);

            displayTransactions();
            calculateTotals();
        });

        listItem.appendChild(descriptionElement);
        listItem.appendChild(amountElement);
        listItem.appendChild(typeElement);
        listItem.appendChild(categoryElement);
        listItem.appendChild(dateElement);
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
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