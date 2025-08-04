var fuse;
var searchInput = document.getElementById("search-input");
var searchResults = document.getElementById("search-results");
var first = searchResults.firstChild;
var last = searchResults.lastChild;
var hasResults = false;

// load index
window.addEventListener("load", (_) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        if (data) {
          // fuse.js options; check fuse.js website for details
          let options = {
            shouldSort: true,
            location: 0,
            threshold: 0.6,
            distance: 100,
            ignoreLocation: false,
            keys: [
              'title',
              'summary',
              'tags',
              "categories"
            ]
          };
          fuse = new Fuse(data, options); // build the index from the json file
        }
      } else {
        console.log(xhr.responseText);
      }
    }
  };
  xhr.open('GET', "../index.json");
  xhr.send();
});

// execute search as each character is typed
searchInput.onkeyup = function (_) {
  if (fuse) {
    let results = fuse.search(this.value);
    if (results.length !== 0) {
      let resultSet = "";
      for (let item in results) {
        resultSet += `<li><a href="${results[item].item.permalink}" aria-label="${results[item].item.title}">
          <h1>${results[item].item.title}</h1><p>${results[item].item.summary}</p></a></li>`
      }
      searchResults.innerHTML = resultSet;
      hasResults = true;
      first = searchResults.firstChild.firstElementChild;
      last = searchResults.lastChild.firstElementChild;
    } else {
      searchResults.innerHTML = "";
      hasResults = false;
    }
  }
};

function clearSearch() {
  hasResults = false;
  searchResults.innerHTML = "";
  searchInput.value = "";
  searchInput.focus();
}

searchInput.addEventListener("search", (_) => {
  // clicked on x
  if (!this.value) {
    clearSearch();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key == "Escape") {
    clearSearch();
  } else if (event.key == "ArrowDown") {
    if (hasResults) {
      event.preventDefault();
      if (document.activeElement == searchInput) {
        first.focus();
      } else if (document.activeElement == last) {
        last.focus();
      } else {
        document.activeElement.parentElement.nextSibling.firstElementChild.focus();
      }
    }
  } else if (event.key == "ArrowUp") {
    if (hasResults) {
      event.preventDefault();
      if (document.activeElement == searchInput) {
        searchInput.focus();
      } else if (document.activeElement == first) {
        searchInput.focus();
      } else {
        document.activeElement.parentElement.previousSibling.firstElementChild.focus();
      }
    }
  } else if (event.key == "Enter") {
    if (hasResults) {
      event.preventDefault();
      if (document.activeElement == searchInput) {
        first.focus();
      } else {
        document.activeElement.click();
      }
    }
  }
});
