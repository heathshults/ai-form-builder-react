/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { map, switchMap, catchError, startWith } from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { of, timer, zip, mergeMap } from "rxjs";
import config from "@appConfig/config";
import { endpoints } from "@api/emdpoints";
// eslint-disable-next-line prefer-const
let apiurl = `${process.env.API_BASE_URL}${process.env.API_PORT}${process.env.API_PATH}`;


// eslint-disable-next-line prefer-const
let errorMessage = "";

//BUIDL API URL
export async function api(path?: string) {
  // eslint-disable-next-line valid-typeof
  if (typeof apiurl !== undefined || typeof apiurl !== null || typeof apiurl !== 'undefined') return
  return new Promise((resolve, reject) => {
    try {
      const builturl = `${apiurl}${path ? path : ""}`;
      console.log("API URLfunc//////:", builturl);
      resolve(builturl);
    } catch (error) {
      reject(error);
    }
  });
  
}

// GENERAL DATA FETCHER
export async function fetchData(path: string) {
  try {
    const builtURL = `${apiurl}${path ? path : ""}`;
    const res = await fetch(builtURL, { next: { revalidate: 3600 } });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const deepCopy = structuredClone(data);
    console.log("DEEPCOPY", deepCopy);

    return deepCopy;
  } catch (error) {
    return {
      "ERROR FETCHING DATA": `fetchData reports: 
      ${error}`,
    };
  }
}

export async function addToLoaclStorage(name: string, data: any) {

 
  if (typeof data === 'object' || typeof data === 'array') {
    localStorage.setItem(key, JSON.stringify(data))
  } else {
    localStorage.setItem(key, data)
  }
  return NextResponse.json({ data: { message: "Data saved" } });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  

}

export async function streamer(path: string) {
  // wait for both fetch and a 500ms timer to finish
  return zip(
    fromFetch(path).pipe(mergeMap((r) => r.json())),
    timer(500) // set a timer for 500ms
  ).pipe(
    // then take only the first value (fetch result)
    map(([data]) => data)
  );
}

export async function addComment(name: string, email: string, message: string) {
  const data = {
    name: name,
    email: email,
    message: message,
    date: new Date(),
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(`${process.env.BASE_URL}${endpoints.comments}`, requestOptions);
  const responseData = await response.json();

  return responseData.data;
}

export async function addCommentToBlog(blogId:number, allComments:string) {
  const data = {
    data: {
      comments: allComments,
    },
  };

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `${process.env.BASE_URL}${endpoints.blog}/${blogId}`,
    requestOptions
  );
  const responseData = await response.json();

  return responseData;
}

export default fetchData;
/** AXIOS methods
 * axios#request(config)
 * axios#get(url[, config])
 * axios#delete(url[, config])
 * axios#head(url[, config])
 * axios#options(url[, config])
 * axios#post(url[, data[, config]])
 * axios#put(url[, data[, config]])
 * axios#patch(url[, data[, config]])
 * axios#getUri([config])
 *
 */

// export async function addComment(name,email,message) {
//   const data = {
//     name: name,
//     email: email,
//     message: message,
//     date: new Date(),
//   };

//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   const response = await fetch(`${api.baseUrl}${api.comments}`,requestOptions);
//   const responseData = await response.json();

//   return responseData.data;
// }

// export async function addCommentToBlog(blogId,allComments) {
//   const data = {
//     data: {
//       comments: allComments,
//     }
//   };

//   const requestOptions = {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   const response = await fetch(`${api.baseUrl}${api.blog}/${blogId}`,requestOptions);
//   const responseData = await response.json();

//   return responseData;
// }

/** AXIOS methods
 * axios#request(config)
 * axios#get(url[, config])
 * axios#delete(url[, config])
 * axios#head(url[, config])
 * axios#options(url[, config])
 * axios#post(url[, data[, config]])
 * axios#put(url[, data[, config]])
 * axios#patch(url[, data[, config]])
 * axios#getUri([config])
 *
 */

// export async function addComment(name,email,message) {
//   const data = {
//     name: name,
//     email: email,
//     message: message,
//     date: new Date(),
//   };

//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   const response = await fetch(`${api.baseUrl}${api.comments}`,requestOptions);
//   const responseData = await response.json();

//   return responseData.data;
// }

// export async function addCommentToBlog(blogId,allComments) {
//   const data = {
//     data: {
//       comments: allComments,
//     }
//   };

//   const requestOptions = {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   };

//   const response = await fetch(`${api.baseUrl}${api.blog}/${blogId}`,requestOptions);
//   const responseData = await response.json();

//   return responseData;
// }
