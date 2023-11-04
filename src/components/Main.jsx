import { useEffect, useRef, useState } from 'react';
import useFetch from '../hooks/useFetch'
import getRandom from '../js/getRandom';
import CardLocation from '../components/CardLocation';
import CardResident from '../components/CardResident';
import Loading from './Loading';
import ubicate from '../locations.json';

const Main = () => {

  const [ locationId, setLocationId ] = useState(getRandom());
  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const [ location, getLocation, isLoading, hasError ] = useFetch(url);
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
    e.preventDefault();
    setLocationId(inputLocation.current.value.trim());
    inputLocation.current.value = '';
  }

  

  return (
    <section className='container'>
          
          <div className='formBg'>
            <form className='form' onSubmit={handleLocation}>
                
                <input className='form__input' ref={inputLocation} type='text' required/>
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
                      <div className='cards-container'>
                        {
                          location?.residents.map((url) => (
                            <CardResident 
                              key={url} 
                              url={url}
                            />
                          ))
                        }
                      </div>
                    </>
                ))
          }
      </section>
  )
}

export default Main
