var create_paste_btn = document.getElementById('create_paste_submit');
var redMessage1 = document.getElementById('aRedMessage');
var pasteAuthor = document.getElementById('paste_as');
var pasteAuthorPic = document.getElementById('theSmallProfilePicture');
var PasteBody = document.getElementById('main_paste');
var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                  'Sep', 'Oct', 'Nov', 'Dec'];

pasteAuthor.oninput = function () {
  if (pasteAuthor.value.toLowerCase() === "founder" || pasteAuthor.value.toLowerCase() === "arunava") {
    create_paste_btn.disabled = true;
  } else {
    create_paste_btn.disabled = false;
  }
}

PasteBody.oninput = function () {

  if (PasteBody.value === "") {
    create_paste_btn.disabled = true;
  } else {
    create_paste_btn.disabled = false;
  }
}

if (PasteBody.value === "") {
  create_paste_btn.disabled = true;
}
function aRedMessageToggler() {
    if(pasteAuthor.value === 'Anonymous' || pasteAuthor.value === "") {
        redMessage1.style.display = 'block';
    } else {
        redMessage1.style.display = 'none';
    }
}

create_paste_btn.onclick = function() {
  create_paste_btn.innerHTML = "Pasting...";
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {

    if(request.readyState === XMLHttpRequest.DONE){
      if(request.status === 200){
          console.log(request.response);
          create_paste_btn.innerHTML = "Create New Paste";
          window.location = "/pastes/"+request.response;
      } else {
        alert("Some Internal Error Occured!\nPlease Try Again Later!");
        create_paste_btn.innerHTML = "Create New Paste";
      }
    }
  };

  var pasteBody = PasteBody.value;
  var pasteTitle = document.getElementById('paste_title').value;
  var pasteAuthor = document.getElementById('paste_as').value;
  var pasteAuthorLink = "/ui/blank-profile-picture.png";
  var anonPaste = false;

  if(pasteTitle === ""){
      pasteTitle = "Untitled";
  }

  if(pasteAuthor === ""){
      pasteAuthor = "Anonymous";
      anonPaste = true;
  }

  if(pasteAuthorPic !== null){
      pasteAuthorLink = pasteAuthorPic.src;
  }

  var pasteTime = new Date();
  pasteTime = pasteTime.getDate() + " " + monthNames[pasteTime.getMonth()] + ", " + pasteTime.getFullYear();

  request.open('POST', '/create-paste', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({PasteBody: pasteBody,
                              PasteTitle: pasteTitle,
                              PasteAuthor: pasteAuthor,
                              PasteTime:   pasteTime,
                              AnonPaste:   anonPaste,
                              PasteAuthorLink: pasteAuthorLink
  }));
};
