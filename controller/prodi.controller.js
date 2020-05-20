const {
  prodi,
  Sequelize
} = require('../models/index');

const Op = Sequelize.Op;

let self = {};

const r_success = require('./function/return_success.function');
const r_error = require('./function/return_error.function');
const {e_get_id, e_get_all, e_search} = require('./variable/actiom.variable'); 

// get all data
self.getAll =(req, res) => {
    let data = prodi.findAll({})
    .then((data) => {
      if(data){
        r_success(res, data);
      }else{
        r_error(res, e_get_all);
      }
    }).catch((err) => {
      r_error(res, err);
    });
}

// get all data with his relation
self.getWithMahasiswa = (req, res) => {
    prodi.findAll({
      include:['mahasiswas']
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
    let id =  req.params.prodiId;
    prodi.findByPk(id, {
      include:['mahasiswas']
    }).then((data) => {
      if(data){
        r_success(res, data);
      }else{
        r_error(res, e_get_id);
      }
    }).catch((err) => {
      r_error(err);
    });
}

// search data base on name or mahasiswa name
self.seacrh = (req, res) => {
    let text = req.query.text;
    prodi.findAll({
      include:['mahasiswas'],
      where:{
        [Op.or]:{
          nama:{
            [Op.like]:`%${text}%`
          },
          '$mahasiswas.nama$':{
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
    prodi.create(req.body)
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
    let id = req.params.prodiId;
    prodi.update(req.body, {
      where:{
        id:id
      }
    }).then((data) => {
      if(data[0]){
        r_success(res, data);
      }else{
        r_error(res, e_get_id);
      }
    }).catch((err) => {
      r_error(res, err);
    });
}

// delete data base on id
self.delete = (req, res)=>{
    let id = req.params.prodiId;
    prodi.destroy({
      where:{
        id:id
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

// export all function
module.exports = self;
