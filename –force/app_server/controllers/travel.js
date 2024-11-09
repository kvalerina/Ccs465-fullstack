/*GET travel view*/
const travel = (req, res) => {
    res.render('travel', { title: "Trvalr Getaways"});
};

module.exports = {
    travel
};