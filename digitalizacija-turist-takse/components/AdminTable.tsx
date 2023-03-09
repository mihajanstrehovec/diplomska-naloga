import React, { useEffect, useState } from 'react'
import { AutoComplete } from 'primereact/autocomplete'
import { CountryService, iCountry } from 'service/CountryService'
import { useField } from 'formik'

//{ label, name }: { label: string; name: string }

const AdminTable = (data) => {
    
    console.log(data)
    
    return (
        <h1>{data}</h1>
      )


}

export default AdminTable