import React from 'react'
import { RadioButton } from 'primereact/radiobutton'
import { useField } from 'formik'

const RadioButtonField = ({ name, label }: { name: string; label: Array<string> }) => {
  const [field, meta] = useField(name)
  return (
    <div>
      <div className="field-radiobutton align-items-center justify-content-center">
        <RadioButton
          inputId={name + label[0]}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={name}
          value={label[0]}
          checked={field.value === 'Male'}
          className={meta.touched && meta.error ? 'p-invalid' : ''}
        />

        <label htmlFor={name + label[0]}>{label[0]}</label>

        <RadioButton
          inputId={name + label[1]}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={name}
          value={label[1]}
          checked={field.value === 'Female'}
          className={meta.touched && meta.error ? 'p-invalid ml-4' : 'ml-4'}
        />
        <label htmlFor={name + label[1]}>{label[1]}</label>
      </div>
      {meta.touched && meta.error ? (
        <small id="username2-help" className="p-error block col-12">
          {meta.error}
        </small>
      ) : null}
    </div>
  )
}

export default RadioButtonField
