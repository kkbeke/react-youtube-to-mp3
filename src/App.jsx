import { useRef, useState } from "react";
import { youtube_parser } from "./utils";
import axios from "axios";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: "get",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
      params: {
        id: youtubeID,
      },
    };

    axios(options)
      .then((res) => setUrlResult(res.data.link))
      .catch((err) => console.log(err));
    inputUrlRef.current.value = "";
  };

  return (
    <div className="app">
      <span className="logo">Youtube MP3 Converter</span>
      <section className="content">
        <h1 className="content_title">Youtube to MP3 Converter</h1>
        <p className="content_description">
          Transform Youtube Videos into MP3s By KEKEBEKE!
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputUrlRef}
            type="text"
            className="form_input"
            placeholder="Paste a Youtube URL Link...."
          />
          <button type="submit" className="form_button">
            Convert
          </button>
        </form>

        {urlResult ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={urlResult}
            className="download_btn"
          >
            Download MP3
          </a>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default App;
