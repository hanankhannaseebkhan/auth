import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      } else {
        try {
          const { data } = await axios.post(
            "http://localhost:4000/protected", // Protected route on backend
            {},
            { withCredentials: true }
          );
          const { status, username } = data;

          if (status) {
            setUsername(username);
            toast(`Hello ${username}`, {
              position: "top-right",
            });
          } else {
            removeCookie("token");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error verifying cookie", error);
          removeCookie("token");
          navigate("/login");
        }
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <>
      <div className="home_page">
        <h4>Welcome <span>{username}</span></h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
