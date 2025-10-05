import styles from "./HomePage.module.css";
import { useAuth } from "../auth/context/useAuth";

function HomePage() {
  const { user } = useAuth();

  if (!user) {
    return <p>Nie jesteś zalogowany</p>;
  }

  return (
    <div>
      <h1 className={styles.s1}>Welcome {user.email}</h1>
      <h3 className={styles.h3}>Role: {user.role}</h3>
    </div>
  );
}

export default HomePage;
