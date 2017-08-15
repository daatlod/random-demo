/*vars*/
var demoRan = {};
demoRan.user;
demoRan.choosed = '';
demoRan.selectItems = {};
demoRan.urlIamgesService = 'https://unsplash.it/';
demoRan.urlIamgesServiceList = demoRan.urlIamgesService+'list';

// Get a reference to the database service
var database = firebase.database();

/*Config auth firebase*/
initApp = function() {
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    var displayName = user.displayName;
	    	
	    user.getIdToken().then(function(accessToken) {
	     
	     	demoRan.user = 	displayName;
	     	demoRan.jsonImages();
	     	//demoRan.showSelect();     	
	      
	    });
	  } else {            

	    var uiConfig = {
	        signInSuccessUrl: 'index.html',
	        signInOptions: [
	          // Leave the lines as is for the providers you want to offer your users.
	          firebase.auth.GoogleAuthProvider.PROVIDER_ID
	          
	        ],
	        // Terms of service url.
	        tosUrl: '<your-tos-url>'
	     };

	    // Initialize the FirebaseUI Widget using Firebase.
	    var ui = new firebaseui.auth.AuthUI(firebase.auth());
	    // The start method will wait until the DOM is loaded.
	    ui.start('#firebaseui-auth-container', uiConfig);


	  }
	}, function(error) {
	  console.log(error);
	});
};

/*load json images*/
demoRan.jsonImages = function(){
	$.getJSON(demoRan.urlIamgesServiceList, function(result){
        demoRan.selectItems = result;
        demoRan.randomImages();        
    });
}

/*first step after login*/
demoRan.showSelect = function(){
	$('#account-details').text(demoRan.user);
	$('#selectBox').removeClass('hide');
	$('#loginBox').addClass('hide');	
}

/*generate random images from services*/
demoRan.randomImages = function(){
	var qy =  demoRan.selectItems.length;

	var randomNumberOne = Math.floor(Math.random() * qy);
	var randomNumberTwo = Math.floor(Math.random() * qy);

	if(randomNumberOne == randomNumberTwo){
		 randomNumberTwo = Math.floor(Math.random() * qy);
	}

	$('.image-one').html('<a href="#" class="nameOne" data-name="'+demoRan.selectItems[randomNumberOne].filename+'"><img src="'+demoRan.urlIamgesService+'200/300?image='+demoRan.selectItems[randomNumberOne].id+'" /><br><span class="text">'+ demoRan.selectItems[randomNumberOne].filename+'</span></a>');
	$('.image-two').html('<a href="#" class="nameOne" data-name="'+demoRan.selectItems[randomNumberTwo].filename+'"><img src="'+demoRan.urlIamgesService+'200/300?image='+demoRan.selectItems[randomNumberTwo].id+'" /><br><span class="text">'+ demoRan.selectItems[randomNumberTwo].filename+'</span></a>');

	demoRan.showSelect();

}

/*send data to database*/
demoRan.writeUserData  = function(userId, name, imageUrl) {
  firebase.database().ref('users/' + userId).set({
  	nameUser: name,    
    imageselect : imageUrl
  });
}

$(function() {

	initApp();

	$( document ).on( "click", "a.nameOne, a.nameTwo", function(e) {
		e.preventDefault();
		$('a.nameOne, a.nameTwo').addClass('noselect');
		$(this).removeClass('noselect');
		$(this).addClass('select');

  		demoRan.choosed =  $(this).data("name");
	});
	
	$( document ).on( "click", "a#sendResults", function(e) {
		e.preventDefault();
		if(demoRan.choosed == ''){
			alert('choose a image');
		}else{
			var userId = firebase.auth().currentUser.uid;
  			demoRan.writeUserData(userId, demoRan.user, demoRan.choosed);
  			$('#selectBox').addClass('hide');	
  			$('#thanksBox').removeClass('hide');		
		}
		
	});

	$('#another').on('click', function(e){
		e.preventDefault();
		$('#selectBox').removeClass('hide');	
  		$('#thanksBox').addClass('hide');
  		demoRan.choosed = '';
  		demoRan.randomImages();
	});
});



