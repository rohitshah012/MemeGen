import { React , useEffect , useState } from "react";
import Navbar from "../components/Navbar"
import Card from '../components/Card'
import Footer from '../components/Footer'
import { getAllMemes } from "../api/Memeapi";



 

function Home() {

  const [data , setData ] = useState([])

  useEffect(()=> {getAllMemes().then((e) => setData(e.data.memes))
    
    
  },[])
 

  return (
    <div className="min-h-screen bg-gray-100">
      {/* navbar Section  */}
      <Navbar />


    

      {/* meme card section  */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((e, index) => <Card key={index} image={e.url } title = {e.name} />)}
        </div>
      </div>
   
      {/* footer section */}
      <Footer />
    </div>
  );
}

export default Home;
