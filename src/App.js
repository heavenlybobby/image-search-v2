import { useEffect, useState } from "react";

const accessKey = "Jfz4jzejTGpYzweYO6XpiqRQdt3HCEJWVAiu1TVYeUc";

export default function App() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  function handleNextpage() {
    setPage((page) => page + 1);
  }

  function handlePrevPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }

  useEffect(
    function () {
      if (search === "") return;

      async function searchImage() {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=${accessKey}&per_page=12`
        );
        const data = await res.json();
        setImages(data.results);
        console.log(data.results);
      }

      searchImage();
    },
    [search, setImages, page]
  );

  return (
    <div className="main">
      <Header />
      <Search search={search} setSearch={setSearch} />
      <Images images={images} />
      <div style={{ display: "flex", gap: "50px" }}>
        {images.length > 0 && page > 1 && (
          <Button onClick={handlePrevPage}>Prev Page</Button>
        )}
        {images.length > 0 && (
          <Button onClick={handleNextpage}>Next page</Button>
        )}
      </div>
    </div>
  );
}

function Header() {
  return <h1 className="header">Image Search</h1>;
}

function Search({ search, setSearch }) {
  return (
    <input
      className="searchbar"
      type="text"
      value={search}
      id="input"
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search for any image"
    />
  );
}

function Images({ images }) {
  return (
    <ul className="imagelist">
      {images.map((image) => (
        <Image image={image} key={image.id} />
      ))}
    </ul>
  );
}

function Image({ image }) {
  return (
    <li>
      <img src={image.urls.small} alt={image.slug} />
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}
