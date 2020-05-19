'use strict';
module.exports = (sequelize, DataTypes) => {
  const prodi = sequelize.define('prodi', {
    nama: DataTypes.STRING,
    akreditas: DataTypes.STRING
  }, {
    tableName: "prodis"
  });
  prodi.associate = function(models) {
    // associations can be defined here
    prodi.hasMany(models.mahasiswa,{
      as: 'mahasiswas',
      foreignKey: 'prodi_id'
    });
  };
  return prodi;
};