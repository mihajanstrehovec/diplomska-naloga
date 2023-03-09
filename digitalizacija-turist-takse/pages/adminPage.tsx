import { Inter } from '@next/font/google'
import type {NextPage} from 'next'
import Layout from '@/components/Layout'
import GuestInfo from '@/components/GuestInfo'
import { db } from '../firebase/clientApps'
import {
  collection,
  getDocs,
  orderBy,
  QuerySnapshot,
  DocumentData,
  query,
} from 'firebase/firestore'
import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import AdminTable from '@/components/AdminTable'
import { DataTable, DataTableRowEventParams } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ConfirmDialog } from 'primereact/confirmdialog'
import AdminLayout from '@/components/AdminLayout'
import useDB, {Checkin} from '@/hooks/dataBase'


const inter = Inter({ subsets: ['latin'] })

const AdminPage: NextPage = () => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>()
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deletingCheckin, setDeletingCheckin] = useState<Checkin>()
  const { checkins, deleteCheckin, refetch, updateCheckin } = useDB()

  console.log("checkins", checkins)
  

  const rowToggled = (e: DataTableRowEventParams) => {
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

  const columns = [
    {field: "mainGuestName", header: "Main guest"},
    {field: "numberOfGuests", header: "Number of guests"},
    // {field: "numberOfGuests", header: "Check in date"}
    // {field: "checkOutDate", header: "Check out date"}
  ]

  return (
    <Layout>
      
 

    
      <div className="card ">
        <div className="datatable-rowexpansion-demo">
          <div className="flex justify-content-center mb-3 ">
            <DataTable
              value={checkins}
              expandedRows={expandedRows}
              onRowToggle={rowToggled}
              responsiveLayout="scroll"
              scrollable
              scrollHeight="flex"
              rowExpansionTemplate={rowExpansionTemplate}
              dataKey="id"
              className="col-9 shadow-4 table p-0"
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