const controller={};



controller.index = function(req, res){
    var message = '';
  res.render('login',{message: message});
};

//se agrego el codigo de sing up
controller.signup = function(req, res){
	message = '';
	if(req.method == "POST"){
	   //post data
  
	} else {
	   res.render('signup');
	}
 };


 controller.login = function(req, res){
	var message = '';
	var sess = req.session; 
  
	if(req.method == "POST"){
	   var post  = req.body;
	   var name= post.user_name;
	   var pass= post.password;
	  
	   var sql="SELECT * FROM `user` WHERE `no_cuenta`='"+name+"' and password = '"+pass+"'";                           
	   req.getConnection((err, conn) => {
		conn.query(sql, function(err, results){      
		  if(results.length){
			 req.session.userId = results[0].iduser;
			 req.session.user = results[0];
			 console.log(results[0].iduser);
			 //res.redirect('/home/dashboard');
			
			 res.redirect('/home/dashboard');
			 
		  }
		  else{
			 message = 'Wrong Credentials.';
			 res.render('login.ejs',{message: message});
		  }
				  
	   });
		});
	} else {
	   res.render('login.ejs',{message: message});
	}         
 };


 function EmailValido(mail) { 
	return /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail); 
  }
  
  function validarCuenta(numero){
	return (/^([0-9])*$/.test(numero) );
  }

  function validarDPI(dpi){
	  longitud = dpi.length==13;
	  return (/^([0-9])*$/.test(dpi) && longitud);
  }

  function validarNombres(nombre){
	return /^[A-Z]+$/i.test(nombre);
  }

  function ValidarPass(pass){
	return pass.length>5;
  }


  controller.sign = function(req, res){
	message = '';

	   var post  = req.body;
	   var account= post.account;
	   var pass= post.password;
	   var fname= post.first_name;
	   var lname= post.last_name;
	   var mail= post.mail;
	   var dpi= post.dpi;
	   var saldo =post.saldo;
  
	   if ( validarDPI(dpi) && EmailValido(mail) && validarCuenta(account) &&  validarNombres(fname) && validarNombres(lname) && ValidarPass(pass))
		{
	   var sql = "INSERT INTO `user`(`nombre`,`apellido`,`correo`,`no_cuenta`, `password`, `dpi` , `saldo_inicial`) VALUES ('" + fname + "','" + lname + "','" + mail + "','" + account + "','" + pass  + "','" + dpi + "','" + saldo + "')";
	   req.getConnection((err, conn) => {
	
		conn.query(sql, function(err, result) {
			if (!err){
		  message = "Succesfully! Your account has been created.";
		  res.render('login.ejs',{message: message});
			}
			else
			message = "Wrong! There were errors";
			console.log(message);
		  res.render('signup.ejs',{message: message});
			
	   });
	});
	}else
		{
			        message = "Wrong! There were errors: ";
					if (!EmailValido(mail))
						message = message + " invalid email";
					if (!validarDPI(dpi))
						message = message + " invalid DPI";
					if (!validarCuenta(account))
						message = message + " invalid account";
					if (!validarNombres(fname))
						message = message + " invalid name";
					if (!validarNombres(lname))
						message = message + " invalid last name";
					if (!ValidarPass(pass))
						message = message + " invalid password to short";
						console.log(message);
						res.render('signup.ejs',{message: message});
		}


};


controller.dashboard = function(req, res, next){
	
	var user =  req.session.user,
	userId = req.session.userId;
	
	if(userId == null){
		res.redirect("/login");
		return;
	}
	 
		   res.render('index.ejs', {user:user});	  

};

controller.logout = function(req, res, next){
	
	req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });  

};






controller.cambio = function(req, res, next){
	

	var sql = "SELECT * from banco";
	req.getConnection((err, conn) => {
 
	 conn.query(sql, function(err, result) {
		 if (!err){
	   message = "Succesfull";
	   //res.render('login.ejs',{message: message});
		 }
		 else
		 message = "Wrong! There were errors";
	   //res.render('signup.ejs',{message: message});
		 console.log(err);
	});
 });
	

};


controller.profile = function(req, res){
	var user =  req.session.user,
	userId = req.session.userId;
	res.render('profile',{user: user});
};





controller.deposito = function(req, res){
	message = '';
	var user =  req.session.user,
	userId = req.session.userId;
	if(req.method == "POST"){
		var post  = req.body;
		var cuenta = post.cuenta;
		var deposito = post.deposito;
	
		var sql = "SELECT saldo_inicial FROM user WHERE no_cuenta = '" + userId+ "';";
		   req.getConnection((err, conn) => {
		
			conn.query(sql, function(err, result) {
				if (!err){

					console.log("resultado: " + result[0].saldo_inicial +" - " +deposito);
					if (result[0].saldo_inicial > deposito )
					{
						var sql = "CALL transaccion(" + userId+ "," + cuenta + "," +deposito+ ");";
		   				req.getConnection((err, conn) => {
		
							conn.query(sql, function(err, result) {
								if (!err){
									message = "Transacción exitosa";

								}
								else
								{
									message = "Error en transacción";

								}
		   					});
						});



					}
					else
					{
						message = "Transacción no realizada: No hay suficientes fondos";

					}
		 			 res.render('deposito.ejs',{message: message});

				}
				else
				message = "Error en transacción";
				res.render('deposito.ejs',{message: message});

				
				console.log(err);
		   });
		});
} else {
	res.render('deposito',{user: user,message:message});
 }
};


 module.exports = controller;