import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import About from "./components/About";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isSignUpPage, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState("buy");

  const navigate = useNavigate();

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const updateConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const submit = async () => {
    if (!isSignUpPage) {
      const response = await axios.post("http://localhost:3001/signin", {
        username,
        password,
      });

      if (response.status === 201) {
        setErrorText("Invalid username/password");
      } else if(response.status === 202){
        navigate("/invalidUser");
        return
      } else {
        navigate("/seller", {
          state: {
            username,
          },
        }); 
      }
    } else {
      try{
        if(!validateEmail(email)){
          setErrorText("Invalid email");
          return;
        }
        if(password !== confirmPassword){
          setErrorText("Passwords do not match");
          return;
        }
        const response = await axios.post("http://localhost:3001/register", {
          username,
          email,
          password,
          userType,
        });
        if (response.status == 200) {
          setEmail("");
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          setErrorText("");
          setSuccessText("Registration Successful");
        }
      } catch(err){
        setSuccessText("");
        setErrorText("username or email already exists");
      }
    }
  };

  const toggleRegisterLogin = async () => {
    setSuccessText("");
    setErrorText("");
    setUsername("");
    setPassword("");
    setIsSignUp(!isSignUpPage);
  };

  const formtext = isSignUpPage ? "Register" : "Login";
  return (
    <div className="App">
      <div className="left-div">
        <About />
      </div>
      <div className="right-div">
        <div className="signin-form">
          <table>
            <caption className="signin-caption">{formtext}</caption>
            <tr>
              <td>
                <p className="username">Username:</p>
              </td>
              <td>
                <input type="text" value={username} onChange={updateUsername} />
              </td>
            </tr>
            {isSignUpPage && <tr>
              <td>
                <p className="username">Email:</p>
              </td>
              <td>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </td>
            </tr>}
            <tr>
              <td>
                <p>Password:</p>
              </td>
              <td>
                <input
                  type="password"
                  value={password}
                  onChange={updatePassword}
                />
              </td>
            </tr>
            {isSignUpPage && (
              <tr>
                <td>
                  <p>Confirm password:</p>
                </td>
                <td>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={updateConfirmPassword}
                  />
                </td>
              </tr>
            )}
            {isSignUpPage && (
              <tr>
                <td>
                  <p>Buy or Sell</p>
                </td>
                <td>
                  <select onChange={(e) => setUserType(e.target.value)}>
                    <option value="buy">buy</option>
                    <option value="sell">sell</option>
                  </select>
                </td>
              </tr>
            )}
          </table>
          {errorText && <p className="error-msg">{errorText}</p>}
          {successText && <p className="success-msg">{successText}</p>}
          <button onClick={submit}>
            {isSignUpPage ? "Register" : "Sign in"}
          </button>
          <h4 className="line-header">
            <span className="line-text">or</span>
          </h4>
          <button onClick={toggleRegisterLogin}>
            {isSignUpPage ? "Already have an account?" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
