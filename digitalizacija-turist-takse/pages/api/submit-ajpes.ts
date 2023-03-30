import { NextApiRequest, NextApiResponse } from 'next'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import prices from 'helpers/prices'
import * as taxCal from 'helpers/payment-helper'
const axios = require('axios')
const fs = require('fs')
const https = require('https')
const parser = require('xml2json')

dayjs.extend(customParseFormat)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const reservation = req.body['requestBody']

  // credentials
  const username: string = 'apiTest'
  const password: string = 'Test123!'
  const url: string = 'https://wwwt.ajpes.si/rno/rnoApi/eTurizem/wsETurizemPorocanje.asmx'

  let guests: string = ``

  // reformating checkin date from DD. MM. YYYY to YYYY-MM-DD for calculating
  const [dayCheckIn, monthCheckIn, yearCheckIn] = reservation['checkInDate'].split('. ')
  const checkin = yearCheckIn + '-' + monthCheckIn + '-' + dayCheckIn
  const [dayCheckOut, monthCheckOut, yearCheckOut] = reservation['checkOutDate'].split('. ')
  const checkout = yearCheckOut + '-' + monthCheckOut + '-' + dayCheckOut


  //@ts-ignore
  reservation['guests'].forEach((guest, index) => {
    // Creating XML rows based on number of guests, zst is incremented and starts from 1

    // reformating date of birth from DD. MM. YYYY to YYYY-MM-DD
    // and calculating age from acquired dates
    const [day, month, year] = guest['dateOfBirth'].split('. ')
    const newDate = year + '-' + month + '-' + day
    //@ts-ignore
    const difference: number = Math.abs(dayjs() - dayjs(newDate, 'YYYY-MM-DD'))
    const age = Math.floor(difference / (1000 * 3600 * 24) / 365)

    let tax = 0
    let settlement = 0

    // calculating tax based on age
    if (age >= 18) {
      tax = taxCal.calculateTotalAdultTax(1, 1)
    } else if (age >= 7) {
      tax = taxCal.calculateTotalChildrenTax(1, 1)
      settlement = 11
    } else {
      settlement = 1
    }


    // creating and attaching current guest info row to all guests
    guests += `<row idNO="0" zst="${index + 1}"
    ime="${guest['firstName']}" 
    pri="${guest['lastName']}" 
    sp="${guest['gender']}" 
    dtRoj="${newDate}" 
    drzava="${guest['nationality']}" 
    vrstaDok="${guest['documentType']}" 
    idStDok="${guest['documentNumber']}" 
    casPrihoda="${checkin + 'T15:00:00'}" 
    casOdhoda="${checkout + 'T11:00:00'}" 
    ttObracun="${settlement}" 
    ttVisina="${tax}" 
    status="1"/>`
  })

  const format: number = 2 // Answer in JSON (1 for XML)

  const headers = {
    'Content-Type': 'text/xml',
  }

  // final XML body
  const XML = `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <oddajPorocilo xmlns="http://www.ajpes.si/eturizem/">
        <uName>${username}</uName>
        <pwd>${password}</pwd>
        <data>
          <knjigaGostov>
            ${guests}
          </knjigaGostov>
        </data>
        <format>${format}</format>
      </oddajPorocilo>
    </soap:Body>
  </soap:Envelope>`

  // agent that carries certificate needed for AJPES
  const agent = new https.Agent({
    pfx: fs.readFileSync(process.cwd() + '\\pages\\api\\AjpesTest.pfx'),
    rejectUnauthorized: false,
    passphrase: 'ajpestest',
    keepAlive: true
  })

  //@ts-ignore
  await axios({
    httpsAgent: agent,
    method: 'post',
    url,
    headers,
    data: XML
  })//@ts-ignore
    .then((response) => {
      // converting xml response to JSON and returning data
      let json = parser.toJson(response.data)
      let json2 = JSON.parse(json)
      let json3 = JSON.parse(json2["soap:Envelope"]["soap:Body"]["oddajPorociloResponse"]["oddajPorociloResult"])
      return res.status(200).json(json3["data"])
    })//@ts-ignore
    .catch((error) => {
      return res.status(400).json(error)
    })
}
