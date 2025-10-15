import HomePageGroupButtons from "../components/HomePageGroupButtons";
import styles from "./page.module.css";
function HomePage() {
  return (
    <main>
      <div className={styles.buttonGroupWrapper}>
        <HomePageGroupButtons />
      </div>
    </main>
  );
}

export default HomePage;
