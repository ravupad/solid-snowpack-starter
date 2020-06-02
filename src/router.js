const registeredRoutes = [];
let onFailure = () => {};

const setOnFailure = (f) => {
  onFailure = f;
};

const match = (template, route) => {
  let params = {};
  if (template.length !== route.length) {
    return [false];
  }
  for (let i = 0; i < template.length; i++) {
    let idx = template[i].indexOf(':');
    if (idx === -1) {
      if (template[i] !== route[i]) {
        return [false];
      }
    } else {
      if (template[i].substring(0, idx) !==
        route[i].substring(0, idx))
      {
        return [false];
      }
      params[template[i].substring(idx+1)] =
        route[i].substring(idx);
    }            
  }
  return [true, params];
};

const register = (path, cb) => {
  registeredRoutes.push([
    path.split('/')
        .filter(a => a.length > 0),
    cb
  ]);
};

const route = (location=null) => {
  if (location != null) {
    window.history.pushState(null, null, location);
  }
  let path = window
    .location.pathname
    .split('/')
    .filter(a => a.length > 0);
  let params = {};
  window
    .location.search.substring(1)
    .split('&')
    .map(a => a.split('='))
    .forEach(p => params[p[0]] = p[1]);
  for (let i = 0; i < registeredRoutes.length; i++) {
    let res = match(
      registeredRoutes[i][0],
      path);
    if (res[0] === true) {
      params = {
        ...params,
        ...res[1]
      };
      registeredRoutes[i][1](params);
      return;
    }
  }
  onFailure();
};

window.addEventListener('popstate', (event) => {
  route(location, console.log);
});

export default route;
export {
  setOnFailure,
  register
};
