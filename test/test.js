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