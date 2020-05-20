const {
  mahasiswa,
  Sequelize
} = require('../models/index');
const Op = Sequelize.Op;

let self = {};

const r_success = require('./function/return_success.function');
const r_error = require('./function/return_error.function');
const {e_get_id, e_get_all, e_search} = require('./variable/actiom.variable');

// get all data
self.getAll = (req, res) => {
  mahasiswa.findAll({
    include:['prodi']
  }).then((data) => {
    if(data){      
      r_success(res, data);
    }else{
      r_error(res, e_get_all);
    }
  }).catch((err) => {
    r_error(res, err);
  });
}

// get data base on id
self.get = (req, res) => {
  mahasiswa.findOne({
    include:['prodi'],
    where:{
      id:req.params.mahasiswaId
    }
  }).then((data) => {
    if(data){
      r_success(res, data);
    }else{
      r_error(res, e_get_id);
    }
  }).catch((err) => {
    r_error(res, err);
  });
}

// search data base on name or prodis
self.search = (req, res) => {
  let text = req.query.text;
  mahasiswa.findAll({
    include:['prodi'],
    where:{
      [Op.or]:{
        nama:{
          [Op.like]:`%${text}%`
        },
        '$prodi.nama$':{
          [Op.like]:`%${text}%`
        }
      }
    }
  }).then((data) => {
    if(data){
      r_success(res, data);
    }else{
      r_error(res, e_search);
    }
  }).catch((err) => {
    r_error(res, err);
  }); 
}

// create new data
self.save = (req, res) => {
  mahasiswa.create(req.body)
    .then((data) => {
      if(data){
        r_success(res, data);
      }
    }).catch((err) => {
      r_error(res, err);
    });
}

// update data base on id
self.update = (req, res) => {
  mahasiswa.update(req.body, {
    where:{
      id:req.params.mahasiswaId
    }
  }).then((data) => {
    if(data){
      r_success(res, data);
    }else{
      r_error(res, e_get_id);
    }
  }).catch((err) => {
    r_error(res, err);
  });
}

// delete data base on id
self.delete = (req, res) => {
  mahasiswa.destroy({
    where:{
      id:req.params.mahasiswaId
    }
  }).then((data) => {
    if(data){
      r_success(res, data);
    }else{
      r_error(res, e_get_id);
    }
  }).catch((err) => {
    r_error(res, err);
  });
}


module.exports = self;