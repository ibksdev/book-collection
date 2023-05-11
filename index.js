const express = require('express');
const app = express();
const bodyParser= require('body-parser');

app.use(bodyParser.json()); //middleware for parsing json bodies.
let books = []; //store collections of books.
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
});

//create route for show all books.
app.get('/books', (req,res)=>{
    res.json(books);
});

//this route is create a new book
app.post('/books',(req,res) => {
    const {title, author, publishedDate } = req.body ;

    //check title or author is empty or not. if empty then show error message.
    if (!title || !author){
        return res.status(400).json({error : "Title and Author is required"})
    }

    //create unique Book Id.
    const id = Date.now().toString();

    //create a book object
    const book = {
        id,
        title,
        author,
        publishedDate
    };
    books.push(book);
    res.json(book);
});

//this route is create for delete a book by book id
app.delete('/books/:id', (req, res) =>{
    const id= req.params.id;
    const index= books.findIndex(book => book.id === id)

    // if book id not found
   if(index === -1){
       return res.status(404).json({error : 'Not Found'});
   }
   const removeBook= books.splice(index,1)[0];
   //if delete successfully then show a message.
   res.json({message : 'Book Deleted Successfully'})
});

//run the server
app.listen(8000,function () {
    console.log("Server running successfully");
})















