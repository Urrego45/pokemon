import express from 'express'

import * as pokemonController from '../controllers/pokemon.controller.js'

const router = express.Router()

router.get('/pokemon', pokemonController.getPokemons)
router.get('/pokemon/:id', pokemonController.getPokemon)
router.get('/pokemon-type/:id', pokemonController.getPokemonType)


export default router