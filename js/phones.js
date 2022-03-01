const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);

    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(phones => displaySearchResult(phones.data));
}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    data.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 shadow">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h6 class="card-title">Manufactured by ${phone.brand}</h6>
                <p class="card-text">To know about additional information, please click on details.</p>
            </div>
            <div onclick="loadPhoneDetails('${phone.slug}')" class="pb-2 d-flex justify-content-center">
                <a class="fw-bold btn btn-outline-primary"
                        href="#" role="button">Details</a>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadPhoneDetails = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(phones => displayPhoneDetails(phones.data));
}

const displayPhoneDetails = phone => {
    // console.log(phone);
}