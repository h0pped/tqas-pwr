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
    <h2 style="font-size: 28; margin-bottom: 30px; text-align: center">
        New evaluation results
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
        Results of your evaluations are in!
      </p>


    <p style="line-height: 2rem; font-size: 1rem; color: black">
      We received the results of your evaluation and they are ready for your review. If you think that the final results are incorrect, or you believe that there was a mistake, you can reject your results.
    </p>

    <p style="line-height: 2rem; font-size: 1rem; color: black">
        Note: You only have 14 days in order to accept or reject your results.
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
