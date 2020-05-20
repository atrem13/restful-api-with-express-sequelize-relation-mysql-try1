const return_success = (res, data) => {
  return res.json({
    status:'ok',
    data:data
  });
};

module.exports = return_success;