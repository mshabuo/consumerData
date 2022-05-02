import React, { ReactElement, useEffect, useState } from "react"
import moment from "moment"

interface Props {}

export default function Main({}: Props): ReactElement {
  const [consumersData, setConsumersData] = useState<any[]>([])
  const [filter, setFilter] = useState<string>("")
  const [limit, setLimit] = useState<number>(10)

  useEffect(() => {
    // API handling
    fetch(
      "https://green-meadow-0b6c10003.azurestaticapps.net/building-location.json"
    )
      .then(response => {
        return response.json()
      })
      .then(data => {
        setConsumersData(data.locations)
      })
  }, [])

  let consumers = consumersData.map(location => location.consumers).flat()

  // pagination implementation
  if (filter && filter == "isNumber") {
    consumers = consumers.filter(({ isPhoneMobile }) => isPhoneMobile)
  }

  const handleClick = () => {
    setLimit(limit + 10)
  }

  return (
    <>
      <div className="Main">
        <label htmlFor="sortBy">Sort By:</label>
        <select
          onChange={event => {
            setFilter(event.target.value)
          }}
          className="custom-select"
        >
          <option value="allCustomers">All Customers</option>
          <option value="isNumber">Mobile Number</option>
        </select>

        {consumers
          .slice(0, limit)
          // pagination implementation
          .map(({ name, occupationDate, email, phoneNumber, consumerId }) => {
            return (
              <ul>
                <li key={consumerId}>
                  <h3>{name}</h3>
                  <dl>
                    <dt>
                      <span>Email:</span> {email}
                    </dt>
                    <dt>
                      {" "}
                      <span>Mobile:</span> {phoneNumber}
                    </dt>
                    <dt>
                      <span>Occupation Date:</span>{" "}
                      {moment(occupationDate).format("MMMM Do YYYY")}
                    </dt>
                  </dl>
                </li>
              </ul>
            )
          })}
        <button onClick={handleClick}>Load More &#10230;</button>
      </div>
    </>
  )
}
