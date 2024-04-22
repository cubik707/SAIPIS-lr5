class Company {
    constructor(id, name, country, email, quantity) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.email = email;
        this.quantity = quantity;
    }
}

let companies = [];

window.onload = function() {
    const storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
        companies = JSON.parse(storedCompanies);
        displayCompanies();
    }
}

function addCompany() {
    const id = companies.length + 1;
    const name = document.getElementById('companyName').value;
    const country = document.getElementById('country').value;
    const email = document.getElementById('email').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    const company = new Company(id, name, country, email, quantity);
    companies.push(company);

    localStorage.setItem('companies', JSON.stringify(companies));
    displayCompanies();
}

function displayCompanies() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    companies.forEach(company => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${company.id}</td>
            <td>${company.name}</td>
            <td>${company.country}</td>
            <td>${company.email}</td>
            <td>${company.quantity}</td>
        `;
    });
}

function clearForm() {
    document.getElementById("companyForm").reset();
}

function deleteCompany(){
    const id = parseInt(prompt("Введите ID записи, которую нужно удалить:"));
    companies.delete(id);
}