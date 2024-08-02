import React from 'react'

export const InputItem = (props) => {
  const id = props.id

return (
    <>
        <p className='mt-10'><label htmlFor={id}>{props.label}：</label>
        <input type={props.type} id={id}
        {...props.register(id, {
          required: `${props.label}は必須です`,
          pattern: props.pattern
        })} defaultValue={props.defaultValues} /><br />
        <span className="error">{props.errors?.message}</span></p>
    </>
);

};

export default InputItem;