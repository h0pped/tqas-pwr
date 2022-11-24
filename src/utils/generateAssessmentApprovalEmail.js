module.exports = (name, semester) => `<body
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
      Assessment Approval
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
        Assessment for <b>${semester} Semester</b> has been successfully approved by a supervisor and Evaluation Teams were assigned.
      </p>

      <p style="line-height: 2rem; font-size: 1rem; color: black">
        Please, join the system in order to see assessment status.
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
