module.exports = (name, code) =>
    `
<body style="
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: Roboto, Arial, Helvetica, sans-serif;
">
    <div>
        <header style="
      background: #D9372A;
      color: white;
      flex-direction: column;
      padding: 20px;
    ">
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
            <h2 style="font-size: 28; margin-bottom: 30px; text-align: center">
                Account activation
            </h2>
            <p style="
          line-height: 2rem;
          font-size: 1.2rem;

          color: black;
        ">
                Hello ${name},
            </p>

            <p style="line-height: 2rem; font-size: 1rem; color: black">
                We received a request to activate your account.
            </p>

            <p style="line-height: 2rem; font-size: 1rem; color: black">
                Your code: <b>${code}</b>
            </p>

            <p style="line-height: 2rem; font-size: 1rem; color: black">
                If you did not send a request to activate your account, please
                disregard this email and do not share the activation code with
                anybody.
            </p>

            <p style="line-height: 2rem; font-size: 1rem; color: black">
                If you have any issues with account activation, please contact
                administrator using following email address:
                <a href="mailto:jakosc.wit@pwr.edu.pl ">
                    jakosc.wit@pwr.edu.pl
                </a>
            </p>
            <br />
            <div style="width: 100%; display: flex; justify-content: flex-end; border-top: dashed #B8B8B8;">
                <p style="font-weight: bold; color: #D9372A">[PL]</p>
            </div>
            <h2 style="font-size: 28; margin-bottom: 30px; text-align: center">
                Aktywacja konta
            </h2>
            <p style="
        line-height: 2rem;
        font-size: 1.2rem;

        color: black;
      ">
                Witaj!
            </p>

            <p style="line-height: 2rem; font-size: 1rem; color: black">
                Otrzymaliśmy prośbę o aktywację Twojego konta.
            </p>

            <p style="line-height: 2rem; font-size: 1rem; color: black">
                Kod aktywacyjny:  <b>${code}</b>
            </p>

            <p style="line-height: 2rem; font-size: 1rem; color: black">
                Jeśli nie wysłałeś prośby o aktywację konta, zignoruj tę wiadomość i nie udostępniaj nikomu kodu
                aktywacyjnego.
            </p>

            <p style="line-height: 2rem; font-size: 1rem; color: black">
                Jeśli masz jakiekolwiek problemy z aktywacją konta, skontaktuj się z administratorem za pomocą
                następującego adresu e-mail:
                <a href="mailto:jakosc.wit@pwr.edu.pl ">
                    jakosc.wit@pwr.edu.pl
                </a>
            </p>
        </section>
    </div>
</body>
`