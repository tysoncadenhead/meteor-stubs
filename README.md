meteor-stubs
============

Stubs for unit testing meteor with any testing framework.

### Installation

- To keep Meteor from running your tests on the server, you will need a structure similar to this:
    - app (your Meteor app)
    - tests (your unit tests)
- From the root level, install the stubs:

```bash
npm install meteor-stubs
```

### Example Usage

These stubs can be used with any testing framework.

##### Stubbing Collections

The collection:

```js
Dogs = new Meteor.Collection('dogs', {});
```

The test:

```js
require('mrt-stubs');
require('../app/collections/dogs'); // The path to your collection

describe('The Dogs Collection', function () {
    describe('When we get the dogs', function () {

        it('should insert a dog', function () {
            Meteor.userId(111);
            Dogs.insert({
                name: 'Arthur',
                _id: 1,
                userId: 111
            });
            assert.equal(Dogs.find()[0].name, 'Arthur');
        });
    });
});
```

##### Stubbing Views and Routes

The view:

```js
Router.route('dogs', {
   template: 'dogs',
   data: function () {
        return {
            dogs: Dogs.find({
                userId: Meteor.userId()
            })
        };
   }
})
```

The test:

```js
require('mrt-stubs');
require('../app/collections/dogs'); // Require any collections the view uses
require('../app/client/views/dogs.view'); // Require the view

describe('The dogs view', function () {

    describe('When we get the data for the dogs template', function () {
        it('should return the correct data', function () {
            Meteor.userId(1);
            Dogs._data = [];
            assert.ok(!Router.dogs.data().list.length);
            Dogs.insert({  name: 'Steve', userId: 1 });
            assert.ok(Router.dogs.data().list.length);
        });
    });
});
```

Some real documentation is forthcoming. There are also more things to stub. This is a work in progress. If this repo sparks your interest, I could definitely use some help building it out.
