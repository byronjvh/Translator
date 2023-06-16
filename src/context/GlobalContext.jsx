import { createContext, useEffect, useState } from 'react'
import TranslatorText from '../components/TranslatorText/TranslatorText'
import TranslatorButtons from '../components/TranslatorButtons/TranslatorButtons'
import { detectLang } from '../services/Detect'
import { translate } from '../services/Translate'
import Languages from '../Languages.json'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const globalContext = createContext()

function Translator () {
  const [textToTranslate, setTextToTranslate] = useState('')
  const [sourceLang, setSourceLang] = useState({
    code: 'es',
    name: 'Spanish'
  })
  const [targetLang, setTargetLang] = useState({
    code: 'en',
    name: 'English'
  })
  const [translatedText, setTranslatedText] = useState('')
  const [detectedLangCode, setDetectedLangCode] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [error, setError] = useState('')

  async function detect () {
    if (!textToTranslate) return setDetectedLangCode('')
    const response = await detectLang(textToTranslate)
    if (response.status !== 'ok') {
      return
    }
    if (response.language_code.toLowerCase() === sourceLang.code.toLowerCase()) {
      setDetectedLangCode('')
    } else {
      setDetectedLangCode(response.language_code)
    }
  }

  async function translateText () {
    setError(null)
    if (!textToTranslate) {
      setTranslatedText('')
      return
    }

    try {
      const response = await translate(textToTranslate, sourceLang.code, targetLang.code)

      if (response.status !== 'ok') {
        setError('Error en la traducción')
        setTranslatedText('')
        return
      }

      setIsTranslating(false)
      setTranslatedText(response.translated_text)
      setError(null)
    } catch (error) {
      setError('Error al realizar la traducción')
      setTranslatedText('')
    }
  }

  const getSourceLang = (lang) => {
    setSourceLang(lang)
  }

  const getTargetLang = (lang) => {
    setTargetLang(lang)
  }

  const getTextToTranslate = (text) => {
    setTextToTranslate(text)
  }

  const getIsEmpty = (isEmpty) => {
    setIsEmpty(isEmpty)
  }

  const invert = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
  }

  const sourceLangToDetectedLang = () => {
    const lang = Languages.find(language => language.code.toLowerCase() === detectedLangCode.toLowerCase())
    setSourceLang(lang)
  }

  useEffect(() => {
    detect()
  }, [textToTranslate, sourceLang])

  useEffect(() => {
    translateText()
  }, [sourceLang, targetLang, textToTranslate])

  useEffect(() => {
    if (!error) return
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER
    })
  }, [error])

  useEffect(() => {
    if (isEmpty) {
      setIsTranslating(false)
      setTranslatedText('')
      setDetectedLangCode('')
    } else {
      setIsTranslating(true)
    }
  }, [isEmpty])

  return (
    <globalContext.Provider
      value={{
        getSourceLang,
        getTargetLang,
        getTextToTranslate,
        translatedText,
        isTranslating,
        getIsEmpty,
        detectedLangCode,
        sourceLang,
        targetLang,
        invert,
        sourceLangToDetectedLang
      }} >
        <Header />
      <div className='translator'>
        <TranslatorButtons />
        <TranslatorText />
      </div>
      <Footer />
      <ToastContainer />
    </globalContext.Provider>
  )
}

export default Translator
