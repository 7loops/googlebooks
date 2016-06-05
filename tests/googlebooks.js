describe("GoogleBooks", function() {

  var Gb, settings = {
      url: "https://www.googleapis.com/books/v1/volumes?",
      query: "javascript",
      orderBy: "newest",
      container: document.querySelector('.book-list'),
      HttpClient:HttpClient,
      maxChars: 200,
      maxResults: 20
  };

  beforeEach(function() {
    Gb = new GoogleBooks(settings);
  });

  describe("populateData() should be called and receive response", function() {
    beforeEach(function(done) {
        spyOn(Gb, "populateData").and.callFake(function() {
            done();
        });
        Gb.getBooks();
    });

    it("the populateData() method gets called", function() {
        expect(Gb.populateData).toHaveBeenCalled();
    });

    it("populateData() method received array of items", function() {
        expect(Array.isArray(JSON.parse(Gb.populateData.calls.mostRecent().args).items)).toBeTruthy();
    });

    it("populateData() method received response of 20 items", function() {
        expect(JSON.parse(Gb.populateData.calls.mostRecent().args).items.length == 20).toBeTruthy();
    });
  });

  describe("truncateLenght() method should truncate string", function() {
    var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    it("string should be shorter that 200 characters", function() {
      var str = Gb.truncateLenght(text);
      // we add 3 characters for three dots we add at the end of the trunctated string
      expect(str.length).not.toBeGreaterThan(200 + 3);
    });

    it("string should be shorter that 100 characters", function() {
      Gb.maxChars = 100;
      var str = Gb.truncateLenght(text);
      // we add 3 characters for three dots we add at the end of the trunctated string
      expect(str.length).not.toBeGreaterThan(100 + 3);
    });

  });

});
