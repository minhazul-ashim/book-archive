const getSearchText = () => {

    let searchText = document.getElementById('search-input').value;

    loadData(searchText);
}

const loadData = async (search) => {

    const url = `http://openlibrary.org/search.json?q=${search}`
    const fetchResult = await fetch(url);
    const getResponse = await fetchResult.json();
    displayBooks(getResponse);

}

const authorExistence = (book) => {

    if (book.author_name !== undefined) {
        return book.author_name[0];
    } else {
        return 'Unknown'
    }
}

const firstPublishExist = (book) => {

    if (book.first_publish_year !== undefined) {
        return book.first_publish_year;
    } else {
        return 'Unknown'
    }
}

const displayBooks = (data) => {

    const bookList = data.docs;
    console.log(bookList)
    const booksContainer = document.getElementById('books-container');
    booksContainer.textContent = '';

    bookList.forEach(book => {

        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="col">
            <div class="card">
                <img class='img-fluid' src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="">
                    <div class="card-body">
                     <h3 class="card-title">${book.title}</h3>
                     <h6 class="card-text">Author: ${authorExistence(book)}</h6>
                     <h6 class="card-text">First Published: ${firstPublishExist(book)}</h6>
                    </div>
            </div>
        </div>
        `
        booksContainer.appendChild(newDiv);
    })
}