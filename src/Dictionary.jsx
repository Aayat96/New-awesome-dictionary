import React, { useState } from 'react';
import axios from 'axios';


function Dictionary() {
  const [inputValue, setInputValue] = useState('');
  const [searchedWord, setSearchedWord] = useState(null);
  const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  async function handleSearch() {
    try {
      const response = await axios.get(`${API_URL}/${inputValue}`);
      const result = response.data[0];
      setSearchedWord(result);
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
    setInputValue('');
  }

  return (
    <div className='container'>
      <div className='bg-secondary text-center py-3 mx-auto text-wrap'>
        <h1 className='text-bolder text-center text-white'>Awesome Dictionary</h1>
        <div className='input-group px-5 m-3'>
          <input
            type="search"
            className='form-control ps-3 border-primary-subtle'
            value={inputValue}
            placeholder='Search...'
            onChange={e => setInputValue(e.target.value)}
          />
          <button
            type='button'
            className='pe-5 border-primary-subtle fs-small'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {searchedWord && (
        <div className='mt-3'>
          <h3 className='text-capitalize fs-3 p-1 fw-bolder'>{searchedWord.word}</h3>
          <span className='text-sm p-1 fw-lighter ms-2 d-inline'>{searchedWord.phonetic}</span>

          {searchedWord.phonetics.map((phonetic, index) => (
            <div key={index}>
              <li className='fs-6 fw-lighter'>{phonetic.text}</li>
              {phonetic.audio !== '' && (
                <audio controls='true' className='bg-primary-subtle fs-6' src={phonetic.audio}>
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          ))}


          <ul className='list-group'>
            {searchedWord.meanings.map(meaning => (
              <div key={meaning.partOfSpeech} className='card w-70 shadow-sm my-2 px-3 py-2 bg-body-tertiary rounded'>
                <li><h6>Part Of Speech:</h6> <span className='fst-italic fw-lighter'>{meaning.partOfSpeech}</span></li>

                {meaning.definitions.map(def => (
                  <li key={def.definition}>
                    <h6 className='pt-1 fw-bolder'>Definition:</h6>
                    <p className='ps-2 lh-sm card-text'>{def.definition}</p>
                    {def.example && (
                      <span>
                        Example<p className='fst-italic'>{def.example}</p>
                      </span>
                    )}
                  </li>
                ))}

                {meaning.synonyms && meaning.synonyms.length > 0 && (
                  <li>
                    <h6 className='pt-1 fw-bolder card-text'>Synonyms</h6>
                    <span className='card-text'>{meaning.synonyms.join(', ')}</span>
                  </li>
                )}
                {meaning.antonyms && meaning.antonyms.length > 0 && (
                  <li>
                    <h6 className='pt-1 fw-bolder card-text'>Antonyms</h6>
                    <span className='card-text'>{meaning.antonyms.join(', ')}</span>
                  </li>
                )}
              </div>
            ))}
          </ul>
          <hr />
        </div>
      )}
    </div>
  
  );
}

export default Dictionary;
