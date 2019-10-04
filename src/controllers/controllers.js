const controller={};



controller.index = function(req, res){
    var message = '';
  res.render('login',{message: message});
};

controller.signup = function(req, res){
	message = '';
	if(req.method == "POST"){
	   //post data
  
	} else {
	   res.render('signup');
	}
 };






 module.exports = controller;