const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(phones => displaySearchResult(phones.data.slice(0, 20)));
}

// search results
const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';

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
                <p class="card-text">To know additional information, please click on details.</p>
            </div>
            <div onclick="loadPhoneDetails('${phone.slug}')" class="pb-2 d-flex justify-content-center">
                <a class="fw-bold btn btn-outline-primary" role="button">Details</a>
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
        .then(phone => displayPhoneDetails(phone.data));
}

// phone details
const displayPhoneDetails = details => {
    console.log(details);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <img src="${details.image}" class="card-img-top" alt="...">
            <div class="card-body">
                    <h5 class="card-title">${details.name}</h5>
                    <h6 class="card-title">Sensors:</h6>
                    <p class="card-text">${details.mainFeatures.sensors}</p>
                    <h6 class="card-title">Others:</h6>
                    <p class="card-text">Bluetooth: ${details.others.Bluetooth}</p>
                    <p class="card-text">GPS: ${details.others.GPS}</p>
                    <p class="card-text">NFC: ${details.others.NFC}</p>
                    <p class="card-text">Radio: ${details.others.Radio}</p>
                    <p class="card-text">USB: ${details.others.USB}</p>
                    <p class="card-text">WLAN: ${details.others.WLAN}</p>
                    <p class="card-text">Release Date: ${details.releaseDate}</p>
            </div>
    `;
    phoneDetails.appendChild(div);
}