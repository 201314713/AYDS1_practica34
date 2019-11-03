const assert = require("assert");
const request = require("supertest");
const app= require("../src/app");

describe ("vista login",function(){
    it("shouldgets get login view", function(done){
        request(app).get('/')
        .expect(200,done)
    })
    
})

describe("prueba login", function(){
    it("should return success code ", function(done){
        request(app).post('/login') 
        .send({user_name: '5678920', password: 'perro'})
        .expect(302, done)
    })

    it("should return succes code but not redirect", function(done){
        request(app).post('/login') 
        .send({user_name: '923202', password: 'wrong_psw'})
        .expect(200, done)
    })

})


//prueba la vista de signup
describe ("vista signup",function(){
    it("should get the signup form", function(done){
        request(app).get('/signup')
        .expect(200,done)
    })
    
})



// prueba de post de los datos de signup 
describe("prueba signup", function(){
    it("should return success code ", function(done){
        request(app).post('/signup') 
        .send({nombre: 'Robert', apellido: 'Sheen',correo: 'test@gmail.com',no_cuenta:'100',password:'1234',dpi:"1235",saldo_inicial: 100})
        .expect(200, done)
    })

    it("should return succes code but not redirect", function(done){
        request(app).post('/signup') 
        .send({nombre: 'Robert', apellido: 'Sheen',correo: 'test2@gmail.com',no_cuenta:'100',password:'1234',dpi:"222",saldo_inicial: 100})
        .expect(200, done)
    })

})


describe("prueba de transferencia", function(){
    //En esta prueba se retorna HTTP code 302, porque la transferencia con exito redirecciona 
    it("should return redirect code ", function(done){
        request(app).post('/transferencia')
        .send({cuentaOrigen: 329320, cuentaDestino: 3239234, cantidad: 525.00, authToken: fjdiwerjfdsan02384})
        .expect(302, done )

    })

    //En esta prueba se retorna HTTP code 200, porque en caso de error no redirecciona se envio una cantidad incorrecta

    it("should return succes code ", function(done){
        request(app).post('/transferencia')
        .send({cuentaOrigen: 329320, cuentaDestino: 39329234, cantidad: -525.00, authToken: fjdiwerjfdsan02384})
        .expect(302, done )

    })

})


// prueba de post de los datos de signup 
/*describe("prueba cambio", function(){
    it("should expect the change", function(done){
        request(app).get('/cambio') 
        .expect(200, done())
    })
    it("should fail expecting the change", function(done){
        request(app).get('/cambio') 
        .expect(200, done)
    })

})
*/


describe("Obtener Saldo ",() =>{
    it("Handles GET request /home/saldo",  function(done){
        request(app).get('/home/saldo')
        .expect(200,done)
    });
    it("no se encuentra /home/saldo",  function(done){
        request(app).get('/home/saldo')
        .expect(404,done)
    });
});
