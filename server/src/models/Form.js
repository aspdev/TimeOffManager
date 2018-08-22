
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    dateFrom: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dateTo: {
      type: DataTypes.DATE,
      allowNull: false
    },
    numberOfDaysRequested: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    selectedType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
  return Form
}
