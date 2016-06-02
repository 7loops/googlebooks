document.addEventListener("DOMContentLoaded", function() {

    var settings = {
        url: "https://www.googleapis.com/books/v1/volumes?",
        query: "javascript",
        orderBy: "newest",
        container: document.querySelector('.book-list'),
        HttpClient,
        maxChars: 200,
        maxResults: 20
    }

    gb = new GoogleBooks(settings);
    gb.getBooks();

});
