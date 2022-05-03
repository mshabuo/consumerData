import React, { ReactElement, useEffect, useState } from "react"
import moment from "moment"
import { Link } from "react-router-dom"

interface Props {}

export default function Main({}: Props): ReactElement {
  const [consumerData, setConsumerData] = useState<any[]>([])
  const [filter, setFilter] = useState<string>("")
  const [limit, setLimit] = useState<number>(10)

  useEffect(() => {
    fetch(
      "https://green-meadow-0b6c10003.azurestaticapps.net/building-location.json"
    )
      .then(response => {
        return response.json()
      })
      .then(data => {
        setConsumerData(data.locations)
      })
  }, [])

  let consumers = consumerData.map(location => location.consumers).flat()

  // filter implementation
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
          <option value="allConsumers">All Consumers</option>
          <option value="isNumber">Mobile Number</option>
        </select>

        {consumers
          .slice(0, limit)
          // pagination implementation
          .map(({ name, occupationDate, email, phoneNumber, consumerId }) => {
            return (
              <ul>
                <li key={consumerId}>
                  <Link to={`/consumer/${consumerId}`}>
                    <h3>{name}</h3>
                  </Link>
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
