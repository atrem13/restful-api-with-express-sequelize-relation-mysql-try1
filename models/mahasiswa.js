'use strict';
module.exports = (sequelize, DataTypes) => {
  const mahasiswa = sequelize.define('mahasiswa', {
    prodi_id: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    angkatan: DataTypes.INTEGER
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