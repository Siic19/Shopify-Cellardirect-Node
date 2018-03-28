exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('customers', function(table) {
      table.increments('id')
      table.integer('shopify_id')
      table.string('first_name')
      table.string('last_name')
      table.string('email')
    }),

    knex.schema.createTable('orders', table => {
      table.increments('id')
      table.integer('order_number')
      table
        .integer('customer_shopify_id')
        .unsigned()
        .references('customers.shopify_id')
    }),

    knex.schema.createTable('purchased_items', table => {
      table.increments('id')
      table.string('product_name')
      table.integer('quantity')
      table
        .integer('order_id')
        .unsigned()
        .references('orders.id')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('customers'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('purchased_items')
  ])
}
