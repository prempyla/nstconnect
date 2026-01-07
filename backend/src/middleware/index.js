const common = require('./common');
const challenge = require('./challenge.middleware');
const room = require('./room.middleware');

module.exports = {
    ...common,
    ...challenge,
    ...room
};
