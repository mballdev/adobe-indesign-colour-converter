import React, { useRef } from 'react';

import './Input.css';
import CopyIcon from '../../../resources/copy.svg';

const Input = ({ id, value, setValue, placeholder, label }) => {
  const ref = useRef(null);

  const copyValueToClipboard = () => {
    ref.current.select();
    navigator.clipboard.writeText(copyText.value);
  }

  return (
    <div className="inputWrapper">
      <div className="input">
        <label htmlFor={id}>{label}</label>
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <button className='copyButton' onClick={copyValueToClipboard} type="button"> 
        <img src={CopyIcon} height={20} width={20} />
      </button>
    </div>
      
  )
}

export default Input;
