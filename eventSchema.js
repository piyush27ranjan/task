const mongoose = require("mongoose");

var schema = mongoose.Schema;

var eventSchema = new schema({
    event: { type: String, required: true},
    timestamp: { type: String, required: true },
});

module.exports = mongoose.model('events', eventSchema);