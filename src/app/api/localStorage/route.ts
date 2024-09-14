import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

//is storage available
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}


if (storageAvailable("localStorage")) {
  // Yippee! We can use localStorage awesomeness
} else {
  // Too bad, no localStorage for us
}

export async function GET(req: NextRequest) {
  try {
    let pathname = req.nextUrl.pathname;
    pathname = pathname.replace(/\/$/, '')
    const searchItem = pathname.split('/').pop()
    
    const data = await localStorage.getItem(searchItem)
    const responseData = data ? JSON.parse(data) : { message: "No data found" }
    return NextResponse.json({ data: responseData });
  } catch (error) {
    NextResponse.json({ data: { message: "No data found" } });
  }
};


export async function POST(request: NextRequest) {
  if (storageAvailable("localStorage")) {
    try {
      const body = await request.json();
      const { key, data } = body
      if (typeof data === 'object' || typeof data === 'array') {
        localStorage.setItem(key, JSON.stringify(data))
      } else {
        localStorage.setItem(key, data)
      }
      return NextResponse.json({ data: { message: "Data saved" } });

    }
      catch (error) {
        return NextResponse.json({ data: { message: "Data not saved" } });
      }

    } else {
      NextResponse.json({ message: "No storage available" });
      }

}


