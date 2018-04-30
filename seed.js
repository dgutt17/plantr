const Sequelize = require('sequelize');
const { db, Gardener, Plot, Vegetable } = require('./model');

/* const newGardener = new Gardener({
    name: 'Conor',
    age: 27
}); */

/* const newGardenerP = Gardener.create({
    name: 'Conor',
    age: 27,
});

const newPlot = Plot.create({
    size: 100,
    shaded: false,
}); */


const seedInfo = db.sync({force: true});
seedInfo.then(function(value){
    console.log('Connected Successfully');
    //db.close();
}).then(() => {
    const carrot = Vegetable.create({
        name: 'Carrot',
        color: 'Orange',
        planted_on: Date.now(),
    });

    const broccoli = Vegetable.create({
        name: 'Broccoli',
        color: 'Green',
        planted_on: Date.now(),
    });

    const eggplant = Vegetable.create({
        name: 'Eggplant',
        color: 'Purple',
        planted_on: Date.now(),
    });
    return Promise.all([carrot, broccoli, eggplant]);
}).then((vegetable)=>{
    return Promise.all([Gardener.create({
        name: 'Dan',
        age: 27,
        favoriteVegetableId: vegetable[0].id
    }), vegetable]);
    
}).then(([gardener, vegetable]) =>{
    return Plot.create({
        size: 50,
        shaded: false,
        gardenerId: gardener.id
    }).then((plot) =>{
        return plot.addVegetables(vegetable)
    })
})
.catch(function(error){
    console.log(error);
    //db.close();
}).finally(function() {
    db.close();
});



