import {useRouter} from 'next/router'
import {useState, useEffect, useRef} from 'react'
import Link from 'next/link'

export default function Details(){
    const router = useRouter();
    const {id} = router.query;
    const titleRef = useRef();
    const authorRef = useRef();
    const detailsRef = useRef();

    const [book, setBook] = useState(null)
    const [isEditing, setIsEditing] = useState(false)

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

    async function handleDelete(){
        const res = await fetch(`/api/books/${id}`, {
            method: 'DELETE'
        })

        const data = await res.json()
        console.log(data)
        router.push('/books')
    }

    async function handleEdit(){
        setIsEditing(true)
    }
    
    async function handleSave(){
        const updatedBook ={
            id: id,
            title: titleRef.current.value,
            author: authorRef.current.value,
            details: detailsRef.current.value
        }
        const res = await fetch(`/api/books/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedBook),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const data = await res.json()
        console.log(data)
        setIsEditing(false)
    }



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
      {isEditing ? <div>
        <form>
            <label>Book Name:</label>
            <input defaultValue = {book.title} type="text" ref = {titleRef} />
            <label>Book Author:</label>
            <input defaultValue = {book.author} type="text" ref = {authorRef} />
            <label>Book Details:</label>
            <input defaultValue = {book.details} type="text" ref = {detailsRef} />
            <button onClick={handleSave}>Save</button>
            <button >Cancle</button>
        </form>
      </div> : 
        <div>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <p>{book.details}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
      }
        </>
    )
    }
}