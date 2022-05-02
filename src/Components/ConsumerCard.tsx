import React, { ReactElement, useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

interface Location {
  locationId: number
  propertyNo: string
  branchNo: string
  locationNo: string
  street: string
  stairway: string
  floor: string
  postalCode: string
  countryCode: string
  city: string
  area: number
  consumerLogin: string
  dismantledDate: string
}
interface Consumers {
  consumerId: number
  name: string
  occupationDate: string
  occupationEndDate: string
  email: string
  phoneNumber: string
  isPhoneMobile: boolean
  consumerLogin: string
}

export default function ConsumerCard(): ReactElement {
  const { consumerId } = useParams()
  const [consumersData, setConsumersData] = useState<any>([])
  const [buildingName, setBuildingName] = useState<string>("")

  useEffect(() => {
    fetch(
      "https://green-meadow-0b6c10003.azurestaticapps.net/building-location.json"
    )
      .then(response => {
        // parsing the body text from the response
        return response.json()
      })
      .then(data => {
        //assigning consumers array and location object to component state array variable
        setConsumersData(data.locations)
        //assigning building name to component state string
        setBuildingName(data.building.buildingName)
      })
  }, [])

  // looping through the consumers array and using 'include()' method to return the location object properties of relevent consumerId
  const locationData = consumersData.filter((consumerArr: any) => {
    let newConsumerArr = consumerArr.consumers.map(
      (consumer: any) => consumer.consumerId
    )

    return newConsumerArr.includes(Number(consumerId))
  })[0]

  return (
    <div className="ConsumerCard">
      <dl>
        <dt>
          <span>Building Name:</span> {buildingName}
        </dt>
        <dt>
          <span>Street:</span> {locationData?.location?.street}
        </dt>
        <dt>
          <span>Postal Code:</span> {locationData?.location?.postalCode}
        </dt>
      </dl>
      <Link to={`/`}>
        <button> Go Back to Home</button>
      </Link>
    </div>
  )
}
