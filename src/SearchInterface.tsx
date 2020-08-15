import React from 'react';
import { TextField, Button } from '@material-ui/core';
import GiphyFetch from './GiphyFetch';
import "./styles.css";

const SearchInterface: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState(null);
  const [fetching, setFetching] = React.useState(false);
  const [searchType, setSearchType] = React.useState<string>('');

  const textRef = React.useRef<any>(null);

  const updateSearchTerm = () => {
    setFetching(true);
    setSearchTerm(textRef?.current?.value);
  };
  const searchGifs = () => { 
    setSearchType('gifs');
    updateSearchTerm(); 
  };
  const searchStickers = () => {
    setSearchType('stickers');
    updateSearchTerm();
  };
  
  const closeFetchingSession = () => {
    setFetching(false);
  };

  const onKeyPress = (event: any) => {
    const types = ['gifs', 'stickers'];
    const random = Math.floor(Math.random() * types.length);
    if (event.key === 'Enter') {
      setSearchType(types[random]);
      updateSearchTerm();
    }
  };
  return (
    <div>
      <div>
        <div>
          <TextField
            type="text" 
            label="What are you looking for?"
            fullWidth
            variant="filled"
            inputRef={textRef}
            onChange={closeFetchingSession}
            onKeyPress={onKeyPress}
          />
        </div>
        <div style={{ marginTop: '2vh' }}>
          <Button
            style={{width: '50%', padding: '2vh', backgroundColor: `${searchType === 'gifs' ? 'rgba(255, 204, 0, 1)' : 'rgba(255,255,255,0.5)'}`}} 
            onClick={searchGifs}
          >
            Search GIFs
          </Button>
          <Button
            style={{width: '50%', padding: '2vh', backgroundColor: `${searchType === 'stickers' ? 'rgba(255, 204, 0, 1)' : 'rgba(255,255,255,0.5)'}`}}
            onClick={searchStickers}
          >
            Search Stickers
          </Button> 
        </div>
      </div>
      {
        fetching && <GiphyFetch searchTerm={searchTerm} searchType={searchType} />
      }
    </div>
  );
};

export default SearchInterface;