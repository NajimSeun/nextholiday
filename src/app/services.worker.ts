/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const countries = data.countries ;
const sessionStorage = data.sessionStorage ;
  countries.forEach(country => {
    sessionStorage.setItem(country.alpha3Code , JSON.stringify(country)) ;
  });
  sessionStorage.setItem("sessionSet" , "1") ;
  postMessage("All countries saved") ;
});
