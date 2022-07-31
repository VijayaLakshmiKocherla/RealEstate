import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/seller.css";
import { useRef } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

export default function Seller() {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { username } = state;
  if(username != '') localStorage.setItem("username", username);
  const [errorText, setErrorText] = useState("");
  const [properties, setProperties] = useState({});
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [file, setFile] = useState();
  const [additionalFacilities, setAdditionalFacilities] = useState("");

  useEffect(() => {
    const getProperties = async () => {
      const { status, data } = await axios.post(
        "http://localhost:3001/getProperties",
        {
          username: localStorage.getItem("username"),
        }
      );

      if (status != 200) {
        setErrorText("Error retrieving properties");
      } else {
        console.log(data);
        setProperties(data);
      }
    };
    getProperties();
  }, []);

  const getProperties = async () => {
    const { status, data } = await axios.post(
      "http://localhost:3001/getProperties",
      {
        username: localStorage.getItem("username"),
      }
    );

    if (status != 200) {
      setErrorText("Error retrieving properties");
    } else {
      console.log(data);
      setProperties(data);
    }
  };

  const browsefile = () => {
    inputRef.current.click();
  };

  const clearState = () => {
    setErrorText("");
    setLocation("");
    setAge("");
    setBedrooms("");
    setFile("");
    setAdditionalFacilities("");
  };

  const signout = () => {
    localStorage.removeItem("username");
    navigate("/");
  }

  const handleFileChange = (event) => {
    const fileobj = event.target.files && event.target.files[0];
    if (!fileobj) return;
    setFile(fileobj);
  };

  const onSubmit = async () => {
    if(!location || !age || !bedrooms || !file || !additionalFacilities){
      setErrorText("Please fill in all fields");
      return;
    }

    if((/^[0-9]*$/).test(age) == false){
      setErrorText("Age must be a number");
      return;
    }
    if((/^[0-9]*$/).test(age) == false){
      setErrorText("Bedrooms must be a number");
      return;
    }
    const formData = new FormData();
    formData.append("id", properties.length + 1);
    formData.append("username", localStorage.getItem("username"));
    formData.append("file", file);
    formData.append("location", location);
    formData.append("age", age);
    formData.append("bedrooms", bedrooms);
    formData.append("additionalFacilities", additionalFacilities);
    const { status } = await axios.post(
      "http://localhost:3001/addProperty",
      formData
    );

    if (status !== 200) {
      console.log("failed to add property");
    } else {
      await getProperties();
      clearState();
    }
  };

  return (
    <div className="main-div">
      <div className="seller-left-div">
        <div className="title">
          <h1>Fortune Estate</h1>
        </div>
        <table className="seller-property">
          <caption>Add new property here</caption>
          <tr>
            <td>location:</td>
            <td>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>age:</td>
            <td>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Bedroom count:</td>
            <td>
              <input
                type="text"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>facilities:</td>
            <td>
              <textarea
                value={additionalFacilities}
                onChange={(e) => setAdditionalFacilities(e.target.value)}
                rows="5"
              />
            </td>
          </tr>
          <tr>
            <td>upload image:</td>
            <td>
              <input
                type="file"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={handleFileChange}
              />
              <button onClick={browsefile}>browse</button>
            </td>
          </tr>
        </table>
        <p style={{color: "red"}}>{errorText}</p>
        <button onClick={onSubmit}>Add Property</button>
        <button onClick={signout} className="sign-out">Sign out</button>
      </div>
      <div className="main-content">
        {properties.length > 0 &&
          properties.map((property, index) => {
            return (
              <Card
                className="card"
                key={index}
                properties={property}
                username={localStorage.getItem("username")}
                getProperties={getProperties}
              />
            );
          })}
      </div>
    </div>
  );
}
