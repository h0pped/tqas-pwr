module.exports = (name) => `
<body
style="
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: Roboto, Arial, Helvetica, sans-serif;
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
    <div style="width: 100%; display: flex; justify-content: flex-end;">
        <p style="font-weight: bold; color: #D9372A">[EN]</p>
    </div>
    <h2 style="font-size: 28; margin-bottom: 30px; text-align: center;color:black">
        New outlined evaluation schedule
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
        We received in our system newly created <b>Outlined  evaluation schedule</b> that is waiting for your approval.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Please, join <span><a href="https://google.com" style="font-weight:bold;">Teaching Quality Assurance System</a></span> and assign <b>evaluation teams</b> to it.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        If you have any issues, please contact
        administrator using following email address:
        <a href="mailto:jakosc.wit@pwr.edu.pl" style="font-weight:bold;">
          jakosc.wit@pwr.edu.pl</a
        >
      </p>
      <br />
      <div style="width: 100%; display: flex; justify-content: flex-end; border-top: dashed #B8B8B8;">
          <p style="font-weight: bold; color: #D9372A">[PL]</p>
      </div>
      <h2 style="font-size: 28; margin-bottom: 30px; text-align: center;color:black">
        Nowy ramowy harmonogram hospitacji zajęć
    </h2>
    <div style="margin-bottom: 30px; text-align: left">
      <p
        style="
          line-height: 2rem;
          font-size: 1.2rem;

          color: black;
        "
      >
        Witaj!
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Otrzymaliśmy w naszym systemie nowo utworzony <b>Ramowy harmonogram hospitacji zajęć</b>, który czeka na Twoją akceptację.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Dołącz do <span><a href="https://google.com" style="font-weight:bold;">Systemu Zapewniania Jakości Kształcenia</a></span> i wyznacz <b>zespóły hospitujący</b>.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Jeśli masz jakiekolwiek problemy, skontaktuj się z administratorem za pomocą
        następującego adresu e-mail:
        <a href="mailto:jakosc.wit@pwr.edu.pl ">
            jakosc.wit@pwr.edu.pl
        </a>
    </p>
    </div>
  </section>
</div>
</body>
`
