import axios from 'axios'

const URL = 'https://pokeapi.co/api/v2'

const obtenerLenguajes = async (url) => {
  try {

    const response = await axios.get(url)
    const lenguajeEspañol = response.data.names.find(name => name.language.name === 'es')
    const lenguajeJapones = response.data.names.find(name => name.language.name === 'ja')

    return [lenguajeEspañol, lenguajeJapones]
    
  } catch (error) {
    res.status(500).json({ message: error.message })

  }
}

export const getPokemons = async (req, res) => {
  console.log('aaaaa')
  try {
    await axios.get(`${URL}/pokemon/?limit=100`)
    .then(response => {
      res.json(response.data)
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPokemon = async (req, res) => {
  try {
    await axios.get(`${URL}/pokemon/${req.params.id}/`)
    .then(response => {
      const pokemon = {
        'name': response.data.name,
        'type': response.data.types
      }

      res.json(pokemon)
    })
    // console.log(res)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPokemonType = async (req, res) => {
  try {
    const response = await axios.get(`${URL}/pokemon/${req.params.id}/`)

    console.log(response.data.types)
    
    const tipos = await Promise.all(response.data.types.map( async (tipo) => {
      const lenguaje = await obtenerLenguajes(tipo.type.url)
      return {...tipo.type, 'names': lenguaje}
    }))


    const pokemon = {
      'name': response.data.name,
      'type': tipos
    }

    console.log(pokemon)

    res.json(pokemon)
    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

