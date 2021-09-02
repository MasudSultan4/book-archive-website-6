// search Input fild 
const searchInput = document.getElementById('searchInput')
// search btn 
const searchBtn = document.getElementById('search-btn')
// error handalling
const errors = document.getElementById('error');
// book container 
const bookContainer = document.getElementById('book-container')

searchBtn.addEventListener('click',loadBook)


function loadBook(){
    const searchText = searchInput.value;
    // clear 
    searchInput.value = '';
    bookContainer.textContent = '';

    
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => displayBook(data.docs))
}

const displayBook = books => {
    // error handalling 
    // if(books == 404){
    //     errors.innerText = 'No result Found'
    // }
    // else{
    //     errors.innerText = ''
    // }
   books.forEach(book =>{
        console.log(book)
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
      <h5>Book-name: ${book.title}</h5>
      <p>Author-name: ${book.author_name[0]}</p>
      <h5>Publish-year: ${book.first_publish_year}</h5>
      <p>Publisher: ${book.publisher}</p>
      <button onclick="countryDetails('${book.key}')" class="btn btn-dark">Learn More</button>
    </div>
  `
  bookContainer.appendChild(div)
     })
}