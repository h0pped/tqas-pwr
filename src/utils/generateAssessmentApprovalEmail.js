module.exports = (name, semester) =>
  `
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
    <h2 style="font-size: 28; margin-bottom: 30px; text-align: center">
      Assessment schedule approval
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
        Assessment schedule for <b>${semester} Semester</b> has been successfully approved by a supervisor and evaluation teams were assigned.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Please, join the system in order to see approved assessment schedule.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        If you have any issues, please contact
        administrator using following email address:
        <a href="mailto:jakosc.wit@pwr.edu.pl ">
          jakosc.wit@pwr.edu.pl</a
        >
      </p>
      <br />
      <div style="width: 100%; display: flex; justify-content: flex-end; border-top: dashed #B8B8B8;">
          <p style="font-weight: bold; color: #D9372A">[PL]</p>
      </div>
      <h2 style="font-size: 28; margin-bottom: 30px; text-align: center">
        Zatwierdzenie ramowego harmonogramu
      </h2>
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
            Ramowy harmonogram hospitacji zaj???? <b>${semester} Semestr</b> zosta?? pomy??lnie zatwierdzony przez prze??o??onego i przydzielono zespo??y hospituj??cy.
        </p>
  
        <p style="line-height: 2rem; font-size: 1rem; color: black">
            Do????cz do systemu, aby zobaczy?? zatwierdzony harmonogram hospitacji.
        </p>
  
        <p style="line-height: 2rem; font-size: 1rem; color: black">
            Je??li masz jakiekolwiek problemy, skontaktuj si?? z administratorem za pomoc??
            nast??puj??cego adresu e-mail:
            <a href="mailto:jakosc.wit@pwr.edu.pl ">
                jakosc.wit@pwr.edu.pl
            </a>
        </p>
  </section>
</div>
</body>
`
