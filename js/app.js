/*vars*/
var demoRan = {};
demoRan.user;
demoRan.choosed;
demoRan.selectItems = {
						"data":[
							{"id":"r1", "name":"alment"},
							{"id":"r2","name":"chantilli"},
							{"id":"r3","name":"chocolat"},
							{"id":"r4","name":"coconut"},
							{"id":"r5","name":"apple"},
							{"id":"r6","name":"balcberry"},
							{"id":"r7","name":"kiwi"},
							{"id":"r8","name":"startfruit"},
							{"id":"r9","name":"raspberry"},
							{"id":"r10","name":"peanut"},
							{"id":"r11","name":"cheese"},
							{"id":"r12","name":"cream"}
						]	
					};					
					
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
	     	demoRan.showSelect();     	
	      
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


demoRan.showSelect = function(){
	$('#account-details').text(demoRan.user);
	demoRan.randomImages();
}

demoRan.randomImages = function(){
	var randomNumberOne = Math.floor((Math.random() * 12) + 1);
	var randomNumberTwo = Math.floor((Math.random() * 12) + 1);

	if(randomNumberOne == randomNumberTwo){
		 randomNumberTwo = Math.floor((Math.random() * 12) + 1);
	}

	$('.image-one').html('<a href="#" class="nameOne" data-name="'+demoRan.selectItems.data[randomNumberOne].name+'"><img src="images/'+ demoRan.selectItems.data[randomNumberOne].id+'.png" /><br>'+ demoRan.selectItems.data[randomNumberOne].name+'</a>');
	$('.image-two').html('<a href="#" class="nameTwo" data-name="'+demoRan.selectItems.data[randomNumberTwo].name+'"><img src="images/'+ demoRan.selectItems.data[randomNumberTwo].id+'.png" /><br>'+ demoRan.selectItems.data[randomNumberTwo].name+'</a>');

}


$(function() {

	initApp();

	$( document ).on( "click", "a.nameOne, a.nameTwo", function() {
  			demoRan.choosed =  $(this).data("name")
	});
});