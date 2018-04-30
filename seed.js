const db = require('./model');

const seedInfo = db.sync({force: true});

seedInfo.then(function(value){
    console.log('Connected Successfully');
    //db.close();
}).catch(function(error){
    console.log(error)
    //db.close();
}).finally(function() {
    db.close();
})

