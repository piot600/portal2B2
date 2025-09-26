import styles from "./HomePage.module.css";
import { useAuth } from "../auth/context/useAuth";

function HomePage() {
  const { user } = useAuth();

  if (!user) {
    return <p>Nie jesteś zalogowany</p>;
  }

  return (
    <div>
      <h1 className={styles.s1}>Witaj {user.email}</h1>
      <p>Twoja rola: {user.role}</p>
    </div>
  );
}

export default HomePage;
