import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Alert from '@material-ui/lab/Alert';
import { Button, Divider, TextField } from '@material-ui/core';

interface GiphyFetchProps {
  searchTerm: any;
  searchType: string;
}
const GiphyFetch: React.FC<GiphyFetchProps> = (props) => {
  const {searchTerm, searchType} = props;
  
  const offsetRef = React.useRef<any>(null);
  const limRef = React.useRef<any>(null);

  const [giphyData, setGiphyData] = React.useState<any[]>([]);
  const [newSession, startNewSession] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<any[]>([]);

  const [totalCount, setTotalCount] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [currentOffset, setOffset] = React.useState(null);

  const handleStartNewSession = () => { startNewSession(!newSession) };
  const handleSetLimit = () => { setCount(limRef?.current?.value) };
  const handleSetOffset = () => { setOffset(offsetRef?.current?.value) };
  const clearOffset = () => { setOffset(null) };

  const searchParams = new URLSearchParams({
    api_key: "p56JOFtV16X5lGBOZEAPQ0iPeo04w1Le",
    q: `${searchTerm}`,
    limit: `${count ? count.toString() : '20'}`,
    offset: currentOffset || Math.floor(Math.random()*1000).toString(),
  });

  const serviceRequest = async (type: string) => {
    try{
      setLoading(true);
      let response = await fetch(`https://api.giphy.com/v1/${type}/search?${searchParams}`, {method: 'GET'});
      let data = await response.json();
      
      let errors = [];
      if(data?.meta?.status === 200) {
        if(data.pagination.count > 0) {
          setLoading(false);
          setTotalCount(data.pagination.total_count);
          setCount(data.pagination.count);
          setOffset(data.pagination.offset);
          setGiphyData(data.data);
        } else {
          errors.push('Result not found!');
        }
      } else { 
        errors.push(data?.meta?.msg);
      }
      setErrors(errors);
      (errors.length > 0) && console.log(errors);
    }
    catch(err) {
      console.log(err);
    };
  };

  React.useEffect(() => {
    serviceRequest(searchType);
  }, [newSession]);

  return(
    <div>
      {
        errors.length > 0 && errors.map((error) => <Alert severity="error" style={{ padding: '2vh', margin: '3vh 0' }}>{error}</Alert>)
      }

      {giphyData.length > 0 && <>
        <h2>Result (<span>{totalCount} {searchType}</span>)</h2>
        <h3>
          <p>Limit: {count} results</p>
          <p>
            Set new limit:
            <TextField type="number"     
              InputProps={{ inputProps: { min: 1, max: 25 } }}
              helperText="Hint: 1 - 25" 
              inputRef={limRef} defaultValue={count}/>
            <Button onClick={handleSetLimit}>Update limit</Button>
          </p>
          <p>Current offset: {currentOffset}</p>
          <p>
            Set new offset: 
            <TextField type="number"
              inputRef={offsetRef}
              InputProps={{ inputProps: { min: 0, max: totalCount-1 } }} />
            <Button onClick={handleSetOffset}>Update offset</Button>
          </p>
        </h3>
        <Button style={{ backgroundColor: 'rgba(0,0,0,0.1)', color: 'white' }} fullWidth onClick={clearOffset}>Clear current offset</Button>
        <Button style={{ backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }} fullWidth onClick={handleStartNewSession}>Refresh</Button>


        <Divider style={{ margin: '5vh' }} />
        {
          !loading
          ?(
            <div>
              {giphyData && giphyData.map((item, index) => (
                <span key={index}>
                  <a target="_blank" href={item?.url}><img src={item?.images?.fixed_height_downsampled?.url} height="200px" alt={`${index}`} /></a>
                </span>
              ))}
            </div>
          )
          :(
            <div>
              <Skeleton />
              <Skeleton animation={false} />
              <Skeleton animation="wave" />
            </div>
          )
        }
      </>}
 
    </div>
  );
};

export default GiphyFetch;