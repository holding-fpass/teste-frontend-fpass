import { useEffect, useState } from 'react'
import api from "../../services/api"

import Card from '../../components/Card'
import Container from '../style'
import { Row, Columns } from '../../styles/columns'

interface propCharacters {
  name: string,
  description: string,
  thumbnail: {
    path: string,
    extension: string
  }
}

export default function Characters() {

  const [characters, setCaracters] = useState<propCharacters[]>([])

  useEffect(() => {
    api.get('/characters')
    .then(response => {
      setCaracters(response.data.data.results)
    })
    .catch(err => console.log('erro', err))
  }, [] )
    
  return(
      <Container>
        <Row>
        { characters.map( (character) =>
          <Columns grid={3}>
            <Card 
              name={character.name}
              description={character.description}
              thumbnailUrl={character.thumbnail.path}
              thumbnailExtension={character.thumbnail.extension}
            />
          </Columns> 
        ) }
        </Row>
      </Container>
  )
}