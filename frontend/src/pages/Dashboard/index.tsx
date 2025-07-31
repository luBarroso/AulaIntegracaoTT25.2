import React, { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { getBooks, postBook } from "../../service/bookService";

type Book = {
  title: string;
};

const Dashboard = () => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const { user, token, handleLogout } = useAuthContext();
  const [title, setTitle] = React.useState("");

  const handleSubmit = async () => {
    const response = await postBook(title, token);
    const data = response?.data;
  };

  const fetchBooks = async () => {
    const response = await getBooks();
    const data = response.data;
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Welcome {user?.name}!</h1>
        <div>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <button
            onClick={() => {
              handleSubmit(), fetchBooks();
            }}
          >
            Cadastrar livro
          </button>
        </div>
        <p>Livros cadastrados: </p>
        {books.length > 0 ? (
          books.map((book, index) => {
            return <p key={index}>{book.title}</p>;
          })
        ) : (
          <p>Sem livros cadastrados</p>
        )}
        <button className="btn-submit" onClick={() => handleLogout()}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
