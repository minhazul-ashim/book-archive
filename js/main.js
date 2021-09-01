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
};

const publisherExistence = (book) => {

    if (book.publisher !== undefined) {
        return book.publisher;
    } else {
        return 'Unknown'
    }
}

const resultCount = (dis, total, shown) => {

    document.getElementById('total-result').innerText = total;
    document.getElementById('shown-result').innerText = shown;
    document.getElementById('result-count').style.display = dis;
}

const errorMessage = (dis) => {

    document.getElementById('no-result').style.display = dis;
}

const displayBooks = (data) => {

    const bookList = data.docs;
    console.log(data)
    const booksContainer = document.getElementById('books-container');
    booksContainer.textContent = '';
    errorMessage('none')
    resultCount('none')

    if (data.numFound === 0) {

        errorMessage('block')

    } else {
        bookList.forEach(book => {

            const newDiv = document.createElement('div');
            newDiv.innerHTML = `
            <div class="col h-100">
                <div class="card h-100">
                    <img class='img-fluid' src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="">
                        <div class="card-body">
                         <h3 class="card-title">${book.title}</h3>
                         <h6 class="card-text">Author: ${authorExistence(book)}</h6>
                         <h6 class="card-text">Publisher: ${publisherExistence(book)}</h6>
                         <h6 class="card-text">First Published: ${firstPublishExist(book)}</h6>
                        </div>
                </div>
            </div>
            `
            booksContainer.appendChild(newDiv);
            resultCount('block', data.numFound, bookList.length)
        });
    }
}
