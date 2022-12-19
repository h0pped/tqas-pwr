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
        You have been assigned to evaluation team
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
        You have been assigned to one of the evaluation teams. Your collegues from this team have been notified about it too, and now its time for you to discuss and decide when you will visit the class of indicated teacher and evaluate them.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Please, make sure you have an account in Teaching Quality Assurance System and reviewed upcoming evaluation in the "EVALUATIONS" tab after logging in.
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
        Zostałeś przydzielony do zespołu hospitującego
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
        Zostałeś przydzielony do jednego z zespołów hospitujących. Twoi koledzy z tego zespołu również zostali o tym powiadomieni, a teraz nadszedł czas, abyś przedyskutowałi i zdecydowałi, kiedy odwiedzają klasę wskazanego hospitowanego.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Prosimy o upewnienie się, że mają Państwo konto w Systemie Zapewnienia Jakości Kształcenia i przejrzeli nadchodzącą hospitacja w zakładce "HOSPITACJI" po zalogowaniu.
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
