module.exports = {

    _allow: {},
    _deny: {},
    _data: [],

    insert: function (data) {
        var allow = this._allow.insert,
            deny = this._deny.insert;
        if (typeof allow === 'function' && !allow(Meteor.userId(), data)) {
            return;
        }
        if (typeof deny === 'function' && deny(Meteor.userId(), data)) {
            return;
        }
        this._data.push(data);
    },

    find: function () {
        if (this.transform) {
            for (var i = 0; i < this._data.length; i++) {
                this._data[i] = this.transform(this._data[i]);
            }
        }
        return this._data;
    },

    findOne: function (id) {
        var record;
        for (var i = 0; i < this._data.length; i++) {
            if (this._data[i]._id === id) {
                record = this._data[i];
            }
        }
        if (record) {
            return this.transform(record);
        }
    },
    
    update: function (id, data) {
        var allow = this._allow.update,
            deny = this._deny.update;
        if (typeof allow === 'function' && !allow(Meteor.userId(), { _id: id })) {
            return;
        }
        if (typeof deny === 'function' && deny(Meteor.userId(), { _id: id })) {
            return;
        }
        for (var i = 0; i < this._data.length; i++) {
            if (this._data[i]._id === id) {
                this._data[i] = data;
            }
        }
    },
    
    remove: function (id) {
        var allow = this._allow.remove,
            deny = this._deny.update;
        if (typeof allow === 'function' && !allow(Meteor.userId(), { _id: id })) {
            return;
        }
        if (typeof deny === 'function' && deny(Meteor.userId(), { _id: id })) {
            return;
        }
        for (var i = 0; i < this._data.length; i++) {
            if (this._data[i]._id === id) {
                this._data.splice(i, 1);
            }
        }
    },
    
    allow: function (obj) {
        this._allow = obj;
    },
    
    deny: function (obj) {
        this._deny = obj;
    }
};