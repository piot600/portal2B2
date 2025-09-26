import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import styles from "./Login.module.css";

function Login() {
  const location = useLocation();

  return (
    <div className={styles.login}>
      <h1 className={styles.h1}>Login</h1>
      {location.state && <p>{location.state.message}</p>}
      <LoginForm />
    </div>
  );
}

export default Login;
