import { ToastContainer } from 'react-toastify'
import Translator from './context/GlobalContext'

function App () {
  return (
    <>
      <main className="app">
        <Translator />
      </main>
      <ToastContainer />
    </>
  )
}

export default App
