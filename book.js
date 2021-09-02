// search btn 
const searchBtn = document.getElementById('search-btn')

// spinner
const spinner = document.getElementById('spinner');
// book container 
const bookContainer = document.getElementById('book-container')

searchBtn.addEventListener('click',loadBook)


function loadBook(){
    const errorDiv = document.getElementById("error");
    errorDiv.innerHTML = "";
    const searchTextInput = document.getElementById("search-text");
    const searchText = searchTextInput.value;

    // Handale empty search 
    if (searchText == 0) {
        errorDiv.innerHTML = `<h4 class="text-center">Search Field Cannot be Empty</h4>
        `;
    }
    else {
        spinner.classList.remove('d-none')
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displayBook(data.docs))
        .finally(() => spinner.classList.add('d-none'))
    }

    searchTextInput.value = "";
}

// Show Result 
const showResult = data => {

  const searchResultDiv = document.getElementById("error");
  searchResultDiv.innerHTML = '';


  if (data > 0) {
      searchResultDiv.innerHTML = ` <h2>Search Result : ${data.length} items </h2>`
  }
  else {
      searchResultDiv.innerHTML = ` <h3>No Items Found </h3>`
  }
}




const displayBook = data => {

  // Serch Item Result Here
  showResult(data.docs)

   data.forEach(book =>{
        console.log(book)
        const{title,author_name,first_publish_year,publisher} = book;

        const notFound = "Not-Found";
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        
        div.innerHTML = `
        <div class="rounded overflow-hidden border p-2">
      <img
        src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
        class="w-100"
        alt=""
      />
    </div>
    
    <div
      class="
        py-2
        d-flex
        justify-content-between
        align-items-center
        d-md-block
        text-md-center
      "
    >
      <h5>Book-name: <span class="text-info">${title?title:notFound}</span></h5>
      <p>Author-name: <span class="text-info">${author_name?author_name:notFound}</span> </p>
      <h5>Publish-year: <span class="text-info">${first_publish_year?first_publish_year:notFound}</span></h5>
      <p>Publisher: <span class="text-info">${publisher?publisher:notFound}</span></p>
    </div>
  `
  bookContainer.appendChild(div)
    })
  
  }