// Book Class : represents a book
class Book {
    // book object 생성하기
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI Class : Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();

        // book의 내용을 차례로 실행하기
        books.forEach((book) => UI.addBookToList(book));
    }


    static addBookToList(book) {
        // book-list아이디를 가진 것을 list로 저장
        const list = document.querySelector('#book-list');
        // tr 생성하는 것을 row로 저장
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class = "btn btn-danger btn-sm delete">X</a></td>
        `;

        // 생성한 td들을 tbody에 추가하기
        list.appendChild(row);
    }

    // 리스트 지우기
    static deleteBook(el) {
        // 엘리먼트 클래스 리스트에 delete가 들어 있으면
        if (el.classList.contains('delete')) {
            // 엘리먼트의 상위 상위를 삭제함.
            el.parentElement.parentElement.remove();
        }
    }

    // 경고메세지 띄우기
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message)); // list의 append 개념
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form); // div에서 form앞에 넣기

        // 3초뒤에 사라지게 하기
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    //  입력값 비우기
    static clearFields() {
        document.querySelector('#title').value = ""
        document.querySelector('#author').value = ""
        document.querySelector('#isbn').value = ""
    }
}
// Store Class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) { // books 칸이 비어 있으면
            books = []; // 리스트를 생성
        } else {
            // string를 json 객체로 변환하기
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        // json객체를 String 객체로 변환
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1); // splice - 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경. 원본 배열자체를 수정
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event : display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event : Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // 입력후 사라짐 방지 텍스트값 유지
    e.preventDefault();

    // 입력된 값을 변수로 저장하기
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // 빈값 확인
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // book오브젝트 생성하기
        const book = new Book(title, author, isbn);

        // 웹페이지에 넣기
        UI.addBookToList(book);

        // 로컬스토리지에 저장하기
        Store.addBook(book);

        // 성공 메세지 보여주기
        UI.showAlert('Book Added', 'success');

        // 입력폼 비우기
        UI.clearFields();
    }
});

// Event : Remove a book
// (e)는 익명함수 
document.querySelector('#book-list').addEventListener('click', (e) => {
    // e 만 사용할 경우 윈도우의 좌표를 표시
    // e.target는 html의 엘리먼트를 반환
    UI.deleteBook(e.target)


    // 로컬스토리지에서 삭제하기
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // 삭제 메세지 보여주기
    UI.showAlert('Book Removed', 'success');
});