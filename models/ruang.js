'use strict';
module.exports = (sequelize, DataTypes) => {
  const ruang = sequelize.define('ruang', {
    nama: {
      type:DataTypes.STRING,
      validate:{
        notNull:{
          msg:'name cant be null'
        },
        notEmpty:{
          msg:'name cant be empty string'
        }
      }
    },
    keterangan: {
      type:DataTypes.TEXT,
      validate:{
        notNull:{
          msg:'keterangan cant be null'
        },
        notEmpty:{
          msg:'keterangan cant be empty string'
        }
      }
    },
    kapasitas: {
      type:DataTypes.INTEGER,
      validate:{
        notNull:{
          msg:'kapasitas cant be null'
        },
        notEmpty:{
          msg:'kapasitas cant be empty string'
        },
        isNumeric:{
          msg:'kapasitas write with number'
        }
      }
    },
    status:{
      type:DataTypes.INTEGER
    }
  }, {
    tableName:'ruang'
  });
  ruang.associate = function(models) {
    // associations can be defined here
  };
  return ruang;
};