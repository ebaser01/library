
  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyACulQsS6spGz1Ap3XCEyY5RCdFm5wY9TY",
    authDomain: "form1-4b490.firebaseapp.com",
    databaseURL: "https://form1-4b490-default-rtdb.firebaseio.com/",
    storageBucket: "form1-4b490.appspot.com"
  };
  firebase.initializeApp(config);
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // Get a reference to the database service
  
  
var messagesRef = firebase.database().ref('messages');



var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],

};

firebase.auth().onAuthStateChanged(function(user) {
  if (user != null) {
    this.name = user.displayName;
    this.uid = user.uid;
    userId = user.uid;
    logout.style.display = 'block';
    addbutton.style.display = 'flex'; 
    local.style.display = 'none'; 
    userName.innerHTML = 'User: ' + this.name;
    updateDisplay();
  } else {
    ui.start('#firebaseui-auth-container', uiConfig);
    this.name = "Unknown";
    logout.style.display = 'none';
    addbutton.style.display = 'none';
    updateDisplay();
  }
});


// The start method will wait until the DOM is loaded.

var userId;
mymodal = document.getElementById('mymodal');
lib = document.getElementById('lib');
const login = document.getElementById('login');
const logout = document.getElementById('logged');
const userName = document.getElementById('user-name');
const addbutton = document.getElementsByClassName('add')[0];
const local = document.getElementById('local-storage');



document.getElementById('logout').addEventListener('click', function(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
});


addbutton.addEventListener('click', function(){

    mymodal.style.display = 'block';

});

document.getElementById('addForm').addEventListener('submit',submitForm);

function submitForm(e){
  e.preventDefault();

  
  var title = getInputVal('title');
  var author = getInputVal('author');
  var pageNumber = getInputVal('pageNumber');
  var read = getInputVal('read');

  saveMessage(title,author,pageNumber,read);
  updateDisplay();
  mymodal.style.display = 'none';
}

function getInputVal(id){
  if(id!='read'){
    return document.getElementById(id).value;
  }
  else{
    return document.getElementById(id).checked;
  }
}

function saveMessage(title,author,pageNumber,read){
  var newMessageRef = messagesRef.child(userId).push();
  newMessageRef.set({
    title: title,
    author:author,
    pageNumber:pageNumber,
    read:read
  });
}

window.onmousedown = function(event){
    if(event.target == mymodal){
        mymodal.style.display = 'none';
    }  
    
}

function updateDisplay(){
  var user = firebase.auth().currentUser;
  lib.innerHTML = '';
  if(user != null){
    messagesRef.child(userId).on("value", function(snapshot){
      
      snapshot.forEach(function (childSnapshot){

          var data = childSnapshot.val();
          
          var newBook = bookSkeleton;
          newBook.id = childSnapshot.key;
          newBook.querySelector('.cardAuthor').innerHTML = data.author;
          newBook.querySelector('.cardTitle').innerHTML = data.title;
          newBook.querySelector('.cardpageNum').innerHTML = data.pageNumber;
          if(data.read == true){
            newBook.querySelector('.readText').innerHTML = 'Finished';
            newBook.querySelector('.slider-button').checked = true;
            newBook.querySelector('.cardRead').style.backgroundColor = ' rgb(0, 255, 0)';
          }
          else{
            newBook.querySelector('.slider-button').checked = false;
            newBook.querySelector('.readText').innerHTML = 'Not finished';
            newBook.querySelector('.cardRead').style.backgroundColor = 'red';
          }
          
          lib.appendChild(newBook.cloneNode(true));
          var liblength=(document.getElementsByClassName('slider-button')).length;
          (document.getElementsByClassName('slider-button'))[liblength-1].addEventListener('change',function(){updateReadStatus(this.parentNode.parentNode.parentNode.parentNode.id);});
          (document.getElementsByClassName('del-button'))[liblength-1].addEventListener('click',function(){deleteBook(this.parentNode.parentNode.id);});
        })
    });
    
  }
  
}
function deleteBook(bookid){
  console.log('hello');
  messagesRef.child(userId).child(bookid).remove();
  updateDisplay();
}

function updateReadStatus(bookid){
  var updateRef = messagesRef.child(userId).child(bookid);
  var status = document.getElementById(bookid).querySelector(".slider-button").checked;
  updateRef.update({
    read:status
  });
  updateDisplay();
}

const bookSkeleton = document.createElement('div');
bookSkeleton.className = 'book';

const imgdiv = document.createElement('div');
imgdiv.className = 'del-div';
const delbutton = document.createElement('button');
delbutton.className = 'del-button';
const img = document.createElement('img');
img.src = './delete.svg';
img.className = 'delete-icon';
delbutton.appendChild(img);
imgdiv.appendChild(delbutton);
const authorName = document.createElement('p');
authorName.className = 'cardAuthor';
const pTitle = document.createElement('p');
pTitle.className = 'cardTitle';
const pageNum = document.createElement('p');
pageNum.className = 'cardpageNum';
const readStatus = document.createElement('p');
readStatus.className = 'cardRead';
readStatus.innerHTML = '<div class="switch-button"><label class="switch"><input type="checkbox" class="slider-button"><span class="slider round"></span></label></div>';


bookSkeleton.appendChild(pTitle);
bookSkeleton.appendChild(authorName);
bookSkeleton.appendChild(pageNum);

readText = document.createElement('div')
readText.className = 'readText';
readStatus.insertBefore(readText, readStatus.firstChild);

bookSkeleton.appendChild(readStatus);
bookSkeleton.appendChild(imgdiv);