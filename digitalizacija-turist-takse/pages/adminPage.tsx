import type {NextPage} from 'next'
import Layout from '@/components/Layout'
import { useState, useRef } from 'react'
import { DataTable, DataTableRowEvent} from 'primereact/datatable'
import { Column } from 'primereact/column'
import useDB from '@/hooks/dataBase'
import { Checkin } from '@/interfaces/interfaces-db'
import { Button } from 'primereact/button'
import {Toast} from 'primereact/toast'

const AdminPage: NextPage = () => {
  const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>()
  const { checkins, deleteCheckin, refetch, updateCheckin } = useDB()
  const toast = useRef<Toast>(null)
  const toastBC = useRef<Toast>(null)
  
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

  const deleteCheckIn = (checkin: Checkin) => {
    //@ts-ignore
    closeToast(toastBC.current)
    deleteCheckin(checkin)
    refetch()
  }

  const delBtn = (checkin: Checkin) => {
    return (
      <Button
        type="button"
        icon="pi pi-trash"
        onClick={() => confirmDel(checkin)}
        className="p-button-rounded p-button-danger p-button-outlined"/>
    )
  }

  const sendBtn = (checkin: Checkin) => {
    if(checkin.ajpes){
      return (
        <Button
          type="button"
          icon="pi pi-check"
          onClick={() => { {submitReport("success", 
          "Guest data already sent.",
          "You have already successfuly sent this checkin data to AJPES.\
          If you want to undo this please contact our customer support.")}}}
          className="p-button-rounded p-button-success p-button-outlined"/>
      )
    } else {
      return (
        <Button
          type="button"
          icon="pi pi-send"
          onClick={() => confirmSend(checkin)}
          className="p-button-rounded p-button-warning p-button-outlined"/>
      )
    }
  }

  const confirmDel = (checkin: Checkin) => {
    if (toastBC.current){
      toastBC.current.show({
        severity: 'info',
        sticky: true,
        className: 'border-none delToast',
        content: (
            <div className="flex flex-column align-items-center" style={{ flex: '1' }}>
                <div className="text-center">
                    <i className="pi pi-exclamation-triangle" style={{ fontSize: '2rem' }}></i>
                    <div className="text-xl my-3">Are you sure?</div>
                </div>
                <div className="flex gap-2">
                    <Button onClick={(e) => deleteCheckIn(checkin)} type="button" label="Confirm" className="p-button-success w-6rem" />
                    <Button onClick={(e) => {//@ts-ignore 
                                            closeToast(toastBC.current)}} type="button" label="Cancel" className="p-button-warning w-6rem" />
                </div>
            </div>
        )
      })
    }
  }
  const confirmSend = (checkin: Checkin) => {
    if (toastBC.current){
      toastBC.current.show({
        severity: 'info',
        sticky: true,
        className: 'border-none delToast',
        content: (
            <div className="flex flex-column align-items-center" style={{ flex: '1' }}>
                <div className="text-center">
                    <i className="pi pi-exclamation-triangle" style={{ fontSize: '2rem' }}></i>
                    <div className="text-xl my-3">Are you sure?</div>
                </div>
                <div className="flex gap-2">
                    <Button onClick={(e) => sendData(checkin)} type="button" label="Confirm" className="p-button-success w-6rem" />
                    <Button onClick={(e) => {//@ts-ignore 
                                            closeToast(toastBC.current)}} type="button" label="Cancel" className="p-button-warning w-6rem" />
                </div>
            </div>
        )
      })
    }
  }
    

  const sendData = async (requestBody: Checkin) => {
    //@ts-ignore
    closeToast(toastBC.current)

    return new Promise((resolve, reject) => {
      
      fetch('/api/submit-ajpes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requestBody })
      })
        .then(async (response) => {
          const res = await response.json()
          if(response.status == 200){
            if (res["@failure"] == 0){
              submitReport("success", 
              "Information sent successfully",
              `Successfully sent all ${res["@success"]} guests information to AJPES`)
              await updateCheckin(requestBody.id)
              await refetch()
            } else {
              submitReport("error", 
              "Error while sending information",  
              `Something went wrong while sending the data to AJPES, please contact our support team. Error message: \n ${res["row"][0]["@msgTxt"]}`)
            }
          } else {
            submitReport("error",
            "Error while sending information",
            `Something went wrong while sending the data to AJPES, please contact our support team or try again later.`)
          }
        })
        .catch((e) => reject(e))
    })
  }

  const submitReport = (severityText: string, summaryText: string, detailText: string) => {
    if (toast.current) {
      toast.current.show({
        //@ts-ignore
        severity: severityText,
        summary: summaryText,
        detail: detailText,
        life: 8000
      })
    }
  }

  const closeToast = (toast: Toast) => {
    toast.clear()
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
              scrollHeight="500px"
              rowExpansionTemplate={rowExpansionTemplate}
              dataKey="id"
              className="md:col-6 col-11 shadow-4 table p-0 mb-5"
              size="large"
              >
              <Column expander style={{ width: '3em' }} />
              <Column field="mainGuestName" header="Main guest" />
              <Column field="numberOfGuests" header="Number of guests" />
              <Column field="checkInDate" header="Check in date" />
              <Column field="checkOutDate" header="Check out date" />
              <Column header="Delete" body={delBtn}/>
              <Column header="Send to AJPES" body={sendBtn}/>
            </DataTable>
          </div>
        </div>
      </div>
      <Toast ref={toastBC} position="bottom-center" />
      <Toast ref={toast} position="bottom-right" />
    </Layout>
  )
  
}


export default AdminPage