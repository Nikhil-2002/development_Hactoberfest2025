import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={`${styles.heroWrapper} center`}>
      <select className={styles.dropDown}>
        <option value="US">US</option>
        <option value="IN">IN</option>
      </select>
      <div className={`${styles.heroInner}`}>
        <h2 className={styles.headerText}>
          Turning E-Waste into a Sustainable Future.
        </h2>
        <div className={styles.slogan}>
          <p>Certified E-Waste Recycling</p>
        </div>
        <form action="/searchpincode" method="post">
          <div className={styles.inputLocation}>
            <i className="fas fa-map-marker-alt"> </i>
            <input
              type="text"
              name="pincode"
              placeholder="Enter your Pincode"
            />
            <i className={`${styles.arrow} fas fa-arrow-right`}>
            </i>
              <input type="submit" value="Submit"></input>
            
          </div>
        </form>
      </div>
      <div className={styles.heroImage}>
        <img
          src="https://cdn.discordapp.com/attachments/1148360486446956587/1152671171939151922/hero-4.png"
          alt=""
        />
      </div>
    </div>
  );
};
export default Hero;
