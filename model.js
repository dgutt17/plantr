const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr');

const Gardener = db.define('gardeners', {
   name: Sequelize.STRING,
   age: Sequelize.INTEGER
})


const Plot = db.define('plots', {
    size: Sequelize.INTEGER,
    shaded: Sequelize.BOOLEAN
 })

 const Vegetable = db.define('vegetables', {
    name: Sequelize.STRING,
    color: Sequelize.STRING,
    planted_on: Sequelize.DATE
 })

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

Plot.belongsToMany(Vegetable, {through: 'plot-vegetable-table'});
Vegetable.belongsToMany(Plot, {through: 'plot-vegetable-table'});

Gardener.belongsTo(Vegetable, {as: 'favoriteVegetable'})

module.exports = db;