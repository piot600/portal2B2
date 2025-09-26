import { useState } from "react";
import type { RegisterDto } from "../../../auth/types/userTypes";
import styles from "./AddUserForm.module.css";
import AdminService from "../../services/UserService";
import { validateEmail } from "../../../../utils/validation/userValidation/validateEmail";

function AddUserForm() {
  const [form, setForm] = useState<RegisterDto>({
    email: "",
    role: "employee",
  });
  const [error, setError] = useState("");

  async function handleSumbit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const response = await AdminService.addUser(form.email, form.role);
      console.log("Registered", response);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form className={styles.form} onSubmit={handleSumbit}>
      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <input
        id="email"
        className={styles.input}
        name="email"
        type="email"
        onChange={(e) => handleChange(e)}
      />

      <label className={styles.label} htmlFor="role">
        Role
      </label>
      <select
        id="role"
        className={styles.input}
        name="role"
        value={form.role}
        onChange={handleChange}
        required
      >
        <option value="employee">Employee</option>
        <option value="distributor">Distributor</option>
        <option value="manager">Export Manager</option>
        <option value="admin">Administrator</option>
        <option value="superadmin">Super Administrator</option>
      </select>

      <button className={styles.button} type="submit">
        Create account
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}

export default AddUserForm;
