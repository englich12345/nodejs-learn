const seeder = require('mongoose-seed');
const config = require('../config');

seeder.connect(config.database, function () {
    seeder.loadModels([
        './src/models/UserModel'
    ]);

    let data = [{
        'model': 'User',
        'documents': [{
            "_id": "5ffc5eb58eee6079bf5c4a3b",
            "name": "admin",
            "role": "admin",
            "email": "admin@example.com",
            "password": "123456"
        }]
    }]

    seeder.clearModels(['User'], function () {
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
})