const express = require('express');
const router = express.Router();//generador de rutas

const controllers = require('../controllers/controllers');

router.get('/',controllers.index);
router.get('/login',controllers.index);
router.post('/login',controllers.login);
router.get('/signup',controllers.signup);
router.post('/signup',controllers.sign);
router.get('/home/dashboard',controllers.dashboard);
router.get('/logout',controllers.logout);
router.get('/profile',controllers.profile);
router.get('/deposito',controllers.deposito);
router.post('/deposito',controllers.deposito);


//Ejemplo para llamar : http://localhost:3000/cambiodia
router.get('/cambio', controllers.cambiodia);

// Ejemplo para llamar: http://localhost:3000/cambiorango?fecha=06/11/2019
// fecha es la fecha inicial
router.get('/cambiorango', controllers.cambiorango);



//router.post('/addDesc',controllers.saveDesc)

module.exports = router;