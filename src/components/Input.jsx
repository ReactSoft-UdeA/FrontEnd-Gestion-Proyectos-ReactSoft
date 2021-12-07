import React from 'react';

const Input = ({ label, name, defaultValue, type, required }) => {
  return (
    <label htmlFor={name} className='flex flex-col my-3 '>
      <span className = 'text-center '>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        className='input form-control text-center '
        defaultValue={defaultValue}
      />
    </label>
  );
};

export default Input;