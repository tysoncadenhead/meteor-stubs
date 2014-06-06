Meteor = {

    userId: function (id) {
        if (id) {
            this._userId = id;
        } else {
            return this._userId;
        }
    },

    startup: function (newStartupFunction) {
        Meteor.startup = newStartupFunction;
    },

    Collection: function (collectionName, obj) {
        if (obj) {
            for (var name in obj) {
                if (obj.hasOwnProperty(name)) {
                    this[name] = obj[name];
                }
            }
        }
    }

};

Meteor.Collection.prototype = require('./Meteor.Collection');