
const BookSchema = {
    name: 'Book',
    properties: {
        _id: 'objectId',
        author: 'string?',
        category: 'string?',
        price: 'string?',
        realm_id: 'string?', // should be userId or add any static for test project.
        title: 'string',
    },
    primaryKey: '_id',
};


export default BookSchema;
