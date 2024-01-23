/**
 *  Conversations Token
 *
 *  This Function shows you how to mint Access Tokens for Twilio Conversations. Please note, this is for prototyping purposes
 *  only. You will want to validate the identity of clients requesting Access Token in most production applications and set
 *  the identity when minting the Token.
 *
 *  Pre-requisites
 *  - Create a Chat Service (https://www.twilio.com/docs/api/chat/rest/services)
 *   - Create an API Key (https://www.twilio.com/console/runtime/api-keys)

https://www.twilio.com/docs/conversations/create-tokens

*/

exports.handler = function (context, event, callback) {
  const AccessToken = require('twilio').jwt.AccessToken;
  const ChatGrant = AccessToken.ChatGrant;
  
  // Used when generating any kind of tokens
  // To set up environmental variables, see http://twil.io/secure
  const twilioAccountSid = context.ACCOUNT_SID;
  const twilioApiKey = context.API_KEY;
  const twilioApiSecret = context.API_SECRET;
  
  // Used specifically for creating Chat tokens
  const serviceSid = context.CHAT_SERVICE_SID;
  const identity = 'test@rfmconvsample.com';
  
  // Create a "grant" which enables a client to use Chat as a given user,
  // on a given device
  const chatGrant = new ChatGrant({
    serviceSid: serviceSid,
  });
  
  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    {identity: identity}
  );
  
  token.addGrant(chatGrant);
  
  // Serialize the token to a JWT string
  console.log(token.toJwt());
  

  const response = new Twilio.Response();

  /*
   * Uncomment these lines for CORS support
   * response.appendHeader('Access-Control-Allow-Origin', '*');
   * response.appendHeader('Access-Control-Allow-Methods', 'GET');
   * response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
   */

  response.appendHeader('Content-Type', 'application/json');
  response.setBody({ token: token.toJwt() });
  callback(null, response);
};
