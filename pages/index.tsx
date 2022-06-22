import type { NextPage } from 'next'
import { CardInput } from '../src/components/cardInput'
import { connectToDatabase } from '../src/lib/mongodb'


const Home: NextPage = () => {
  return (
    <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}>
      <CardInput />
    </div>
  )
}

export default Home
