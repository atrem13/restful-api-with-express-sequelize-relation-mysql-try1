const mahasiswa = require('../controller/mahasiswa.controller');
module.exports = function(express){
  const router = express.Router();

  router.get('/', mahasiswa.getAll);
  router.post('/', mahasiswa.save);
  router.get('/:mahasiswaId', mahasiswa.get);
  router.put('/:mahasiswaId', mahasiswa.update);
  router.delete('/:mahasiswaId', mahasiswa.delete);
  router.get('/where/name', mahasiswa.search);

  return router;
};