'use strict';
module.exports = (sequelize, DataTypes) => {
  const mahasiswa = sequelize.define('mahasiswa', {
    prodi_id: {
      allowNull:false,
      type:DataTypes.INTEGER,
      validate:{
        notNull:{
          msg:'prodi_id cant be null'
        }
      }
    },
    nama: {
      allowNull:false,
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'name cant be empty string'
        },
        notNull:{
          msg:'name cant be null'
        }
      }
    },
    angkatan: {
      allowNull:false,
      type:DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg:'name cant be empty string'
        },
        notNull:{
          msg:'name cant be null'
        }
      }
    }
  }, {
    tableName: 'mahasiswas'
  });
  mahasiswa.associate = function(models) {
    // associations can be defined here
    mahasiswa.belongsTo(models.prodi,{
      as: "prodi",
      foreignKey: "prodi_id"
    });
  };
  return mahasiswa;
};