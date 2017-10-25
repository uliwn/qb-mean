function load(params) {
  return {id: '1', title: 'new user'}
}

function get(req, res) {
  return res.json(req.post);
}

function create(params) {
  return true;
}

function update(params) {
  return {id: '1', title: 'new user'}
}

function list(params) {
  return [{id: '1', title: 'new user'}, {id: '2', title: 'new user'}]
}

function remove(params) {
  return {id: '1', title: 'new user'}
}

export default { load, create, update, list, remove };
