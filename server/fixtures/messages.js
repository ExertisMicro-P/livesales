
// The "||" notation doesn't work yet
Fixtures = typeof Fixtures !== "undefined" ? Fixtures : {};

Fixtures.messagesFixture = [
  { 'message' : 'Introducing Telescope', 'type' : 'DIRECT', 'originator' : 1, 'recipient' : 2, 'createdAt' : new Date },
  { 'message' : 'Meteor', 'type' : 'DIRECT', 'originator' : 2, 'recipient' : 1, 'createdAt' : new Date },
  { 'message' : 'Meteor', 'type' : 'BROADCAST', 'originator' : 1, 'createdAt' : new Date }
];
