module.exports = (firstTimestamp, secondTimestamp, comparisonValue) => {
    return firstTimestamp - secondTimestamp < comparisonValue
}
