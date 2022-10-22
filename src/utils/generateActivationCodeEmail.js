module.exports = (name, code) => `<body
style="
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: sans-serif;
"
>
<div>
  <header
    style="
      background-color: #d9372a;
      color: white;
      flex-direction: column;
      padding: 20px;
    "
  >
    <h1 style="font-size: 28; margin-bottom: 30px; text-align: center">
      Teaching Quality Assurance System
    </h1>
  
    <h4 style="font-size: 16; margin-bottom: 30px; text-align: center; color:white;">
      Faculty of Computer Science And Telecommunication
    </h4>
  </header>
  <section>
    <h2 style="font-size: 28; margin-bottom: 30px; text-align: center">
      Account Activation
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

      <p style="line-height: 2rem; font-size: 1.2rem; color: black">
        We received a request to activate your account
      </p>

      <p style="line-height: 2rem; font-size: 1.2rem; color: black">
        Your code: ${code}
      </p>

      <p style="line-height: 2rem; font-size: 1.2rem; color: black">
        If you did not send a request to activate your account, please,
        disregard this email and do not share the activation code with
        anybody.
      </p>

      <p style="line-height: 2rem; font-size: 1.2rem; color: black">
        If you have any issues with account activation, please contact
        administrator using following email address:
        <a href="mailto:sekretariat.wit@pwr.edu.pl ">
          sekretariat.wit@pwr.edu.pl</a
        >
      </p>
    </div>
  </section>
</div>
</body>
`
