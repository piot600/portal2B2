import AddUserForm from "../components/AddUserForm/AddUserForm";
import styles from "./AddUserPage.module.css";

function AddUserPage() {
  return (
    <div className={styles.register}>
      <h1 className={styles.h1}>Register</h1>
      <AddUserForm />
    </div>
  );
}

export default AddUserPage;
