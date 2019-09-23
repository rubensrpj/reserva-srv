const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

module.exports = router

// Produto por ID
router.get('/', async (req, res) => {
    console.log('Pesquisando')
    const { id } = req.query
    const { descricao } = req.query

    if (id !== undefined) {
        const { rows }= await db.query('SELECT * FROM "PRODUTO" WHERE "IDPRODUTO" = $1', [id])
        res.status(200).send(rows[0])
    } else if (descricao !== undefined) {
        const { rows } = await db.query('SELECT * FROM "PRODUTO" WHERE "PRODUTO" LIKE  $1',['%'+descricao+'%'])
        res.status(200).send(rows)
    } else {
      res.status(204).send({"status": "Nenhum registro localizado"})
    }
  })

router.post('/', async(req, res) => {
    try {
        await db.query('BEGIN')
        const script = 'INSERT INTO "PRODUTO" '+
                       ' ("PRODUTO", "INFOTECNICA", "DISPONIVEL", "RATING", "VLRRESERVA", "URLIMG1", "URLIMG2","URLIMG3") '+
                       ' VALUES '+
                       ' ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "IDPRODUTO"'

        const scriptValues = [req.body.PRODUTO, 
                              req.body.INFOTECNICA, 
                              req.body.DISPONIVEL  === undefined ? false: req.body.DISPONIVEL, 
                              req.body.RATING === undefined  ? 0 :  req.body.RATING, 
                              req.body.VLRRESERVA === undefined  ? 0 :  req.body.VLRRESERVA, 
                              req.body.URLIMG1, 
                              req.body.URLIMG2, 
                              req.body.URLIMG3]

        const retorno = await db.query(script, scriptValues)
        await db.query('COMMIT')
        return res.status(200).send('IDPRODUTO:' + retorno.rows[0].IDPRODUTO);
    } catch (e) {
        await db.query('ROLLBACK')
        throw e
    }    
})