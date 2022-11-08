module.exports = (name) => `<body
style="
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
"
>
<div>
  <header
    style="
      background: #D9372A;
      color: white;
      flex-direction: column;
      padding: 20px;
    "
  >
    <h1 style="font-size: 28; margin-bottom: 30px; text-align: center">
      Teaching Quality Assurance System
    </h1>
    <h4 style="font-size: 22; margin-bottom: 30px; text-align: center; color:white">
      Faculty of Information and Communication Technology
    </h4>
  </header>
  <section>
    <h2 style="font-size: 28; margin-bottom: 30px; text-align: center;color:black">
        New Outlined Schedule
    </h2>
    <div style="margin-bottom: 30px; text-align: left">
      <p
        style="
          line-height: 2rem;
          font-size: 1.2rem;

          color: black;
        "
      >
        Hello ${name},
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        We received in our system newly created <b>Outlined schedule</b> that is waiting for your approval.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Please, join <span><a href="https://google.com" style="font-weight:bold;">Teaching Quality Assurance System</a></span> and assign <b>Evaluation Team</b> to it.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        If you have any issues with account activation, please contact
        administrator using following email address:
        <a href="mailto:sekretariat.wit@pwr.edu.pl" style="font-weight:bold;">
          sekretariat.wit@pwr.edu.pl</a
        >
      </p>
    </div>
  </section>
</div>
</body>

`
