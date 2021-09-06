const { STRING } = require("sequelize");
module.exports = {
  schema: {
    name: STRING(30)
  },
  options: {
    timestamps: false
  }
};