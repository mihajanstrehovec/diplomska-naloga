import React from "react"
import { Calendar } from "primereact/calendar"
import { useField } from "formik"

const DateField = ({
  name,
  placeholder,
  minDate,
  maxDate,
}: {
  name: string
  label?: string
  placeholder?: string
  minDate?: Date
  maxDate?: Date
}) => {
  const [field, meta] = useField(name)
  return (
    <div className="flex flex-wrap align-items-center justify-content-center">
        <div className="flex align-items-center justify-content-center col-12">
            <Calendar
                value={field.value}
                placeholder={placeholder}
                id={name}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={name}
                className={"fieldStyle" && meta.touched && meta.error ? "p-invalid" : "fieldStyle"}
                minDate={minDate}
                maxDate={maxDate}
            />
        </div>
      {meta.touched && meta.error ? (
        <small id="username2-help"  className="p-error flex align-items-center justify-content-center col-12">
          {meta.error}
        </small>
      ) : null}
    </div>
  )
}

export default DateField
