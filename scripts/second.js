var headlineList = document.querySelector(".headline-list");
var itemRef;


function createStory() {
  /*Issue 452449 affects the fetch() API messages in the console in Chrome.*/

  var url = "https://www.reddit.com/r/batman/.json?limit=5";
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
  console.log(json);
  //console.log(json.data.children[0].data.title);
  var data = json.data;
  var mainData = json.data.children;
  var mainDataSize = mainData.length;


  for (var i=0; i < mainDataSize; i++){
    console.log(mainData[i].data.title);
    var theAuthor = mainData[i].data.author;
    var theTitle = mainData[i].data.title;
    var theSubReddit = mainData[i].data.subreddit;
    var theNumOfComments = mainData[i].data.num_comments;
    var theURL = mainData[i].data.url;
    var theOver18Rating = mainData[i].data.over_18;
    var theId = mainData[i].data.id;

    var myLi = document.createElement('li');
    myLi.className = "headline";
    myLi.id = theId;
    myLi.setAttribute("data-subreddit", theSubReddit);
    myLi.setAttribute("data-title", theTitle);

    myLi.innerHTML = "<div class=\"story\"><div class=\"title\">"+theTitle+"</div><div class=\"details\">by <a href=\"http://www.reddit.com/u/"+theAuthor+"\" class=\"reddituser\">"+theAuthor+"</a> to <a href=\"http://www.reddit.com/r/"+theSubReddit+"\" class=\"\">/r/"+theSubReddit+"</a>. <a href=\"\">"+theNumOfComments+" comments</a>.</div></div>";
  //myLi.addEventListener('click', function(){ handleClick(theId, theSubReddit); }, false);
  myLi.onclick = function(){
    console.log('--ID is '+theId+" and the real ID is: "+this.id+", and subReddit is "+this.dataset.subreddit+"--");
    handleClick(this.id, this.dataset.title, this.dataset.subreddit);
  }
    var checkNSFW = (mainData[i].data.over_18 === false) ? headlineList.appendChild(myLi): console.log('nsfw post');
  }

}

function handleClick(theId, theTitle, theSubReddit){
  console.log('--ID is '+theId+" and the Title is: "+theTitle+", and subReddit is "+theSubReddit+"--");
  var url = "https://www.reddit.com/r/"+theSubReddit+"/comments/"+theId+".json";
  fetch(url)
  .then(handleResponse)
  .then(handleComments)
  .catch();
}

function handleComments(json){
  console.log(json);
  var obj = json[1];
  console.log(obj);
  var mainData = obj.data.children;
  var mainDataSize = mainData.length;

  for (var i=0; i< mainDataSize; i++){
    var body = mainData.data.body;
    var author = mainData.data.author;

    if (replies ==""){
      //add to parent
      addComment(rootCommentList);
    } else {
      //recursive
      addComment();
    }

  }

}

function addComment(dataList, el){
  var comment = dataList.data.body;
  var user = dataList.data.author;
  var replies = dataList.data.replies;

  var newLi = document.createElement("li");
  newLi.innerHTML = "<span class=\"comment-username\">"+user+"</span>"+comment+"";

  if (replies ==""){
      el = document.querySelector(".comments-list");
      el.appendChild(newLi);
    } else {
      el = newLi;
      var newDataList = dataList.replies.children;
      addComment(newDataList, el);
    }
}

/*function handleJSON(json) {
  console.log(json);
  //console.log(json.data.children[0].data.title);
  var data = json.data;
  var dataChildren = json.data.children;

  dataChildren.forEach(function (entry){
    console.log(entry.data.title);
    var myLi = document.createElement('li');
    myLi.className = "headline";
    myLi.innerHTML = "<div class=\"story\"><div class=\"title\">"+entry.data.title+"</div><div class=\"details\">by <a href=\"\" class=\"reddituser\">username</a> to <a href=\"\" class=\"\">/r/batman</a></div></div>";
    if (entry.data.over_18 == false) ? headlineList.appendChild(myLi): break;
  });

}*/

createStory();
