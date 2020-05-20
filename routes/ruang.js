const ruang = require('../controller/ruang.controller');
module.exports = function(express){
  const router = express.Router();
  router.get('/', ruang.getAll);
  router.post('/', ruang.save);
  router.get('/:ruangId', ruang.get);
  router.put('/:ruangId', ruang.update);
  router.delete('/:ruangId', ruang.delete);
  router.get('/with/search', ruang.search);

  return router;
};