import { useState, type FormEvent } from "react";
import type { CredentialsDto } from "../../types/userTypes";
import { useAuth } from "../../context/useAuth";
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [form, setForm] = useState<CredentialsDto>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();

    try {
      const response = await login(form.email, form.password);
      alert(response.message);
      console.log(response);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form id="form" className={styles.form}>
      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <input
        className={styles.input}
        id="email"
        name="email" // 👈 zamiast username
        type="text"
        onChange={(e) => handleChange(e)}
      />

      <label className={styles.label} htmlFor="password">
        {" "}
        Password
      </label>
      <input
        className={styles.input}
        id="password"
        name="password"
        type="password"
        onChange={(e) => handleChange(e)}
      />

      <button className={styles.button} onClick={handleSubmit}>
        submit
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

export default LoginForm;
