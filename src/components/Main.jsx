import { useEffect, useRef, useState } from 'react';
import useFetch from '../hooks/useFetch'
import getRandom from '../js/getRandom';
import CardLocation from '../components/CardLocation';
import CardResident from '../components/CardResident';

const Main = () => {

  const [ locationId, setLocationId ] = useState(getRandom());
  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const [ location, getLocation, isLoading, hasError ] = useFetch(url);

  useEffect( () => {
    getLocation();
  }, [locationId]);

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
            ? <h2> Loading.... </h2>
            : (
              hasError || locationId === '0'
              ? <h2> Hey you must provide an id from 1 to 126 </h2>
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
