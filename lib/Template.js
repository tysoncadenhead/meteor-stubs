Template = {
    stub: function (name) {
        Template[name] = {
            rendered: function () {},
            created: function () {},
            destroyed: function () {},
            events: function (obj) {
                this._events = obj;
            },
            helpers: function (obj) {
                this._helpers = obj;
            }
        };
    }
};