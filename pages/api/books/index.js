// /pages/api/thing/index.js
//CRUD handler for things
import nc from 'next-connect';
import cors from 'cors';

import {loadBooks, saveBooks} from '../../../datasource/rw-utility';

let books = []

const handler = nc()
  .use(cors())
  .get((req, res) => {

    books = loadBooks();

    res.json({
      books: books,
    });
  })
  .post((req, res) =>{
      if(books.length === 0){
          books = loadBooks();
      }
      const id = Date.now().toString();

      const book ={ ...req.body, id};

      books.push(book);
      saveBooks(books)

      res.json({book: book})
  })
  

  export default handler;