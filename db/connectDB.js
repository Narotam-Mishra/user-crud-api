// DB connection logic

const mongoose = require('mongoose');

// datbase connection setup
const DBConnectionSetup = (url) => {
    return mongoose.connect(url);
}

module.exports = DBConnectionSetup;