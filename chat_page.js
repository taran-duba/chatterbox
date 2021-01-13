const firebaseConfig = {
    apiKey: "AIzaSyC9x2dMZzfMyCF1grxjKRDbtaGakWqrxG4",
    authDomain: "chatter-cha.firebaseapp.com",
    databaseURL: "https://chatter-cha-default-rtdb.firebaseio.com",
    projectId: "chatter-cha",
    storageBucket: "chatter-cha.appspot.com",
    messagingSenderId: "269480653417",
    appId: "1:269480653417:web:2e0157a58971beb811e8f8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var username = localStorage.getItem("username");
  var room_name = localStorage.getItem("room_name");
  function send() {
    var msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:username,
        message:msg,
        like:0
    });
  }
  function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
          like: updated_likes
    });
}
  function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") { 
    firebase_message_id = childKey; 
    message_data = childData; 
    //Start code 
    console.log(message_data);
    name = message_data['name'];
    message = message_data['message'];
    like = message_data['like'];
    name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
    message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
    like_button = "<button class='btn btn-warning' id='" + firebase_message_id + "' value='" + like + "' onclick='updateLike(this.id)'>";
    span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Likes: " + like + "</span></button><hr>";
    row = name_with_tag + message_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;
    //End code 
  } }); }); } 
  getData();
function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}