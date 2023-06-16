import { FaSearch } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import Languages from '../../Languages.json'
import { useEffect, useRef, useState } from 'react'

function LangButton ({ language, getLang }) {
  const [dropdown, setDropdown] = useState(false)
  const [currentLang, setCurrentLang] = useState(language)
  const [search, setSearch] = useState('')
  const formRef = useRef(null)
  const langButtonRef = useRef(null)

  useEffect(() => {
    setCurrentLang(language)
  }, [language])

  const selectLang = (e) => {
    const selectedLang = Languages.find(lang => lang.name.toLowerCase() === e.target.innerText.toLowerCase())
    getLang(selectedLang)
    setCurrentLang(selectedLang)
    setDropdown(false)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    const openHandler = (e) => {
      const dropdown = formRef.current
      const langButton = langButtonRef.current
      if (!dropdown || !langButton) return
      if (!dropdown.contains(e.target) && !langButton.contains(e.target)) setDropdown(false)
    }
    document.addEventListener('mousedown', openHandler)
  })

  return (
    <article className="translator__buttons__lang">
      <div ref={langButtonRef} onClick={() => setDropdown(prev => !prev)} className='translator__buttons__dropdown'>
        <p className='translator__buttons__lang__current'>{currentLang.name}</p>
        <span className={`dropdownArrow${dropdown ? ' open' : ''}`}><IoIosArrowDown size='1.75rem' /></span>
      </div>
      <form ref={formRef} onSubmit={(e) => e.preventDefault()} className={`translator__buttons__lang__form${dropdown ? ' dropdown' : ''}`} >
        <div className='search'>
          <input onSubmit={(e) => e.preventDefault()} value={search} onChange={handleChange} type='text' id='Search' className='search__input' placeholder='Buscar lenguage' />
          <FaSearch className='search__icon' />
        </div>
        <ul className='translator__buttons__lang__list customScroll' >
          {
            Languages.filter(language => language.name.toLowerCase().includes(search.toLowerCase()) || language.code.toLowerCase().includes(search.toLowerCase())).map((language, index) => (
              <li onClick={selectLang} key={index} className='translator__buttons__lang__list__item'>
                {language.name}
              </li>
            ))
          }
        </ul>
      </form>
    </article>
  )
}

export default LangButton
