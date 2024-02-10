import React, { useRef } from 'react';

import './Input.css';

const CopyIconPath = require('../../../resources/copy.svg');

interface IInputProps {
  id: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  label: string;
}

const FieldInput: React.FC<IInputProps> = ({ id, value, setValue, placeholder, label }) => {
  const inputRef = useRef(null);

  const copyValueToClipboard = () => {
    navigator.clipboard.writeText(value);
  }

  return (
    <div className="inputWrapper">
      <div className="input">
        <label htmlFor={id}>{label}</label>
        <input
          ref={inputRef}
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <button className='copyButton' onClick={copyValueToClipboard} type="button">
        <img src={CopyIconPath.default} alt="Copy" />
      </button>
    </div>
      
  )
}

FieldInput.displayName = 'FieldInput';
export default FieldInput;
