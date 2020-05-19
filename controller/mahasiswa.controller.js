const {
  mahasiswa,
  Sequelize
} = require('../models/index');

const Op = Sequelize.Op;

let self = {};

// get all data
self.getAll = (req, res) => {
  mahasiswa.findAll({
    include:['prodi']
  }).then((data) => {
    if(data){
      return res.json({
        status:'ok',
        data:data
      });
    }else{
      return res.status(404).json({
        status:'error',
        data:`database kosong`
      });
    }
  }).catch((err) => {
    return res.status(500).json({
      status:'error',
      data:err
    });
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
      return res.json({
        status:'ok',
        data:data
      });
    }else{
      return res.status(404).json({
        status:'error',
        data:`data with id ${req.params.mahasiswaId} doesnt exist`
      });
    }
  }).catch((err) => {
    return res.status(500).json({
      status:'error',
      data:err
    });
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
      return res.json({
        status:'ok',
        data:data
      });
    }else{
      return res.status(404).json({
        status:'error',
        data:`data with name ${text} doesnt exist`
      });
    }
  }).catch((err) => {
    return res.status(500).json({
      status:'error',
      data:err
    });
  }); 
}

// create new data
self.save = (req, res) => {
  mahasiswa.create(req.body)
    .then((data) => {
      return res.json({
        status:'ok',
        data:data
      });
    }).catch((err) => {
      return res.status(500).json({
        status:'error',
        data:err
      });
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
      return res.json({
        status:'ok',
        data:data
      });
    }else{
      return res.status(404).json({
        status:'error',
        data:`data with id ${req.params.mahasiswaId} doesnt exist`
      });
    }
  }).catch((err) => {
    return res.status(500).json({
      status:'error',
      data:err
    });
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
      return res.json({
        status:'ok',
        data:data
      });
    }else{
      return res.status(404).json({
        status:'error',
        data:`data with id ${req.params.mahasiswaId} doesnt exist`
      });
    }
  }).catch((err) => {
    return res.status(500).json({
      status:'error',
      data:err
    });
  });
}


module.exports = self;