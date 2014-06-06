Session = {
    _data: {},
    set: function (key, value) {
        this._data[key] = value;
    },
    get: function (key) {
        return this._data[key];
    },
    equals: function (key, value) {
        return this.get(key) === value;  
    },
    setDefault: function (key, value) {
        if (!this.get(key)) {
            this.set(key, value);
        }
    }
};