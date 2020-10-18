const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const {validateBody, schemas} = require('../helpers/route-helpers');
const UserControler = require('../controllers/users');


const passportSignIN = passport.authenticate('local', {session: false});
const passportSecret = passport.authenticate('jwt', {session: false});



router.route('/signup').post(validateBody(schemas.signUpSchema), UserControler.signUp);

router.route('/signin')
    .post(validateBody(schemas.signInSchema), passportSignIN, UserControler.signIn);


router.route('/secret')
    .get(passportSecret, UserControler.secret);

module.exports = router;
