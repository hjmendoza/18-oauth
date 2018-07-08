'use strict';

import superagent from 'superagent';

import User from '../model';

const authorize = (req) => {
  let code = req.query.code;
  console.log(code)

  return superagent.post('https://api.dropboxapi.com/1/oauth2/token')
    .type('form')
    .send({
      code: code,
      client_id: process.env.DROPBOX_CLIENT_ID,
      client_secret: process.env.DROPBOX_CLIENT_SECRET,
      redirect_uri: process.env.API_URL + '/oauth2/authorize',
      grant_type: 'authorization_code',
    })
    .then(response => {
      console.log(response);
      let dropboxToken = response.body.access_token;
      console.log('we got here', dropboxToken);
      return dropboxToken;
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