module.exports = app => {
    const { STRING } = app.Sequelize;

    const User = app.model.define(
        "user",
        { name: STRING(30) },
        { timestamps: false }
    );
    // User.sync({force: true})

    return User;
};