// Початкові тестові дані (ID, Name, Description, Price, Date Added)
let products = [
    { id: "101", name: "Ноутбук", desc: "15-дюймовий робочий ноутбук", price: 25000, date: "2026-09-01" },
    { id: "102", name: "Мишка", desc: "Бездротова оптична миша", price: 600, date: "2026-09-10" }
];

document.addEventListener("DOMContentLoaded", () => {
    // Прив'язка обробників подій до кнопок
    document.getElementById('saveBtn').addEventListener('click', saveProduct);
    document.getElementById('clearBtn').addEventListener('click', clearForm);
    document.getElementById('sortNameBtn').addEventListener('click', () => sortProducts('name'));
    document.getElementById('sortPriceBtn').addEventListener('click', () => sortProducts('price'));

    // Первинне відображення таблиці
    renderTable();
});

function renderTable() {
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = '';
    products.forEach((p, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.desc}</td>
                <td>${p.price}</td>
                <td>${p.date}</td>
                <td>
                    <button onclick="editProduct(${index})">Редагувати</button>
                    <button onclick="deleteProduct(${index})">Видалити</button>
                </td>
            </tr>
        `;
    });
}

function saveProduct() {
    const editIdx = parseInt(document.getElementById('editIndex').value);
    const id = document.getElementById('productId').value.trim();
    const name = document.getElementById('productName').value.trim();
    const desc = document.getElementById('productDesc').value.trim();
    const priceVal = document.getElementById('productPrice').value;
    const date = document.getElementById('productDate').value;
    const errorDiv = document.getElementById('errorMsg');

    errorDiv.innerText = '';

    // Обов'язкові поля не можуть бути порожніми
    if (!id || !name || !desc || !priceVal || !date) {
        errorDiv.innerText = 'Усі поля є обов\'язковими для заповнення!';
        return;
    }

    // Ціна має бути числом і не може бути від'ємною
    const price = parseFloat(priceVal);
    if (isNaN(price) || price < 0) {
        errorDiv.innerText = 'Ціна має бути невід\'ємним числом!';
        return;
    }

    // Перевірка унікальності ID при додаванні нового товару
    if (editIdx === -1 && products.some(p => p.id === id)) {
        errorDiv.innerText = 'Товар з таким ID вже існує!';
        return;
    }

    if (editIdx === -1) {
        products.push({ id, name, desc, price, date });
    } else {
        products[editIdx] = { id, name, desc, price, date };
    }

    clearForm();
    renderTable();
}

function editProduct(index) {
    const p = products[index];
    document.getElementById('editIndex').value = index;
    document.getElementById('productId').value = p.id;
    document.getElementById('productId').disabled = true; // Заборона зміни ID
    document.getElementById('productName').value = p.name;
    document.getElementById('productDesc').value = p.desc;
    document.getElementById('productPrice').value = p.price;
    document.getElementById('productDate').value = p.date;
}

function deleteProduct(index) {
    products.splice(index, 1);
    renderTable();
}

function sortProducts(field) {
    if (field === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (field === 'price') {
        products.sort((a, b) => a.price - b.price);
    }
    renderTable();
}

function clearForm() {
    document.getElementById('editIndex').value = -1;
    document.getElementById('productId').value = '';
    document.getElementById('productId').disabled = false;
    document.getElementById('productName').value = '';
    document.getElementById('productDesc').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDate').value = '';
    document.getElementById('errorMsg').innerText = '';
}