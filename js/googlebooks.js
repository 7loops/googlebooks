var HttpClient = function() {
    this.get = function(url, callback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                callback(anHttpRequest.responseText);
        }
        anHttpRequest.open("GET", url, true);
        anHttpRequest.send(null);
    }
}

var GoogleBooks = function (settings) {
    this.url = settings.url + "q=" + settings.query + "&orderBy=" + settings.orderBy + "&maxResults=" + settings.maxResults;
    this.container = settings.container;
    this.HttpClient = new settings.HttpClient();
    this.maxChars = settings.maxChars;
}

GoogleBooks.prototype = {
    constructor: GoogleBooks,

    truncateLenght: function(dsc) {
        return dsc ? dsc.substr(0, Math.min(dsc.length, dsc.substr(0, this.maxChars).lastIndexOf(" "))) : "/";
    },

    createItem: function(v) {
        var div = document.createElement('div'),
            h2 = document.createElement('h2'),
            p = document.createElement('p'),
            img = document.createElement("img");

        h2.innerHTML = v.volumeInfo.title ? v.volumeInfo.title : '';
        p.innerHTML = this.truncateLenght(v.volumeInfo.description);

        if (v.volumeInfo.imageLinks) {
            img.setAttribute('src', v.volumeInfo.imageLinks.smallThumbnail);
        }

        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        this.container.appendChild(div);
    },

    populateData: function(response) {
        var results = JSON.parse(response);

        if (results && results.items) {
            results.items.forEach(this.createItem.bind(this));
        } else {
            this.container.innerHTML = "No results";
        }
    },

    getBooks: function() {
        this.HttpClient.get(this.url, this.populateData.bind(this));
    },
}
