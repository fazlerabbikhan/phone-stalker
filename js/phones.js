const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';

    if (searchText.length == 0) {
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.innerText = 'Please search by a name.'
        const searchResult = document.getElementById('search-result');
        searchResult.innerHTML = '';
        const phoneDetails = document.getElementById('phone-details');
        phoneDetails.innerHTML = '';
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(phones => displaySearchResult(phones.data.slice(0, 20)));
        errorMsg.innerText = '';
    }
}

// search results
const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = '';

    if (data.length == 0) {
        errorMsg.innerText = 'Please search by a valid name.'
    }
    else {
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
                    <p class="card-text">To know more, please click on details.</p>
                </div>
                <div onclick="loadPhoneDetails('${phone.slug}')" class="pb-2 d-flex justify-content-center">
                    <a class="fw-bold btn btn-outline-primary" role="button">Details</a>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
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
    phoneDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <img src="${details.image}" class="card-img-top" alt="...">
            <div class="card-body">
                    <h5 class="card-title">${details.name}</h5>
                    <h6 class="card-title">Manufactured by ${details.brand}</h6>
                    <h6 class="card-title">Main Features:</h6>
                    <p class="card-text">Chipset: ${details.mainFeatures?.chipSet ? details.mainFeatures.chipSet : 'Not found'}</p>
                    <p class="card-text">Display Size: ${details.mainFeatures?.displaySize ? details.mainFeatures.displaySize : 'Not found'}</p>
                    <p class="card-text">Memory: ${details.mainFeatures?.memory ? details.mainFeatures.memory : 'Not found'}</p>
                    <p class="card-text">Storage: ${details.mainFeatures?.storage ? details.mainFeatures.storage : 'Not found'}</p>
                    <h6 class="card-title">Sensors:</h6>
                    <p class="card-text">${details.mainFeatures?.sensors ? details.mainFeatures.sensors : 'Not found'}</p>
                    <h6 class="card-title">Others:</h6>
                    <p class="card-text">Bluetooth: ${details.others?.Bluetooth ? details.others.Bluetooth : 'Not found'}</p>
                    <p class="card-text">GPS: ${details.others?.GPS ? details.others.GPS : 'Not found'}</p>
                    <p class="card-text">NFC: ${details.others?.NFC ? details.others.NFC : 'Not found'}</p>
                    <p class="card-text">Radio: ${details.others?.Radio ? details.others.Radio : 'Not found'}</p>
                    <p class="card-text">USB: ${details.others?.USB ? details.others.USB : 'Not found'}</p>
                    <p class="card-text">WLAN: ${details.others?.WLAN ? details.others.WLAN : 'Not found'}</p>
                    <h6 class="card-title">Release Date:</h6>
                    <p class="card-text">${details?.releaseDate ? details.releaseDate : 'No release date found'}</p>
            </div >
    `;
    phoneDetails.appendChild(div);
}