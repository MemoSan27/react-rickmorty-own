import { useEffect, useRef, useState } from 'react';
import useFetch from '../hooks/useFetch'
import getRandom from '../js/getRandom';
import CardLocation from '../components/CardLocation';
import CardResident from '../components/CardResident';
import Loading from './Loading';
import ubicate from '../locations.json';
import Autosuggest from 'react-autosuggest';
import Pagination from './Pagination';

const Main = () => {

  const [ locationNames, setLocationNames ] = useState(ubicate);
  const [ value, setValue ] = useState("");
  const [ locationSelected, setLocationSelected ] = useState({})
  const [ locationId, setLocationId ] = useState(getRandom());
  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const [ location, getLocation, isLoading, hasError, setHasError ] = useFetch(url);
  const [page, setPage] = useState(1)
 /*  const url2 = `https://rickandmortyapi.com/api/location?page=7`;
  const [ location2, getLocation2 ] = useFetch(url2); */
  
  useEffect( () => {
    getLocation();
    /* getLocation2(); */
  }, [locationId]);

/*   for(let i = 0; i < 6; i++){
    console.log(`{ 
      "id": ${ location2?.results[i].id },
      "name": "${ location2?.results[i].name }"
    },` );
}  */
  
  const inputLocation = useRef();

  const handleLocation = (e) => {
    let currentId = locationId;
    if(locationId === currentId){
      setHasError(true);
    }
    e.preventDefault();
    setLocationId(locationSelected.id);
    setPage(1);
    inputLocation.current.value = '';
  }

 

  const onSuggestionsFetchRequested = ({ value }) => {
      setLocationNames(locationNamesFilter(value));
  }

  const locationNamesFilter = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let filtrado = ubicate.filter((item) => {
      let textoCompleto = `${item.id} - ${item.name}`;

      if(textoCompleto.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(inputValue)){
          return item;
        }
    });
    
    return inputLength === 0 ? [] : filtrado;
  }

  const onSuggestionsClearRequested = () => {
    setLocationNames([]);
  }

  const getSuggestionValue = (suggestion) => {
    return `${ suggestion.name }`;
  }
  
  const renderSuggestion = (suggestion) => (
    <div className='sugerencia' onClick={ () => selectLocationName(suggestion) }>
       <span className='sugerencia__id'> { suggestion.id } </span> <span> { suggestion.name } </span>  
    </div>
  );

  const selectLocationName = (locationName) => {
    setLocationSelected(locationName);
  }

  const onChange = (e, {newValue}) => {
    setValue(newValue);
  }

  const inputProps = {
    value: value,
    onChange: onChange,
  };

   //===== estados y variables de paginación=====
   const perPages = 6
   const quantyPages = Math.ceil(location?.residents?.length / perPages)

   

  return (
    <section className='container'>
          
          <div className='formBg'>
            <form className='form' onSubmit={handleLocation}>
                
                <Autosuggest 
                  ref={inputLocation}
                  suggestions={locationNames}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
                
                <button className='form__btn'>Search</button>
            </form>
          </div>
          {
            isLoading 
            ? <Loading />
            : (
              hasError || locationId === '0'
                  ? <div className="error">
                      Please type an existing value.
                    </div>
                  : (
                    <>
                      <CardLocation 
                        location={location}
                      />
                      {location?.residents[0] && <Pagination quantyPages={quantyPages} page={page} setPage={setPage}/>}
                        {
                          location?.residents[0]
                          ?
                          <div className='cards-container'>{
                            location?.residents.map((url) => (
                            <CardResident 
                              key={url} 
                              url={url}
                            />
                          )).slice((page - 1)* perPages, (page - 1)* perPages + perPages) }
                          </div>
                          :<h2 className='error'> Location <span className='populspan'> {location?.name} </span>  has not population </h2>
                        }
                    
                      {location.residents[0] && <Pagination quantyPages={quantyPages} page={page} setPage={setPage}/>}
                    </>
                ))
          }
          
      </section>
  )
}

export default Main
