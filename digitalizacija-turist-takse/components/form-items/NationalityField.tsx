import React, { useEffect, useState } from 'react'
import { AutoComplete } from 'primereact/autocomplete'
import { CountryService, iCountry } from 'service/CountryService'
import { useField } from 'formik'

const NationalityField = ({ name }: { name: string }) => {
  const [countries, setCountries] = useState<iCountry[]>([])
  const [selectedCountry, setSelectedCountry] = useState<iCountry>()
  const [filteredCountries, setFilteredCountries] = useState<iCountry[]>([])
  const [field, meta, helpers] = useField(name)

  useEffect(() => {
    if (selectedCountry) {
      helpers.setValue(selectedCountry.code)
    }
  }, [selectedCountry])

  const searchCountry = (event: { query: string }) => {
    let _filteredCountries
    if (!event.query.trim().length) {
      _filteredCountries = [...countries]
    } else {
      _filteredCountries = countries.filter((country) => {
        return country.name.toLowerCase().startsWith(event.query.toLowerCase())
      })
    }
    setFilteredCountries(_filteredCountries)
  }

  useEffect(() => {
    const countryService = new CountryService()
    countryService.getCountries().then((data: iCountry[]) => setCountries(data))
  }, [])

  const itemTemplate = (item: iCountry) => {
    return (
      <div className="country-item" style={{ display: 'flex', gap: 10 }}>
        <img alt={item.name} src={'/img/flag_placeholder.png'} className={`flag flag-${item.code.toLowerCase()}`} />
        <div>{item.name}</div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap align-items-center justify-content-center">
            <div className='flex align-items-center justify-content-center col-12'>
              <AutoComplete
                value={countries.find((c) => c.code === field.value)?.name}
                suggestions={filteredCountries}
                completeMethod={searchCountry}
                field="name"
                dropdown
                forceSelection
                dropdownAutoFocus
                itemTemplate={itemTemplate}
                onChange={(e) => setSelectedCountry(e.value)}
                aria-label="Countries"
                className={"fieldStyle" && meta.touched && meta.error ? 'p-invalid fieldStyle' : 'fieldStyle'}
                placeholder="Nationality"
              />
              {meta.touched && meta.error ? <small className="p-error block">{meta.error}</small> : null}
            </div>
    </div>
  )
}

export default NationalityField
