'use strict';

module.exports = function (mongoose) {
  var fieldSchema = require("./field.schema.js")(mongoose);
  var formSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    title : String,
    userId : String,
    fields : [fieldSchema]
  }, {collection : "cs5610.assignment.form"});
  return formSchema;
};
