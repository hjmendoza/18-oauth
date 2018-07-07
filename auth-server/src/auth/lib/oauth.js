'use strict';

import superagent from 'superagent';

import User from '../model';

const authorize = (req) => {
  let code = req.query.code;

  return superagent.post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send({
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.API_URL + '/oauth',
      grant_type: 'authorization_code',
    })
    .then(response => {
      let googleToken = response.body.access_token;
      return googleToken;
    })
    .then(token => {
      return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
        .set('Authorization', `Bearer ${token}`)
        .then(response => {
          let user = response.body;
          console.log('You are..', user);
          return user;
        });
    })
    .then(googleUser => {
      return User.createFromOAuth(googleUser);
    })
    .then(loggedInUser => {
      return loggedInUser.generateToken();
    })
    .catch(err => err);
};

export default {authorize};