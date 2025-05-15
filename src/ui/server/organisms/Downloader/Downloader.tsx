import styles from "./Downloader.module.scss";

export const Downloader = () => {
  return (
    <div className={styles.downloader}>
      <ul>
        <li><a href="files/top_secret.pdf" target="_blank">Top Secret</a></li>
      </ul>
    </div>
  );
};
