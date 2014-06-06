Router = {
    configure: function () {},
    map: function () {},
    go: function () {},
    onBeforeAction: function () {},
    onRun: function () {},

    route: function (name, obj) {
        this[name] = obj;
        if (obj.template) {
            Template.stub(obj.template);
        }
    }
}