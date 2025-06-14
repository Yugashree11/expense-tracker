const categoryInput = document.getElementById("category");
const form = document.getElementById("expense-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

// Load saved expenses or start fresh
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateTotal() {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  totalDisplay.innerText = total.toFixed(2);
}

function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.desc} - ₹${item.amount} 
      <button onclick="deleteExpense(${index})">X</button>`;
    expenseList.appendChild(li);
  });
  updateTotal();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = descInput.value;
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  if (desc && !isNaN(amount)) {
    expenses.push({ desc, amount, category });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
    categoryInput.value = "";
    descInput.value = "";
    amountInput.value = "";
  }
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

renderExpenses();
li.innerHTML = `${item.desc} (${item.category}) - ₹${item.amount} 
  <button onclick="deleteExpense(${index})">X</button>`;
document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all expenses?")) {
      expenses = [];
      localStorage.removeItem("expenses");
      renderExpenses();
    }
  });