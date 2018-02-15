// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
document.getElementById('openAll').addEventListener('click', openAll);
document.getElementById('clear').addEventListener('click', clearStorage);

// Save bookmark
function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if (!validateForm(siteName, siteUrl)){
        return false;
    }; 

    var bookmark = {
        name: siteName,
        url: siteUrl
    };

/*     // Local storage test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test')); 
*/

    // Test
    if(localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
        // Get Bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        // Re-set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    /* document.getElementById('myForm').reset(); */

    fetchBookmarks();
    
    // Prevent form from submitting
    e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i = 0; i < bookmarks.length;i++) {
        if(bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }

    // Re-set localstorage with the array spliced
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
    // Get Bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';

    // If bookmarks is not empty...
    if (bookmarks) {
        for(var i = 0; i < bookmarks.length;i++) {
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;
    
            bookmarksResults.innerHTML += '<div class="well">' +
                                            '<h3>' + name +
                                            '<a class="btn btn-default" target="_blank" href="' + url + '"> Visit </a>' +
                                            '<a onclick="deleteBookmark(\''+url+ '\')"class="btn btn-danger" href="#"> Delete </a>' 
                                            + '</he> </div>';
        }
    }
}

// Validate Form
function validateForm(siteName, siteUrl){
    if (!siteName || !siteUrl) {
        alert("Please, fill in the form");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert("Please, use a valid URL.");
        return false;
    }

    return true;
}

// Open every URL in storage (Not working on Chrome!)
function openAll(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    if(bookmarks) {
        bookmarks.forEach(bookmark => {
            window.open(bookmark.url);
        });
    }
}

// Clear the storage
function clearStorage(){
    localStorage.clear();
    fetchBookmarks();
}