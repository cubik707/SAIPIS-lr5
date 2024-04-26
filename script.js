class Company {
    constructor(id, name, country, email, quantity) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.email = email;
        this.quantity = quantity;
    }

    displayCompany() {
        const row = document.createElement('tr');
        row.setAttribute('id', `row_${this.id}`);
        row.innerHTML = `
            <td>${this.id}</td>
            <td>${this.name}</td>
            <td>${this.country}</td>
            <td>${this.email}</td>
            <td>${this.quantity}</td>
            `;

        // Добавляем отображение новых свойств, если они есть
        for (const key in this) {
            if (this.hasOwnProperty(key) && key !== 'id' && key !== 'name' && key !== 'country' && key !== 'email' && key !== 'quantity') {
                row.innerHTML += `<td>${this[key]}</td>`;
            }
        }

        return row;
    }
}

let companies = new Map();
let newPropertyName = '';

window.onload = function () {
    const storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
        const storedCompaniesArray = JSON.parse(storedCompanies);
        storedCompaniesArray.forEach(companyData => {
            const company = new Company(companyData.id, companyData.name, companyData.country, companyData.email, companyData.quantity);
            companies.set(company.id, company);
        });
    }
}

function addCompanyToLocalStorage(company) {
    let storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
        const existingCompanies = JSON.parse(storedCompanies);
        existingCompanies.push(company);
        localStorage.setItem('companies', JSON.stringify(existingCompanies));
    } else {
        localStorage.setItem('companies', JSON.stringify([company]));
    }
}

function addCompany() {
    let id = 1;
    if (companies.size > 0) {
        id = Math.max(...companies.keys()) + 1;
    }
    const name = document.getElementById('companyName').value;
    const country = document.getElementById('country').value;
    const email = document.getElementById('email').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    let company;
    debugger
    if(newPropertyName){
        const newProperty = document.getElementById(newPropertyName).value;
        company = new Company(id, name, country, email, quantity, newProperty);

    } else{
        company = new Company(id, name, country, email, quantity);
    }

    companies.set(company.id, company);

    addCompanyToLocalStorage(company);

    const tableBody = document.getElementById('tableBody');
    tableBody.appendChild(company.displayCompany());
}

function displayCompanies() {
    console.log(companies)
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    companies.forEach(company => {
        tableBody.appendChild(company.displayCompany());
    });
}

function clearForm() {
    document.getElementById("companyForm").reset();
}

function deleteCompany() {
    const id = parseInt(prompt("Введите ID записи, которую нужно удалить:"));
    if (companies.has(id)) {
        companies.delete(id);
        document.getElementById(`row_${id}`).remove();
        localStorage.setItem('companies', JSON.stringify([...companies.values()]));
        displayCompanies();
    } else {
        alert("Компания с указанным ID не найдена.");
    }
}

function showCountriesByQuantity() {
    const countryQuantities = new Map();


    companies.forEach(company => {
        if (countryQuantities.has(company.country)) {
            countryQuantities.set(company.country, countryQuantities.get(company.country) + company.quantity);
        } else {
            countryQuantities.set(company.country, company.quantity);
        }
    });


    const sortedCountries = Array.from(countryQuantities.entries())
        .sort((a, b) => b[1] - a[1]) // Сортируем по убыванию количества продукции
        .map(entry => entry[0]); // Получаем только названия стран

    alert("Страны по количеству продукции:\n" + sortedCountries.join("\n"));
}

function addNewProperty() {
    newPropertyName = document.getElementById("newProperty").value;
    if (!newPropertyName) {
        alert("Пожалуйста, введите название и значение нового свойства.");
        return;
    }
    const newPropertyFieldHTML = `
        <label for="newProperty">Введите ${newPropertyName}:</label>
        <input type="text" id=${newPropertyName}>
    `;
    document.querySelector('.btn-wrapper').insertAdjacentHTML('beforebegin', newPropertyFieldHTML);
    debugger

    Company.prototype[newPropertyName] = '';
    companies.forEach(company => {
        company[newPropertyName] = ''; // Добавляем новое свойство в объекты компаний со значением по умолчанию
    });


    // Добавляем новый заголовок в таблицу
    const tableHead = document.querySelector('#companyTable thead tr');
    const newHeaderCell = document.createElement('th');
    newHeaderCell.textContent = newPropertyName;
    tableHead.appendChild(newHeaderCell);

// Добавляем новую ячейку для каждой компании в таблице
    companies.forEach(company => {
        const newPropertyValue = '';
        const newRowCell = document.createElement('td');
        newRowCell.textContent = newPropertyValue;
    });
    document.getElementById('newProperty').value = '';
}


