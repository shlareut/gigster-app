// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
import twilio from 'twilio';

const accountSid = 'ACc57f5db4f999461d156799b56a816338';
const authToken = 'c9996642442c83f2776c62be726140b3';
const client = twilio(accountSid, authToken);

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+16078004729',
    to: '+436764105889',
  })
  .then((message) => console.log(message.sid));
