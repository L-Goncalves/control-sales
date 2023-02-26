
import express, { Express, Request, Response } from 'express';
import { getAccountsByDiscordId, saveDetailsAccount } from '../db/db';

const router = express.Router();


router.get('/:discord_id', async (req, res) => {
    try {
        res.status(200).send(await getAccountsByDiscordId(req.params.discord_id))
   } catch (error) {
        if(error === 'Not Found'){
            res.status(404).send(`Não encontrado.`)
        }
      
   }
})

router.post('/', async (req, res) => {
    try {
         res.status(201).send(await saveDetailsAccount(req.body))
    } catch (error) {
        res.status(500).send(`The following error has occured: ${error}`)
    }


})
export default router