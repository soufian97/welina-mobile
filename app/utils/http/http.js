import _isEmpty from 'lodash/isEmpty';

export const API_URL = process.env.API_URL || 'https://welina.ma/api/v1';

export const HTTP_METHODS = Object.freeze({
  GET: { method: 'GET' },
  POST: { method: 'POST' },
  PUT: { method: 'PUT' },
  PATCH: { method: 'PATCH' },
  DELETE: { method: 'DELETE' },
});
export const CONTENT_TYPE = Object.freeze({
  JSON: { 'Content-Type': 'application/json' },
  MULTIPART: { 'Content-Type': 'form/multipart' },
  FORM_DATA: { 'Content-Type': 'multipart/form-data' },
});

export const responseMiddleware = async (response) => {
  if (response.ok) {
    return response;
  }

  if (response.status === 401 || response.status === 403) {
    // something
  }

  const error = new Error(response.statusText);
  error.status = response.status;
  let res = null;
  try {
    res = JSON.parse(await response.text());
  } catch (e) {
    res = await response.text();
  }

  error.response = res || {};
  return Promise.reject(error);
};

export const request = (url, options) =>
  fetch(`${API_URL}/${url}`, options)
    .then(responseMiddleware)
    .then((res) => res.text())
    .then((e) => (_isEmpty(e) ? {} : JSON.parse(e)));

export const requestForBlob = (url, options) =>
  fetch(`${API_URL}/${url}`, options).then(responseMiddleware);
// .then((res) => res.blob());

export const http = (url, method, data = {}, forBlob = false) => {
  const { headers = { ...CONTENT_TYPE.JSON }, body } = data;
  const params = [
    url,
    {
      ...method,
      credentials: 'include',
      headers: {
        ...headers,
      },
      body: forBlob ? body : JSON.stringify(body),
    },
  ];
  return (forBlob ? requestForBlob : request)(...params);
};
