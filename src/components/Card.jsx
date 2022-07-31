import "../styles/Card.css";
import axios from "axios";

function card(props) {
  const { properties } = props;
  const image = properties.image;
  const totalImage = `data:image/jpeg;base64,${image.data}`;

  const deleteProperty = async () => {
    const { status } = await axios.post(
      "http://localhost:3001/deleteProperty",
      {
        id: properties.id || 0,
        username: props.username,
      }
    );

    if (status != 200) {
      alert("Error deleting property");
    } else {
      props.getProperties();
    }
  };

  const propertyDetails = {
    location: properties.location,
    age: properties.age,
    bedrooms: properties.bedrooms,
    additionalFacilities: properties.additionalFacilities,
  };

  return (
    <div className="card">
      <img src={totalImage} alt="" />
      <table>
        <caption>Property Details</caption>
        <tr>
          <td>location:</td>
          <td>{propertyDetails.location}</td>
        </tr>
        <tr>
          <td>age:</td>
          <td>{propertyDetails.age}</td>
        </tr>
        <tr>
          <td>Bedroom count:</td>
          <td>{propertyDetails.bedrooms}</td>
        </tr>
        <tr>
          <td>facilities:</td>
          <td>{propertyDetails.additionalFacilities}</td>
        </tr>
      </table>
      <div className="buttons">
        <button>Edit property details</button>
        <button onClick={deleteProperty}>Delete this Property</button>
      </div>
    </div>
  );
}

export default card;
