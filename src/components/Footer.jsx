import { FaGithub } from 'react-icons/fa'

function Footer () {
  return (
    <footer className="footer">
        <span>Hecho por <a className='footer__link' title='Perfil de GitHub' href='https://github.com/byronjvh' target='_blank' rel='noopener noreferrer'>Byron</a></span>
        <a className='footer__link footer__link--icon' href='https://github.com/byronjvh/Translator' rel='noopener noreferrer' target='_blank' title='Repositorio de GitHub'><FaGithub /></a>
    </footer>
  )
}

export default Footer
