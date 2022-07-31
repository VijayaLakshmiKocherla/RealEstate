import "../styles/InvalidUser.css";
import { useNavigate } from "react-router-dom";

function InvalidUser() {

    const navigate = useNavigate();
    const signout = () => {
        localStorage.removeItem("username");
        navigate("/");
    }
  return (
    <div className="invalid-user-div">
      <p className="invalid-user-text">user page other than seller's is not built yet.</p>
      <button className="signout-button" onClick={signout}>Signout</button>
    </div>
  );
}

export default InvalidUser;
