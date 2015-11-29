'use strict';

module.exports = function(mongoose) {
  var objectId = mongoose.Schema.Types.ObjectId;
  var fieldSchema = new mongoose.Schema({
    id : {
      type: objectId,
    },
    label : String,
    fieldType : {
      type : String
      //enum : ["TEXT", "TEXTAREA", "RADIO", "CHECKBOX", "SELECT", "DATE"]
    },
    options : [{
      label : String,
      value : String
      }
    ],
    placeholder : String
  });
  return fieldSchema;
};
