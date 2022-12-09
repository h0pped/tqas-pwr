module.exports = (name, semester, reason) => `
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
      Assessment schedule rejection
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
        Assessment schedule for <b>${semester} Semester</b> has been rejected by a supervisor and evaluation teams were NOT assigned.
      </p>
      <p>
        Reason: ${reason || '---'}
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Please, join the system in order to see rejected assessment schedule and make necessary adjustments.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        If you have any issues, please contact
        administrator using following email address:
        <a href="mailto:sekretariat.wit@pwr.edu.pl ">
          sekretariat.wit@pwr.edu.pl</a
        >
      </p>
      <br />
      <div style="width: 100%; display: flex; justify-content: flex-end; border-top: dashed #B8B8B8;">
          <p style="font-weight: bold; color: #D9372A">[PL]</p>
      </div>
      <h2 style="font-size: 28; margin-bottom: 30px; text-align: center">
        Odrzucenie ramowego harmonogramu
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
            Ramowy harmonogram hospitacji zajęć <b>${semester} Semestr</b> został pomyślnie odrzucony przez przełożonego i zespoły hospitujący NIE zostały przydzielone.
        </p>
        <p>
            Powód: ${reason || '---'}
          </p>
  
        <p style="line-height: 2rem; font-size: 1rem; color: black">
            Dołącz do systemu, aby zobaczyć odrzucony harmonogram hospitacji i dokonać niezbędnych korekt.
        </p>
  
        <p style="line-height: 2rem; font-size: 1rem; color: black">
            Jeśli masz jakiekolwiek problemy, skontaktuj się z administratorem za pomocą
            następującego adresu e-mail:
            <a href="mailto:sekretariat.wit@pwr.edu.pl ">
                sekretariat.wit@pwr.edu.pl
            </a>
        </p>
  </section>
</div>
</body>
`
