const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);

    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
        .then(res => res.json())
        .then(phones => displaySearchResult(phones.data))

    const displaySearchResult = data => {
        const searchResult = document.getElementById('search-result');
        data.forEach(phone => {
            console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h6 class="card-title">Manufactured by ${phone.brand}</h6>
                    <p class="card-text">To know about additional information, please click on details.</p>
                </div>
                <div class="pb-2 d-flex justify-content-center">
                    <a class="fw-bold btn btn-outline-primary"
                            href="https://www.linkedin.com/in/fazlerabbikhan/" role="button">Details</a>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
}