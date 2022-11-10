import {useState, useEffect} from 'react'
import Link from 'next/link'

function Books(){

    const [books, setBooks] = useState([]);
    console.log(books)

    useEffect(()=>{
        fetch('/api/books', {method: 'GET'})
        .then((res) => {
            if(!res.ok) throw new Error(res.statusText)
            return res.json()
        })
        .then((data)=>{
            setBooks(data.books)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])

    if(!books){
        return null
    } else{
        return(
            <>
            <nav>
        <Link href="/">Home</Link>
        <Link href="/books">Show Collection</Link>
        <Link href="/books/addnew">Add New</Link>
      </nav>
                <main>
                    <h1>Welcome to MADD Library</h1>
                    <div>
                        <h2>Available Books</h2>
                        <ul>
                            {books.map((item)=>(
                                <Link key={item.id} href={"books/"+ item.id}>
                                    <li>{item.title}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </main>
            </>
        )
    }
}

export default Books;