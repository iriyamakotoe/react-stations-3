import React, { useEffect } from 'react'
import { useRef } from 'react';

export const InputItem = (props) => {
  const inputRef = useRef({});
  const id = props.id
  if (props.disabled) {
    inputRef.current.disabled = true;
  }
return (
    <>
        <p className='mt-10'><label htmlFor={id}>{props.label}：</label>
        <input type={props.type} id={id}
        {...props.register(id, {
          required: `${props.label}は必須です`,
          pattern: props.pattern
        })} defaultValue={props.defaultValues} ref={inputRef} /><br />
        <span className="error">{props.errors?.message}</span></p>
    </>
);

};

export default InputItem;