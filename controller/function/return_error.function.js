const return_error = (res, err) => {
  let error;
  let status_code = 404;
  if(err == 'get id'){
    error = 'error data doesnt exist';
  }else if(err == 'get all'){
    error = 'error database empty';
  }else if(err == 'search'){
    error = 'data not found';
  }
  // else if(action == 'create'){
  //   error = 'error when create new data';
  // }else if(action == 'delete'){
  //   error = 'error when delete data';
  // }
  else{
    error = err;
    status = 500;
  }
  return res.status(status).json({
    status:'error',
    error:error
  });
}

module.exports = return_error;