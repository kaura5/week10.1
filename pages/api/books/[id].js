import nc from 'next-connect';
import cors from 'cors';

import {loadBooks, saveBooks} from '../../../datasource/rw-utility';

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
  .patch((req, res) => {
    const book = getBook(req.query.id)
    if(!book){
        res.status(404);
        res.end();
        return
    }
    const idx = books.findIndex((item) => item.id === req.query.id);
    const updated = {...req.body}

    books[idx] = updated;
    saveBooks(books)
    res.json({book: updated})
  })
  .delete((req, res)=>{
    const book = getBook(req.query.id)

    if(!book){
        res.status(404);
        res.end();
        return
    }
    const idx = books.findIndex((item) => item.id === req.query.id);

    books.splice(idx, 1);
    saveBooks(books);
    res.json({book: book})

  })


  export default handler;