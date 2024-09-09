import './App.css'
import ContactForm from './components/ContactForm'

const SUPERSECRET = import.meta.env.VITE_MY_SECRET

function App() {


  return (
    <>
       {SUPERSECRET}
 <ContactForm/>
    </>
  )
}

export default App
