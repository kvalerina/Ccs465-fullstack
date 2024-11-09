/* GET Homepage */
const index = (req, res) => {
    res.render('index', { title: "Trvalr Getaways"});
};

module.exports = {
    index
}