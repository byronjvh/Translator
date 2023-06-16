import { ToastContainer } from 'react-toastify'
import Translator from './context/GlobalContext'
import { useEffect, useState } from 'react'

function App () {
  const [height, setHeight] = useState('')

  useEffect(() => {
    const viewHeight = window.innerHeight
    setHeight(viewHeight + 'px')
  })

  return (
    <>
      <main style={{ height }} className="app">
        <Translator />
      </main>
      <ToastContainer />
    </>
  )
}

export default App
