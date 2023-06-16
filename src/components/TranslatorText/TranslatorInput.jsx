import { useContext, useEffect, useRef, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { globalContext } from '../../context/GlobalContext'
import { HiX } from 'react-icons/hi'
import Languages from '../../Languages.json'

function TranslatorInput () {
  const { getTextToTranslate, getIsEmpty, detectedLangCode, sourceLangToDetectedLang } = useContext(globalContext)
  const [inputValue, setInputValue] = useState('')
  const [focus, setFocus] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const inputRef = useRef()

  const debouncedText = useDebounce(inputValue, 800)

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleClick = () => {
    inputRef.current.focus()
  }

  useEffect(() => {
    const element = inputRef.current
    element.style.height = '54px'
    const taHeight = element.scrollHeight
    element.style.height = taHeight + 'px'

    if (inputValue) {
      setIsEmpty(false)
    } else {
      setIsEmpty(true)
    }
  }, [inputValue])

  useEffect(() => {
    getTextToTranslate(debouncedText)
  }, [debouncedText])

  useEffect(() => {
    getIsEmpty(isEmpty)
  }, [isEmpty])

  return (
    <div onClick={handleClick} className={`translator__text__box translator__text__box--input${focus ? ' focus' : ''}`}>
      <textarea
        ref={inputRef}
        className="translator__text__box__textarea customScroll"
        placeholder="Escribe algo..."
        onChange={handleChange}
        value={inputValue}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        >
        </textarea>
        {detectedLangCode && (
          <button onClick={() => sourceLangToDetectedLang()} className='detectLang'>
            Traducir del <span className='detectLang__lang'>{Languages.find(lang => lang.code.toLowerCase() === detectedLangCode).name}</span>?
          </button>
        )}
        {!isEmpty && (
          <button
            onClick={() => setInputValue('')}
            className='input__delete'>
              <HiX />
          </button>
        )}
    </div>
  )
}

export default TranslatorInput
