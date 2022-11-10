import {useRef} from 'react'
import Link from 'next/link'

function AddNew(){
    const titleRef = useRef();
    const authorRef = useRef();
    const detailsRef = useRef();

    const handleSave = async (ev)=>{
        ev.preventDefault()
        console.log(titleRef)
        const newBook ={
            title: titleRef.current.value,
            author: authorRef.current.value,
            details: detailsRef.current.value
        }

        const res = await fetch('/api/books', {
            method: 'POST',
            body: JSON.stringify(newBook),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data);
    }

    return(
        <>
        <nav>
            <Link href="/">Home</Link>
            <Link href="/books">Show Collection</Link>
            <Link href="/books/addnew">Add New</Link>
        </nav>
        <form>
            <label>Book Name:</label>
            <input type="text" ref = {titleRef} />
            <label>Book Author:</label>
            <input type="text" ref = {authorRef} />
            <label>Book Details:</label>
            <input type="text" ref = {detailsRef} />
            <button onClick={handleSave}>Save</button>
            <button type="submit">Cancle</button>
        </form>
        </>
    )

}

export default AddNew;