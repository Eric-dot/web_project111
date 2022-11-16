import { useState } from "react";
import { useEffect } from "react";

import deleteIcon from "../images/delete.png";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    console.log(bookings);
    setBookings(bookings);
  }, []);

  const onRemove = (name) => {
    const newBookings = bookings.filter((item) => item.name !== name);
    alert("Reservation cancelled!");
    setBookings(newBookings);

    // 改本地数据
    localStorage.setItem("bookings", JSON.stringify(newBookings));
  };

  return (
    <>
      {bookings.length > 0 && (
        <div>
          <h3 className="text-center">List of your reservations</h3>
          <div className="row justify-content-center">
            <div className="row col-11 col-sm-8">
              <div className="card table-card">
                <div className="card-body">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th className="col-1" style={{ width: "3%" }}>
                          #
                        </th>
                        <th className="col-1 text-center">Business Name</th>
                        <th className="col-2 text-center">Data</th>
                        <th className="col-1 text-center">Time</th>
                        <th className="col-1 text-center">Email</th>
                        <th className="col-1 text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((item, index) => (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td className="col-2 text-center">{item.name}</td>
                          <td className="col-2 text-center">{item.date}</td>
                          <td className="col-1 text-center">
                            {item.hour + ":" + item.minute}
                          </td>
                          <td className="col-2 text-center">{item.mail}</td>
                          <td className="col-1 text-center">
                            <img
                              className="delete-icon"
                              src={deleteIcon}
                              onClick={() => onRemove(item.name)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* <ul>
            {bookings.map((item, index) => (
              <li key={item.index}>
                {item.date}

                {item.mail}
                {item.hour}
                {item.minute}

                <button onClick={() => onRemove(item.id)}>x</button>
              </li>
            ))}
          </ul> */}
        </div>
      )}
      {bookings.length == 0 && (
        <div className="row justify-content-center">
          <div className="col-12 col-sm-6 text-center">
            <div className="card table-card">
              <div className="card-body">
                <span className="text_warning">No reservation to show</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
