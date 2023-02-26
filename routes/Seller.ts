
import express, { Express, Request, Response } from 'express';
import { createSeller, getSeller, getSellerCode } from '../db/db';
const router = express.Router();


router.get('/:discord_id', async (req, res) => {
    try {
        res.status(200).send(await getSeller(req.params.discord_id))
   } catch (error) {
        if(error === 'Not Found'){
            res.status(404).send(`Não encontrado.`)
        }
      
   }
})
router.get('/code/:code', async (req, res) => {
    try {
        res.status(200).send(await getSellerCode(req.params.code))
   } catch (error) {
        if(error === 'Not Found'){
            res.status(404).send(`Não encontrado.`)
        }
      
   }
})


router.post('/', async (req, res) => {
    try {
         res.status(201).send(await createSeller(req.body))
    } catch (error) {
        res.status(500).send(`The following error has occured: ${error}`)
    }


})
export default router