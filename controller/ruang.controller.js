const {
  ruang,
  Sequelize
} = require('../models/index');

const Op = Sequelize.Op;

let self = {}

const r_succes = require('./function/return_success.function');
const r_error = require('./function/return_error.function');
const {e_get_id, e_get_all, e_search} = require('./variable/actiom.variable');

self.getAll = (req, res) => {
  ruang.findAll({})
  .then((data) => {
    if(data){
      r_succes(res, data);
    }else{
      r_error(res, e_get_all);
    }
  }).catch((err) => {
    r_error(res, err);
  });
}

self.get = (req, res) => {
  let id = req.params.ruangId;
  ruang.findByPk(id,{})
  .then((data) => {
    if(data){
      r_succes(res, data);
    }else{
      r_error(res, e_get_id);
    }
  }).catch((err) => {
    r_error(res, err);
  });
}

self.search = (req, res) => {
  let text = req.query.text;
  ruang.findAll({
    where:{
      nama:{
        [Op.like]:`%${text}%`
      }
    }
  }).then((data) => {
    if(data){
      r_succes(res, data);
    }else{
      r_error(res, e_search);
    }
  }).catch((err) => {
    r_error(res, err);
  });
}

self.save = (req, res) => {
  ruang.create(req.body)
  .then((data) => {
    if(data){
      r_succes(res, data)
    }
  }).catch((err) => {
    r_error(res, err);
  });
}

self.update = (req, res) => {
  let id = req.params.ruangId;
  ruang.update(req.body, {
    where:{
      id:id
    }
  }).then((data) => {
    if(data[0]){
      r_succes(res, data);
    }else{
      r_error(res, e_get_id);
    }
  }).catch((err) => {
    r_error(res, err);
  });
}

self.delete = (req, res) => {
  let id = req.params.ruangId;
  ruang.destroy({
    where:{
      id:id
    }
  }).then((data) => {
    if(data){
      r_succes(res, data);
    }else{
      r_error(res, e_get_id);
    }
  }).catch((err) => {
    r_error(res, err);
  });
}

module.exports = self;