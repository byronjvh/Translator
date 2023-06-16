import { useContext } from 'react'
import InvertButton from './InvertButton'
import LangButton from './LangButton'
import { globalContext } from '../../context/GlobalContext'

function TranslatorButtons () {
  const { getSourceLang, getTargetLang, sourceLang, targetLang, invert } = useContext(globalContext)

  const selectSource = (lang) => {
    getSourceLang(lang)
  }

  const selectTarget = (lang) => {
    getTargetLang(lang)
  }

  return (
    <div className="translator__buttons">
      <LangButton language={sourceLang} getLang={selectSource} />
      <InvertButton onClick={invert} />
      <LangButton language={targetLang} getLang={selectTarget} />
    </div>
  )
}

export default TranslatorButtons
