import { FaExchangeAlt } from 'react-icons/fa'

function InvertButton ({ onClick }) {
  return (
    <button onClick={onClick} className="translator__buttons__invert"><FaExchangeAlt /></button>
  )
}

export default InvertButton
