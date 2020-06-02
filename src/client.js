import route from './router';

const baseURL = '/api';
let sessionId = localStorage.getItem('SessionId');
export let userId = localStorage.getItem("UserId");

const headers = () => {
  return {
    RequestId: Math.random().toString(36).substr(2, 9),
    Authorization: sessionId,
  };
};

const clearCredential = () => {
  localStorage.removeItem('SessionId');
  localStorage.removeItem('UserId');
  userId = null;
  sessionId = null;
};

const fetch = (url, options) =>
  window.fetch(`${baseURL}${url}`, {
    headers: headers(),
    ...options    
  }).catch(e => Promise.reject({
    error_code: "FETCH_ERROR",
    message: e
  })).then(async (response) => {
    if (!response.ok) {
      return Promise.reject(await response.json());
    } else if (response.status === 204) {
      return undefined;
    } else if (response.headers.get('content-length') === '0') {
      return undefined;
    } else if (response.headers.get('content-type') === 'application/json') {
      return response.json();
    } else {
      return await response.blob();
    }
  });

const get = (url) => fetch(url, {method: 'GET'});

const put = (url, options = {}) => fetch(url, {
  ...options,
  method: 'PUT'
});

const post = (url, options = {}) => fetch(url, {
  ...options,
  method: 'POST'
});

const del = (url) => fetch(url, {
  method: 'DELETE'
});

// checks if response had 401
// error code. and in case 401
// logs out and sends to login 
const auth = (response) => {
  if (response.status === 401) {
    clearCredential();
    route('/login');
    return Promise.reject("You are not logged in.");
  } else {
    return response;
  }
};

export const verifySession = () =>
  sessionId == null
  ? Promise.reject("SessionId is null")
  : get(`/user/${sessionId}`).then(res => {
    userId = res;
    localStorage.setItem('UserId', userId);
  });

export const clearSession = () => {
  let temp = sessionId;
  clearCredential();
  return del(`/user/${temp}`);
};

export const signup = (username, password) =>
  post(`/user/${username}/${password}`)
    .then(() => login(username, password));

export const login = (username, password) => 
  put(`/user/${username}/${password}`).then(res => {
    sessionId = res;
    localStorage.setItem('SessionId', res);
    get(`/user/${sessionId}`);
  });

export const getTasks = () => get(`/task`);

export const createTask = (task) => {
  task.id = 0;
  task.user_id = 0;
  task.completed = false;
  return post(`/task`, {
    body: task
  });
}

export function updateTask(task) {
  return put(`/task`, task);
}

export function deleteTask(taskId) {
  return del(`/task/${taskId}`);
}
/*
   export function createArticle(article) {
   return post('/article', article);
   }

   export function updateArticle(article) {
   return put('/article', article);
   }

   export function getArticle(id) {
   return get(`/article/${id}`);
   }

   export function getArticles() {
   return get('/article');
   }

   export function deleteArticle(id) {
   return del(`/article/${id}`);
   }
 */
