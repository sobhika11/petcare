import Services from "./Services";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="sec">
        <div id="dog"></div>

        <div style={{ float: "left" }}>
          <p style={{ fontSize: "50px", color: "black" }}>
            Your pet DESERVES<br /> to be Pampered!🐾
          </p>

          <p id="miss">
            At Loving petcare ,we take care of your beloved tiny members💕
          </p>

          <br />
        </div>
      </section>
      <Services/>
      <p>We Will Take Care Of your Beloved Cuties❤</p>

      <section>
        <table cellPadding="10">
          <tbody>
            <tr>
              <td><img src="/Images/main3.jpg" width="400" /></td>
              <td><img src="/Images/main2.avif" width="400" /></td>
            </tr>
            <tr>
              <td><img src="/Images/main4.avif" width="500" /></td>
              <td><img src="/Images/main5.jpg" width="500" /></td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Home;
