// import API from "./config";
// // import * as CONST from "./Constants";
// // const expiredTokenObj = {status: 401, message: CONST.TOKEN_EXPIRED_MESSAGE};
// // const suspendUserObj = {status: 403, message: CONST.SUSPEND_USER_MESSAGE};

// function secureFetch(type, body = "") {
//   if (type === "GET" || type === "DELETE") {
//     return {
//       method: type,
//       headers: {
//         "Authorization": API.AUTH,
//       },
//     };
//   }
//   return {
//     method: type,
//     headers: {
//       "Authorization": API.AUTH,
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(body),
//   };
// }

// export function securePost(path, body) {
//   return fetch(`${API.BASE}/${path}`, secureFetch("POST", body)).then(res => { 
//     if (res.status === 401) {
//       throw (expiredTokenObj);
//     } else if (res.status === 403) {
//       throw (suspendUserObj);
//     } else {
//       return res.json();
//     }
//   });
// }

// export function securePut(path, body) {
//   return fetch(`${API.BASE}/${path}`, secureFetch("PUT", body)).then((res) => res.json());
// }

// export function secureGet(path) {
//   return fetch(`${API.BASE}/${path}`, secureFetch("GET")).then((res) =>{ 
//     if(res.status == 401)
//       throw (expiredTokenObj);
//     else if (res.status == 403) 
//       throw (suspendUserObj);
//     else
//       return res.json();
//   });
// }

// export function secureDelete(path) {
//   return fetch(`${API.BASE}/${path}`, secureFetch("DELETE")).then((res) => res.json());
// }

