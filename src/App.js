import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { FcSpeaker } from 'react-icons/fc';
import { FaSearch } from 'react-icons/fa';

function App() {
  // State to store the fetched data and the search word
  const [data, setData] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to fetch the word meaning from the dictionary API
  const getMeaning = () => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`)
      .then((response) => {
        setData(response.data[0]);
        setErrorMessage("");
        // Check if the response contains an error message
        // if (response.data.title === "No Definitions Found") {
        //   setErrorMessage(response.data.message);
        //   setData(null);
        // } else {
          
        //   setErrorMessage("");
        // }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setErrorMessage("No Definitions Found");
        setData(null); // Clear the data on error
      });
  };


  // Function to play the audio pronunciation of the word
  const playAudio = (a) => {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  };

  return (
    <div className="App">
      <h1>Word Dictionary</h1>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button onClick={getMeaning}>
          <FaSearch size="20px" />
        </button>
      </div>
      {errorMessage && (
        <div className="error">
          <h2>{errorMessage}</h2>
          <p>Sorry pal, we couldn't find definitions for the word you were looking for.</p>
        </div>
      )}
      {data && (
        <div className="showResults">
          <h2>{data.word}{" "}
          <button onClick={() => playAudio()}>
            <FcSpeaker size="26px" />
          </button>
          </h2>
          
          <h4>Parts of speech:</h4>
          <p>{data.meanings[0].partOfSpeech}</p>
          <h4>Definition:</h4>
          <p>{data.meanings[0].definitions[0].definition}</p>
          {data.meanings[0].definitions[0].example && (
            <>
              <h4>Example:</h4>
              <p>{data.meanings[0].definitions[0].example}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;