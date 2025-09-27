import { useState, type FormEvent } from "react";
import styles from "./ChangePasswordForm.module.css";
import UserService from "../../services/UserService";
import { validateUserPasswords } from "../../userValidation/userValidation";
import { useAuth } from "../../../auth/context/useAuth";

function ChangePasswordForm() {
  const { setUser } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSumbit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    const error = validateUserPasswords(password, confirmPassword);
    if (error) {
      setError(error);
      return;
    }

    try {
      const response = await UserService.updatePassword(password);

      // 🔑 odświeżenie usera w AuthContext
      setUser(response.data);
      console.log("Registered", response);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSumbit}>
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        id="password"
        className={styles.input}
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <label className={styles.label} htmlFor="confirmPassword">
        Comfirm Password
      </label>
      <input
        id="email"
        className={styles.input}
        name="confirmPassword"
        type="confirmPassword"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className={styles.button} type="submit">
        Change Password
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

export default ChangePasswordForm;
