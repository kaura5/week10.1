import nc from 'next-connect';
import cors from 'cors';

import {loadBooks} from '../../../datasource/rw-utility';

let books = [];
books = loadBooks();

const getBook = (id) => books.find((n) => n.id === id);

const handler = nc()
  .use(cors())
  .get((req, res) =>{
      const book = getBook(req.query.id)

      if(!book){
          res.status(404);
          res.end()
          return;
      }

      res.json({book: book});
  })


  export default handler;