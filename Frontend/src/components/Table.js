import React, { useState } from "react";
import axios from "axios";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FiClock } from "react-icons/fi";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Box from "@mui/material/Box";
// import { Tabs } from "antd";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SwipeableViews from "react-swipeable-views";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import twitter from "../images/twitter-logo.png";
import facebook from "../images/facebook-logo.png";

import { Navigation, Autoplay } from "swiper";
import { useEffect } from "react";
let map;
const Table = ({ tasks, onAdd1 }) => {
  const [showdetail, setShowdetail] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [firstTime, setfirstTime] = useState(false);
  const [Review, setReview] = useState({});
  const [detail, setdetail] = useState({
    categories: [],
    display_phone: "",
    hours: [],
    location: [],
    name: "",
    coordinates: [],
    photos: [],
    price: "",
    rating: 0,
    id: "",
  });
  const [value, setValue] = useState(0);
  const [isRight, setIsRight] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(bookings);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setIsRight(index > value ? true : false);
    setValue(index);
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const emialcheck = (e) => {
    setField("mail", e.target.value);

    if (firstTime) {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          form.mail
        )
      ) {
        setErrors({ ...errors, mail: "Email must be a valid email address" });
      }
    }
  };
  const findFormErrors = () => {
    const { mail, date, hour, minute } = form;
    const newErrors = {};
    if (!mail || mail === "") newErrors.mail = "Email is required";
    else if (
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        mail
      )
    )
      newErrors.mail = "Email must be a valid email address";
    if (!date || date === "") newErrors.date = "Date is required";
    if (!hour || hour === "") newErrors.hour = "select a hour!";
    if (!minute || minute === "") newErrors.minute = "cannot be blank!";
    // console.log(newErrors);
    return newErrors;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setForm({});
    setErrors({});
    setfirstTime(false);
    setIsModalOpen(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setfirstTime(true);
    } else {
      alert("Reservation created!");
      // setField("name", detail.name);
      // onAdd1({ ...form, name: detail.name });
      const oldBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      const newBookings = [...oldBookings, { ...form, name: detail.name }];
      // 加数据
      localStorage.setItem("bookings", JSON.stringify(newBookings));
      setIsModalOpen(false);
      setBookings(newBookings);
      // AddReservation(form, name, id);
    }
  };

  const { businesses, total } = tasks;
  const onclick1 = async (id) => {
    const res = await axios({
      method: "get",
      url: `https://hw8-project-368000.uw.r.appspot.com/detail/${id}`,
      // url: `http://localhost:8081/detail/${id}`,
      // params: {
      //   text: id,
      // },
      headers: {
        Authorization:
          "Bearer pvwAzDkoQqbsC8dzksa9R3ScsLuerrVw8b3RC0YuAVPJnasUdK3CLCgWyFEIH1wFS2iqW1Ykx3z1wFGaYGgHyxhiJ4dVvTrgg5Kqr-yl3ju7fpm3OrkdjefoGj9jY3Yx",
      },
    });
    const res1 = await axios({
      method: "get",
      url: "https://hw8-project-368000.uw.r.appspot.com/reviews",
      // url: "http://localhost:8081/reviews",
      params: {
        text: id,
      },
      headers: {
        Authorization:
          "Bearer pvwAzDkoQqbsC8dzksa9R3ScsLuerrVw8b3RC0YuAVPJnasUdK3CLCgWyFEIH1wFS2iqW1Ykx3z1wFGaYGgHyxhiJ4dVvTrgg5Kqr-yl3ju7fpm3OrkdjefoGj9jY3Yx",
      },
    });
    console.log(res1);
    setReview(res1.data.reviews);
    setdetail(res.data);
    console.log(res.data);
    setShowdetail(true);
  };

  const data = [
    ...businesses.map((item) => ({
      name: item.name,
      img: item.image_url,
      rating: item.rating,
      distance: item.distance,
      id: item.id,
    })),
  ];
  const {} = useLoadScript({
    googleMapsApiKey: "AIzaSyDPfCiU0vTXj74so02Y0pGZkZqEfu9uP5o",
  });
  const Twitter = (URL1, Text) => {
    const url = URL1;
    const text = "check " + Text + " on Yelp.";
    const link =
      "http://twitter.com/share?url=" +
      encodeURIComponent(url) +
      "&text=" +
      encodeURIComponent(text);
    window.open(link, "_blank");
  };
  const Facebook = (URL1) => {
    const url = URL1;
    const link =
      "http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
    window.open(link, "_blank");
  };

  const onRemove = () => {
    const newBookings = bookings.filter((item) => item.name !== detail.name);
    alert("Reservation cancelled!");
    setBookings(newBookings);

    // 改本地数据
    localStorage.setItem("bookings", JSON.stringify(newBookings));
  };

  const exist = bookings.findIndex((item) => item.name === detail.name) > -1;

  // console.log(businesses);
  return (
    <>
      {total === 0 && (
        <div className="row justify-content-center">
          <div className="col-12 col-sm-4 text-center">
            <div className="card table-card">
              <div className="card-body">
                <span className="text_warning">No reservation to show</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {!showdetail && businesses.length > 0 && (
        <div className="row col-12 col-sm-10 mx-auto">
          <div className="card mt-5 table-card1">
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="col-1" style={{ width: "3%" }}>
                      #
                    </th>
                    <th className="col-1 text-center">Image</th>
                    <th className="col-sm-3 col-8 text-center">
                      Business Name
                    </th>
                    <th className="col-1 text-center">Rating</th>
                    <th className="col-1 text-center">Distance (miles)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => onclick1(item.id)}
                      className="list-item"
                    >
                      <th>{index + 1}</th>
                      <td className="text-center">
                        <img src={item.img} alt="" className="img-fluid" />
                      </td>
                      <td className="col-sm-3 col-8 text-center">
                        {item.name}
                      </td>
                      <td className="col-1 text-center">{item.rating}</td>
                      <td className="col-1 text-center">
                        {parseInt(item.distance / 1600)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showdetail && businesses.length > 0 && (
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 deital-wrapper">
            <div className="card mt-4 ">
              <ArrowLeftOutlined
                className="arrow"
                onClick={() => setShowdetail(false)}
              />
              <h1 className="text-center">{detail.name}</h1>

              <TabContext value={value}>
                <TabList
                  value={value}
                  onChange={handleChange}
                  scrollButtons={true}
                  allowScrollButtonsMobile
                  variant="scrollable"
                  aria-label="visible arrows tabs example"
                  sx={{
                    [`& .${tabsClasses.scrollButtons}`]: {
                      "&.Mui-disabled": { opacity: 0.3 },
                    },

                    // [`& .${tabsClasses.scrollButtonsHideMobile}`]: {
                    //   "&.Mui-disabled": { opacity: 0.2 }
                    // }
                  }}
                >
                  <Tab
                    label={<span className="tab-label">Bussiness details</span>}
                    value={0}
                  />
                  <Tab
                    label={<span className="tab-label">Map location</span>}
                    value={1}
                  />
                  <Tab
                    label={<span className="tab-label">Reviews</span>}
                    value={2}
                  />
                </TabList>
                <SwipeableViews
                  axis={isRight ? "x" : "x-reverse"}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                  disableLazyLoading={true}
                >
                  <TabPanel value={0} index={value}>
                    <>
                      <div className="row text-center mt-4">
                        <div className="col-12 col-sm-6 ">
                          <div className="row">
                            <div className="col-12">
                              <h4>Address</h4>
                              <p>
                                {detail.location.address1 +
                                  detail.location.address2 +
                                  detail.location.address3 +
                                  " " +
                                  detail.location.city +
                                  " " +
                                  detail.location.state +
                                  " " +
                                  detail.location.zip_code}
                              </p>
                            </div>
                            <div className="col-12">
                              <h4>Phone</h4>
                              <p>{detail.display_phone}</p>
                            </div>
                            <div className="col-12">
                              <h4>Status</h4>
                              <p>
                                {detail.hours[0].is_open_now ? (
                                  <span className="text2">Open</span>
                                ) : (
                                  <span className="text1">Closed</span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="row">
                            <div className="col-12">
                              <h4>Category</h4>
                              <p>
                                {detail.categories
                                  .map((items) => items.title)
                                  .join(" | ")}
                              </p>
                            </div>
                            <div className="col-12">
                              <h4>Price range</h4>
                              <p>{detail.price}</p>
                            </div>
                            <div className="col-12">
                              <h4>Visit ylep for more</h4>
                              <a
                                className="blink"
                                target="_blank"
                                href={detail.url}
                              >
                                Business link
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="row mt-5">
                        <div className="col-6 text-center"></div>
                        <div className="col-6 text-center"></div>
                      </div>
                      <div className="row">
                        <div className="col-6 text-center"></div>
                        <div className="col-6 text-center"></div>
                      </div>
                      <div className="row">
                        <div className="col-6 text-center"></div>
                        <div className="col-6 text-center"></div>
                      </div> */}
                      <div className="row">
                        <div className="col-12 text-center">
                          {exist ? (
                            <button
                              type="button"
                              class="btn btn-primary"
                              onClick={onRemove}
                            >
                              Cancel reservation
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={showModal}
                            >
                              Reserve Now
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 text-center mt-4 mb-3">
                          Share on:
                          <img
                            src={twitter}
                            className="share"
                            onClick={() => Twitter(detail.url, detail.name)}
                          />
                          <img
                            src={facebook}
                            className="share"
                            onClick={() => Facebook(detail.url)}
                          />
                        </div>
                      </div>

                      <div>
                        <Swiper
                          navigation={true}
                          modules={[Navigation, Autoplay]}
                          autoplay
                        >
                          {detail.photos.map((item, index) => (
                            <SwiperSlide key={index}>
                              <img
                                src={item}
                                alt=""
                                className='"img-fluid" '
                                width={300}
                                height={300}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                      <Modal show={isModalOpen} onHide={handleCancel}>
                        <Modal.Header>
                          <Modal.Title>
                            <h4>Reservation form</h4>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h5 className="text-center">{detail.name}</h5>

                          <Form id="reserveForm">
                            <Form.Group>
                              <Form.Label htmlFor="mail" className="form-label">
                                Email
                              </Form.Label>
                              <Form.Control
                                type="text"
                                className="form-control"
                                name="mail"
                                id="mail"
                                onChange={(e) => emialcheck(e)}
                                isInvalid={!!errors.mail}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.mail}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label htmlFor="date" className="form-label">
                                Date
                              </Form.Label>
                              <Form.Control
                                type="date"
                                className="form-control"
                                name="date"
                                id="date"
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) =>
                                  setField("date", e.target.value)
                                }
                                isInvalid={!!errors.date}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.date}
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group style={{ display: "inline" }}>
                              <Form.Label htmlFor="hour" className="form-label">
                                Time
                              </Form.Label>
                              <br></br>
                              <div style={{ display: "inline" }}>
                                <Form.Control
                                  as="select"
                                  id="hour"
                                  className="form-control"
                                  name="hour"
                                  style={{
                                    width: "100px",
                                    display: "inline",
                                  }}
                                  onChange={(e) =>
                                    setField("hour", e.target.value)
                                  }
                                  isInvalid={!!errors.hour}
                                >
                                  <option
                                    selected
                                    disabled
                                    style={{ display: "none" }}
                                    defaultValue=""
                                  ></option>
                                  <option value="10">10</option>
                                  <option value="11">11</option>
                                  <option value="12">12</option>
                                  <option value="13">13</option>
                                  <option value="14">14</option>
                                  <option value="15">15</option>
                                  <option value="16">16</option>
                                  <option value="17">17</option>
                                </Form.Control>
                              </div>
                            </Form.Group>
                            <p style={{ display: "inline" }}> : </p>
                            <div style={{ display: "inline" }}>
                              <Form.Group style={{ display: "inline" }}>
                                <Form.Control
                                  as="select"
                                  id="minute"
                                  className="form-control"
                                  name="minute"
                                  style={{
                                    width: "100px",
                                    display: "inline",
                                  }}
                                  onChange={(e) =>
                                    setField("minute", e.target.value)
                                  }
                                  isInvalid={!!errors.minute}
                                >
                                  <option
                                    selected
                                    disabled
                                    style={{ display: "none" }}
                                    defaultValue=""
                                  ></option>
                                  <option value="00">00</option>
                                  <option value="15">15</option>
                                  <option value="30">30</option>
                                  <option value="45">45</option>
                                </Form.Control>

                                <div
                                  style={{ display: "inline" }}
                                  className="mx-2  "
                                >
                                  <FiClock size={18} />
                                </div>
                              </Form.Group>
                            </div>
                            <div className="text-center my-3">
                              <Button className="btn-danger" onClick={onSubmit}>
                                Submit
                              </Button>
                              {/* <Button type="submit">Submit form</Button> */}
                            </div>
                          </Form>
                        </Modal.Body>

                        <Modal.Footer>
                          <Button onClick={handleCancel} className="btn-dark">
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  </TabPanel>
                  <TabPanel value={1} index={value}>
                    <div className="map-wrapper">
                      <GoogleMap
                        zoom={13}
                        center={{
                          lat: detail.coordinates.latitude,
                          lng: detail.coordinates.longitude,
                        }}
                        mapContainerClassName="map-container"
                      >
                        <Marker
                          position={{
                            lat: detail.coordinates.latitude,
                            lng: detail.coordinates.longitude,
                          }}
                        />
                      </GoogleMap>
                    </div>
                  </TabPanel>
                  <TabPanel value={2} index={value}>
                    <>
                      <table className="table table-striped mb-0">
                        <tbody>
                          {Review.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <b>{item.user.name}</b>
                                <p>Rating:{item.rating}/5</p>
                                <p>{item.text}</p>
                                <p>{item.time_created.split(" ")[0]}</p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  </TabPanel>
                </SwipeableViews>
              </TabContext>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
