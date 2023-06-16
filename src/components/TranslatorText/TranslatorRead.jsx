import { useContext } from 'react'
import { globalContext } from '../../context/GlobalContext'
import { toast } from 'react-toastify'
import { MdOutlineContentCopy } from 'react-icons/md'

function TranslatorRead () {
  const { translatedText, isTranslating } = useContext(globalContext)

  const handleClick = () => {
    if (!translatedText) return

    navigator.clipboard.writeText(translatedText)
    toast.success('Texto copiado!', {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }
  return (
    <div className="translator__text__box translator__text__box--read">
      {isTranslating ? 'Traduciendo...' : translatedText || 'Traducción'}
      {translatedText && <button className='copyText' onClick={handleClick}><MdOutlineContentCopy /></button>}
    </div>
  )
}

export default TranslatorRead
