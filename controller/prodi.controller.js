const {
  prodi,
  Sequelize
} = require('../models/index');

const Op = Sequelize.Op;

let self = {};

// get all data
self.getAll = async (req, res) => {
  try{
    let data = await prodi.findAll({});
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    return res.status(500).json({
      status:'error',
      data:err
    });
  }
}

// get all data with his relation
self.getWithMahasiswa = async (req, res) => {
  try{
    let data = await prodi.findAll({
      include:['mahasiswas']
    });
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    return res.status(500).json({
      status:'error',
      data:err
    });
  }
}

// get data base on id
self.get = async (req, res) => {
  try{
    let id =  req.params.prodiId;
    let data = await prodi.findByPk(id, {
      include:['mahasiswas']
    });
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    return res.status(500).json({
      status:'error',
      data:err
    });
  }
}

// search data base on name or mahasiswa name
self.seacrh = async (req, res) => {
  try{
    let text = req.query.text;
    let data = await prodi.findAll({
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
    });
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    return res.status(500).json({
      status:'error',
      data:err
    });
  }
}

// create new data
self.save = async (req, res) => {
  try{
    let data = await prodi.create(req.body);
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    res.status(500).json({
      status:'error',
      data:err
    });
  }
}

// update data base on id
self.update = async (req, res) => {
  try{
    let id = req.params.prodiId;
    let data = await prodi.update(req.body, {
      where:{
        id:id
      }
    });
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    return res.status(500).json({
      status:'error',
      data:err
    });
  }
}

// delete data base on id
self.delete = async(req, res)=>{
  try{
    let id = req.params.prodiId;
    let data = await prodi.destroy({
      where:{
        id:id
      }
    });
    return res.json({
      status:'ok',
      data:data
    });
  }catch(err){
    return res.status.json({
      status:'error',
      data:err
    });
  }
}

// export all function
module.exports = self;
