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
            𝑨𝒕 𝒍𝒐𝒗𝒊𝒏𝒈 𝑷𝒆𝒕 𝒄𝒂𝒓𝒆 𝑷𝒂𝒓𝒕𝒏𝒆𝒓𝒔...
          </p>

          <br />
          <a
            href="login.html"
            style={{
              textDecoration: "none",
              backgroundColor: "green",
              borderRadius: "10px",
              color: "white",
              fontSize: "30px",
              padding: "10px",
            }}
          >
            Book an Appointment!!
          </a>
        </div>
      </section>

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
