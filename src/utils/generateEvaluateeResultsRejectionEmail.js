module.exports = (name, evaluatee) => `<body
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
    <h2 style="font-size: 28; margin-bottom: 30px; text-align: center">
      Results Rejected
    </h2>
      <p
        style="
          line-height: 2rem;
          font-size: 1.2rem;

          color: black;
        "
      >
        Dear ${name},
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Evaluated <b>${evaluatee}</b> has rejected their final result of evaluation.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Please, join the system in order to see details.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        If you have any issues, please contact
        administrator using following email address:
        <a href="mailto:sekretariat.wit@pwr.edu.pl ">
          sekretariat.wit@pwr.edu.pl</a
        >
      </p>
  </section>
</div>
</body>

`
