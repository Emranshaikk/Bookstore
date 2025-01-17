import React, { useEffect, useState } from "react"
import BookCards from "../components/BookCards";

function OtherBooks() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/all-books").then(res=> res.json()).then(data => setBooks(data.slice(4,12)))}, [])
  return (
    <div>
        <BookCards books={books} headLine="Other Books"/>
    </div>
  )
}

export default OtherBooks