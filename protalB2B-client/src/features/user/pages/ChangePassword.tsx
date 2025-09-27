import ChangePasswordForm from "../components/ChangePasswordForm/ChangePasswordFrom";
import styles from "./ChangePassword.module.css";

function ChangePassword() {
  return (
    <div className={styles.register}>
      <h1 className={styles.h1}>Change Password</h1>
      <ChangePasswordForm />
    </div>
  );
}

export default ChangePassword;
