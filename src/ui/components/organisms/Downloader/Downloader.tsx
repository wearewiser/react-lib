import Link from "next/link";
import Cta from "../../atoms/Cta";

const Downloader = () => {
  return (
    <div>
      <h1>Download</h1>
      <ul>
        <li>
          <Cta href="files/top_secret.pdf" variant="primary" download>
            Top Secret
          </Cta>
        </li>
      </ul>
    </div>
  );
};

export default Downloader;
