var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var error = document.querySelectorAll("p.error");
var visitBtn = document.getElementById("td.visitBtn");
var siteList;

if (localStorage.getItem("data") == null) {
  siteList = [];
} else {
  siteList = JSON.parse(localStorage.getItem("data"));
  display();
}

function submit() {
  var siteName = document.querySelector("#siteName").value;
  var siteUrl = document.querySelector("#siteUrl").value;
  if (checkName(siteName) && checkUrl(siteUrl)) {
    hideErrors();
    siteUrl = addHttp(siteUrl);
    var addSite = {
      name : document.getElementById("siteName").value,
      URl: document.getElementById("siteUrl").value,
    };
    siteList.push(addSite);
    localStorage.setItem("data", JSON.stringify(siteList));
    display();
    clearForm();
  }else {
    if (!checkName(siteName)) {
        showNameError("this name already exist");
    }
    if (!checkUrl(siteUrl)) {
        showNameError("this url already exist");
    }
    if (siteName == null || siteName == "") {
        showNameError("Name is required");
    }
    if (siteUrl == null || siteUrl == "") {
        showUrlError("Url Field is required");
    }
}

}

function display() {
  var box = ``;
  for (var i = 0; i < siteList.length; i++) {
    box += `                           
        <tr>
            <td><p>${siteList[i].name}</p></td>
            <td><a id="visitBtn" href=""  onclick="getvisit(${i})" target="_blank" ><button class="btn btn-primary">visit</button></a>
                <button class="btn btn-danger" onclick="deleteFun(${i})">delete</button> </td>
        </tr>`;
  }
  tableRow.innerHTML = box;
  hideErrors();
}

// function geturl(index)
// {
//  var getURLindex = siteList.indexOf(index);
//   console.log(getURLindex);

//   var visitVist = document.querySelector("#visitBtn");
//   visitVist.href=siteUrl(getURLindex);

// }

function getvisit(index)
{
  var getURL = siteUrl[index];
  var urlIndex = JSON.stringify(getURL);
  alert(urlIndex);
}




function deleteFun(index) {
  siteList.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(siteList));
  display();
}

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
}

function hideErrors() {
  for (var i = 0; i < error.length; i++)
   error[i].style.display = "none";

}



function checkName(name) {
  if (name == null || name == "") {
      return false;
  }
  for (var i = 0; i < siteList.length; i++) {
      if (siteList[i].name === name)
          return false;
  }
  return true;
}

function checkUrl(url) {
  if (url == null || url == "") {
      return false;
  }
  for (var i = 0; i < siteList.length; i++) {
      if (siteList[i].url === url)
          return false;
  }
  return true;
}



function showNameError(msg) {
  var nameError = document.getElementById('nameError');
  nameError.innerHTML = msg;
  nameError.style.display = 'block';
}

function showUrlError(msg) {
  var urlError = document.getElementById('urlError');
  urlError.innerHTML = msg;
  urlError.style.display = 'block';

}

function addHttp(url) {
  if (url.search("http://") == -1 && url.search("https://") == -1)
      return "http://" + url;
  return url;
}
