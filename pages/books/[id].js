import {useRouter} from 'next/router'
import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'

export default function Details(){
    const router = useRouter();
    const {id} = router.query;

    const [book, setBook] = useState(null)

    useEffect(()=>{
        fetch(`/api/books/${id}`, {method: 'GET'})
        .then((res) => {
            if(!res.ok) throw new Error(res.statusText)
            return res.json()
        })
        .then((data)=>{
            setBook(data.book)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[id])
    if(!book){
        return null
    } else{

    
    return(
        <>
        <nav>
        <Link href="/">Home</Link>
        <Link href="/books">Show Collection</Link>
        <Link href="/books/addnew">Add New</Link>
      </nav>
        <div>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <p>{book.details}</p>
        </div>
        </>
    )
    }
}