const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code:{
      type:DataTypes.STRING(5),
      allowNull:false,
      primaryKey:true
    },
    name:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    age:{
      type:DataTypes.INTEGER,
      get(){
        if(this.getDataValue("age")===null) return null
        return `${this.getDataValue("age")} years old`
      }
    },
    race:{
      type:DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', "Other"),
      defaultValue: "Other"
    },
    hp:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    mana:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    date_added:{
      type:DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
  },{timestamps: false})
}