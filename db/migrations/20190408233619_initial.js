
exports.up = function(knex, Promise) {
    return knex.schema
    
    .createTable('company', function (table) {
        table.bigIncrements('id').primary();
        table.text('name', 20).notNullable();
        table.bigInteger('numShares').notNullable();
        table.bigInteger('sharesSold').notNullable();
        table.timestamps(false, true);
    })

    .alterTable('company', function (table) {
        table.unique('id')
    })
    
    .createTable('investor', function (table) {
        
        table.bigIncrements('id').primary();
        table.text('name', 20).notNullable();
        table.bigInteger('budget').notNullable();
        table.bigInteger('sharesBought').notNullable();
        table.timestamps(false, true);
    })

    .alterTable('investor', function (table) {
        table.unique('id')
    })
    
    .createTable('shares', function (table) {
        table.bigIncrements('id').primary();
        table.text('name', 20).notNullable();
        table.bigInteger('companyID').notNullable();
        table.bigInteger('investorID').notNullable();
        table.timestamps(false, true);
    })

    .alterTable('shares', (table) => {
        // table.primary(['id']);
		table.foreign('companyID').references('id').inTable('company').onDelete("CASCADE").onUpdate("CASCADE");
		table.foreign('investorID').references('id').inTable('investor').onDelete("CASCADE").onUpdate("CASCADE");
    })
};

exports.down = function (knex, Promise) {
    
    
    return knex.schema.table('shares', function (table) {
        return table.dropForeign('companyID')
    })
    
    .then(() => {
        return knex.schema.table('shares', function (table) {
            return table.dropForeign('investorID')
        })
    })
    .then(() => {
        return knex.schema.dropTable('company')
    })
    .then(() => {
        return knex.schema.dropTable('investor')
    })
    .then(() => {
        return knex.schema.dropTable('shares')
    })
};
