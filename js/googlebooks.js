var HttpClient = function() {
    this.get = function(url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4 && httpRequest.status == 200)
                callback(httpRequest.responseText);
        }
        httpRequest.open("GET", url, true);
        httpRequest.send(null);
    }
}

var GoogleBooks = function (settings) {
    this.url = settings.url + "q=" + settings.query + "&orderBy=" + settings.orderBy + "&maxResults=" + settings.maxResults;
    this.container = settings.container;
    this.HttpClient = new settings.HttpClient();
    this.maxChars = settings.maxChars;
    this.results = {};
}

GoogleBooks.prototype = {
    constructor: GoogleBooks,

    truncateLenght: function(dsc) {
        var dots = dsc.length > this.maxChars ? "..." : "";
        return dsc ? dsc.substr(0, Math.min(dsc.length, dsc.substr(0, this.maxChars).lastIndexOf(" "))) + dots : "/";
    },

    createItem: function(bookItem) {
        var div = document.createElement('div'),
            h2 = document.createElement('h2'),
            p = document.createElement('p'),
            img = document.createElement("img");

        h2.innerHTML = bookItem.volumeInfo.title ? bookItem.volumeInfo.title : '';
        p.innerHTML = this.truncateLenght(bookItem.volumeInfo.description);

        if (bookItem.volumeInfo.imageLinks) {
            img.setAttribute('src', bookItem.volumeInfo.imageLinks.smallThumbnail);
        }

        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        this.container ? this.container.appendChild(div) : null;
    },

    populateData: function(response) {
        this.results = JSON.parse(response);

        if (this.results && this.results.items) {
            this.results.items.forEach(this.createItem.bind(this));
        } else {
            this.container.innerHTML = "No results";
        }
    },

    getBooks: function() {
        this.HttpClient.get(this.url, this.populateData.bind(this));
    },
}
