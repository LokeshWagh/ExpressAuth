const signup = (req, res, next) => {
    const { name, password } = req.body;
    console.log(name, password);

    res.status(200).json({
        status: 200,
        message: "Working perfectly",
        data: []
    });
};

module.exports = {
    signup
};
