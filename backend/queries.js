const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM accounts WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getGroceryItemsByGroceryListId = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM groceryitems WHERE grocerylist_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addGroceryItem = (request, response) => {
    const id = parseInt(request.params.id);
    const item_name = request.params.item_name;

    pool.query('INSERT INTO groceryitems(grocerylist_id, item_name) VALUES($1, $2)', [id, item_name], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUserById,
    getGroceryItemsByGroceryListId
}