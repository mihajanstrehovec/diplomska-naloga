import type {NextPage} from 'next'
import Layout from '@/components/Layout'
import { useState } from 'react'
import { DataTable, DataTableRowEvent } from 'primereact/datatable'
import { Column } from 'primereact/column'
import useDB from '@/hooks/dataBase'
import { Checkin } from '@/interfaces/interfaces-db'

const AdminPage: NextPage = () => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deletingCheckin, setDeletingCheckin] = useState<Checkin>()
  const { checkins, deleteCheckin, refetch, updateCheckin } = useDB()
  
  const rowToggled = (e: DataTableRowEvent ) => {
    setExpandedRows(e.data)
  }

  const rowExpansionTemplate = (data: Checkin) => {
    return (
      <div className="orders-subtable col-12">
        <DataTable value={data.guests} responsiveLayout="scroll" className="col-12">
          <Column field="firstName" header="First name"></Column>
          <Column field="lastName" header="Last name"></Column>
          <Column field="gender" header="Gender"></Column>
          <Column field="dateOfBirth" header="Date of birth"></Column>
          <Column field="nationality" header="Nationality"></Column>
          <Column field="documentType" header="Document type"></Column>
          <Column field="documentNumber" header="Document number"></Column>
        </DataTable>
      </div>
    )
  }

  return (

    <Layout>
      <div className="card mb-6">
        <div className="datatable-rowexpansion-demo mb-10vh ">
          <div className="flex justify-content-center ">
            <DataTable
              value={checkins}
              expandedRows={expandedRows}
              onRowToggle={rowToggled}
              responsiveLayout="scroll"
              scrollable
              scrollHeight="flex"
              rowExpansionTemplate={rowExpansionTemplate}
              dataKey="id"
              className="col-9 shadow-4 table p-0 mb-5"
              size="large"
              >
              <Column expander style={{ width: '3em' }} />
              <Column field="mainGuestName" header="Main guest" />
              <Column field="numberOfGuests" header="Number of guests" />
              <Column field="checkInDate" header="Check in date" />
              <Column field="checkOutDate" header="Check out date" />
            </DataTable>
          </div>
        </div>
      </div>
    </Layout>
  )
  
}

export default AdminPage