import { Book } from "./interfaces.js";

const BASE_URL:string = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books';

async function getBooks() {
    const res = await fetch(`${BASE_URL}`)
    const data:Book[] = await res.json();
    // console.log(data);
    
    return data;
}

export { getBooks };