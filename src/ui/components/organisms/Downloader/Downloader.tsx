import styles from "./Downloader.module.scss";
import { Logo } from "../../molecules/Logo";

const Downloader = () => {
  return (
    <div className={styles.downloader}>
      <Logo src="https://wearewiser.com/images/wiser-logo.svg" />
      <ul>
        <li><a href="files/top_secret.pdf" target="_blank">Top Secret</a></li>
      </ul>
    </div>
  );
};

export default Downloader;
