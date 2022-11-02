exports.addEvaluatee = (req, res) => {
    console.log(req.body)
    res.status(200).send({ msg: 'Evaluatee added' })
}
