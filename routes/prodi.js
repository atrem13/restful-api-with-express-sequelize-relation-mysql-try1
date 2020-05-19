const prodi = require('../controller/prodi.controller');
module.exports = function(express){
  const router = express.Router();

  router.get('/', prodi.getAll);
  router.post('/', prodi.save);
  router.get('/:prodiId', prodi.get);
  router.put('/:prodiId', prodi.update);
  router.delete('/:prodiId', prodi.delete);
  router.get('/with/mahasiswa', prodi.getWithMahasiswa);
  router.get('/with/search', prodi.seacrh);

  return router;
};