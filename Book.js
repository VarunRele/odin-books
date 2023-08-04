let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read." : "have not read yet."}`
}

Book.prototype.updateRead = function () {
    if (this.read) {
        this.read = false
    } else {
        this.read = true
    }
}

function addBookToLibrary(title, author, pages, read) {
    let b = new Book(title, author, pages, read)
    myLibrary.push(b)
    showBooks()
}

const showBooks = () => {
    ulBookList.innerHTML = ""
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i]
        ulBookList.innerHTML += `<li class=${book.read? "yesread" : "noread"} id=${i} data-index=${i}>${book.info()} <div><button class="readbtn">${book.read? "UNREAD" : "READ"}</button></div></li>`
    }
    addEventsToButton()
}

const addEventsToButton = () => {
    let readStatus_btns = document.querySelectorAll(".readbtn")

    readStatus_btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let bookID = e.target.parentElement.parentElement.id
            myLibrary[bookID].updateRead()
            showBooks()
        })
    })   
}

// let b1 = new Book("Lord of the rings", "T.K Tokkien", 399, false)
// let b2 = new Book("Harry Potter", "J. K. Rowling", 400, true)
// myLibrary.push(b1)
// myLibrary.push(b2)
// showBooks()

let ulBookList = document.querySelector('ul')

let addBookForm = document.querySelector("form")



addBookForm.addEventListener("submit", (e) => {
    e.preventDefault()

    addBookToLibrary(e.target.Title.value, e.target.Author.value, e.target.Pages.value, e.target.Read.checked == true)

    e.target.Title.value = ""
    e.target.Author.value = ""
    e.target.Pages.value = ""
    e.target.Read.checked = false
})

