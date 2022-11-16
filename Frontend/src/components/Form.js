import { useState } from "react";
import React from "react";
import { AutoComplete } from "antd";
import axios from "axios";
import Geocode from "react-geocode";
import { useEffect } from "react";

const Form = ({ onAdd, onClear }) => {
  const [Keyword, setKeyword] = useState("");
  const [Distance, setDistance] = useState("");
  const [Category, setCategory] = useState("");
  const [Location, setLocation] = useState("");
  const [Autoloc, setAutoloc] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyDPfCiU0vTXj74so02Y0pGZkZqEfu9uP5o");
  }, []);

  //

  const onClick1 = async (e) => {
    e.preventDefault();
    if (!Location) {
      document.getElementById("Location").required = true;
    }
    const check1 = document.getElementById("form1");
    if (check1.checkValidity() === false) {
      check1.reportValidity();
    }

    // if (!Keyword) {
    //   alert("Please add a task");
    //   return;
    // }

    let lat, lng;
    if (Autoloc) {
      // 自动
      var res = await axios("https://ipinfo.io/json?token=ad3fd34d5b6c2b");

      const loc = res.data.loc.split(",");
      lat = loc[0];
      lng = loc[1];
      document.getElementById("Location").required = false;
    } else {
      // 输入的地址
      const res = await Geocode.fromAddress(Location);
      const location = res.results[0].geometry.location;
      document.getElementById("Location").required = true;
      lat = location.lat;
      lng = location.lng;
    }

    // console.log(lat, lng);
    onAdd({ Keyword, Distance, Category, lat, lng });
  };

  const onClick2 = (e) => {
    setKeyword("");
    setOptions([]);
    setDistance("");
    setCategory("");
    setLocation("");
    setAutoloc(false);
    onClear();
  };

  const onSearch = async (searchText) => {
    if (searchText === "") return setOptions([]);
    const res = await axios({
      method: "get",
      url: "https://hw8-project-368000.uw.r.appspot.com/autocomplete",
      // url: "http://localhost:8081/autocomplete",
      params: {
        text: searchText,
      },
      headers: {
        Authorization:
          "Bearer pvwAzDkoQqbsC8dzksa9R3ScsLuerrVw8b3RC0YuAVPJnasUdK3CLCgWyFEIH1wFS2iqW1Ykx3z1wFGaYGgHyxhiJ4dVvTrgg5Kqr-yl3ju7fpm3OrkdjefoGj9jY3Yx",
      },
    });
    console.log(res);
    const { terms, businesses, categories } = res.data;

    const allData = [
      ...terms.map((item) => ({ lable: item.text, value: item.text })),
      ...businesses.map((item) => ({ lable: item.name, value: item.name })),
      ...categories.map((item) => ({ lable: item.title, value: item.title })),
    ];
    setOptions(allData);
    console.log(allData);
  };

  return (
    <form className="row justify-content-center form" id="form1">
      {/* <div className="col"></div> */}

      <div className="col-12 col-sm-6 form-contetn">
        <div className="card mb-4">
          <div>
            <h3 className="text-center mt-4 md-4">Business Search</h3>
          </div>
          <div className="row">
            {/* <div className="col-10 col-sm-11 ms-4 my-3 autocomplete"> */}
            <div className="col-10 col-sm-11 ms-4 my-3">
              <label htmlFor="Keyword" className="form-label">
                Keyword<span className="star">*</span>
              </label>
              <div className="col-12 col-sm-12">
                <AutoComplete
                  // className="form-control"
                  popupClassName="auto-complete-list"
                  options={options}
                  onSearch={onSearch}
                  onSelect={(value) => setKeyword(value)}
                  children={
                    <div className="autocomplete">
                      <input
                        value={Keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="col-10 col-sm-11 form-control"
                        required
                      />
                    </div>
                  }
                  // value={Keyword}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-10 col-sm-6 ms-4 my-3">
              <label htmlFor="inputDistance">Distance</label>
              <input
                type="text"
                className="form-control"
                placeholder="10"
                value={Distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <div className="col-12 col-sm-4 me-sm-4 my-3 cate">
              <label htmlFor="inputCategory">
                Category<span className="star">*</span>
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="inputCategory"
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Default" defaultValue>
                  Default
                </option>
                <option value="Arts & Entertainment">
                  Arts & Entertainment
                </option>
                <option value="Health & Medical">Health & Medical</option>
                <option value="Hotels & Travel">Hotels & Travel</option>
                <option value="Food">Food</option>
                <option value="Professional Services">
                  Professional Services
                </option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-10 col-sm-11 ms-4 my-3">
              <label htmlFor="Location" className="form-label">
                Location<span className="star">*</span>
              </label>
              <input
                disabled={Autoloc}
                type="text"
                className="form-control"
                id="Location"
                name="Location"
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-check mx-4 my-1">
            <label className="form-check-label" htmlFor="flexCheckDefault">
              {" "}
              Auto-detect my location{" "}
            </label>
            <input
              className="form-check-input"
              type="checkbox"
              checked={Autoloc}
              id="flexCheckDefault"
              onChange={(e) => {
                setAutoloc(e.currentTarget.checked);
                setLocation("");
              }}
            />
          </div>
          <div className="row justify-content-center">
            <div className="col-8 text-center">
              {/* <input
                type="button"
                value="SUBMIT"
                className="btn btn-danger submit"
                onClick={onClick1}
              /> */}
              <button
                onClick={onClick1}
                type="submit"
                className="btn btn-danger submit"
              >
                Submit
              </button>
              <button
                onClick={onClick2}
                type="button"
                className="btn btn-primary"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="col"></div> */}
    </form>
  );
};

export default Form;
