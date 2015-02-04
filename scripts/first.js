var headlineList = document.querySelector(".headline-list");
var ref = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
var itemRef;


ref.on("value", function(snapshot) {
  var storyList = snapshot.val();
  console.log(storyList.length);
  if (headlineList.length < 101) {

    /*for (var i=0; i < storyList.length; i++) {
      createStory(storyList[i]);
    }*/

    storyList.forEach(function(entry) {
      createStory(entry);
    });
  }


}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

function createStory(itemNo) {
  /*Issue 452449 affects the fetch() API messages in the console in Chrome.*/

  var url = "https://hacker-news.firebaseio.com/v0/item/" + itemNo + ".json";
  fetch(url)
    .then(handleResponse)
    .then(handleJSON)
    .catch();
}

function handleResponse(response) {
  if (response.status === 200 || response.status === 0) {
    return response.json();
  }
}

function handleJSON(json) {
  console.log(json.title + "--" + json.text);
  var myLi = document.createElement('li');
  myLi.className = "headline";
  myLi.textContent = "" + json.title + "";
  headlineList.appendChild(myLi);
}


ref.on("child_added", function(snapshot) {
  var storyItem = snapshot.val();
  createStory(storyItem);
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});
