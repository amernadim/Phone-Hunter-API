const loadData = async(searchText , dataLimit) => {
  const url =` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   const res = await fetch(url);
   const data = await res.json();
   displayData(data.data, dataLimit);
}

const displayData = (phones, dataLimit) => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';
  // display 10 phones only
  const showAll = document.getElementById('show-all');
  if(dataLimit && phones.length > 10) {
    phones = phones.slice(0,10);
    showAll.classList.remove('d-none');
  } else {
    showAll.classList.add('d-none');
  }
  
  // display no phone found
  const noPhone = document.getElementById('no-found-message');
  if(phones.length === 0){
    noPhone.classList.remove('d-none')
  } else {
    noPhone.classList.add('d-none')
  }

  // display all phone
  phones.forEach(element => {
    // console.log(element);
    const {image,brand,phone_name,slug} = element;
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col')
    phoneDiv.innerHTML = `  
      <div class="card p-3">
        <img src="${image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
           <h5 class="card-title">${phone_name}</h5>
           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
           <!-- Button trigger modal -->
           <button onclick="loadPhoneDetails('${slug}')" class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
        
        </div>
      </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });
  // stop spinner
  toggleSpinner(false);
}

const processSearch = (dataLimit) => {
  // spinner
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText =  searchField.value ;
  loadData(searchText,dataLimit);
  // searchField.value = '';
}
// handle search button click
document.getElementById('btn-search').addEventListener('click',function(){
  // console.log("btn-click");
  // start spinner
  processSearch(10);
}) 

// search inpit field enter key handler
document.getElementById("search-field").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      processSearch(10)
    }
});

const toggleSpinner = isLoading => {
  const spinnerSection = document.getElementById('spinner');
  if(isLoading){
    spinnerSection.classList.remove('d-none');
  }else {
    spinnerSection.classList.add('d-none');
  }
}
// not the best way to show all
document.getElementById('btn-show-all').addEventListener('click',function(){
  processSearch();
})

const loadPhoneDetails = id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data =>  displayPhoneDetails(data.data))
  // console.log(url);
}

const displayPhoneDetails = phone => {
    // console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const modalPhoneDetails = document.getElementById('modalPhoneDetails');
    modalPhoneDetails.innerHTML = `
    <img src="${phone.image}" alt="">
    <p>Release Date : ${phone.releaseDate ? phone.releaseDate :  "No Relese Date Found"}</p>
    <p>Display Size : ${phone.mainFeatures.displaySize}</p>
    <p>Memory : ${phone.mainFeatures.memory}</p>
    <p>Sensors : ${phone.mainFeatures.sensors}</p>
    <p>Storage : ${phone.mainFeatures.storage}</p>
    <p></p>
    `;

}


loadData('phone')