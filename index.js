'use strict';

const appUrl ="application/vnd.github.v3+json";

const searchUrl = 'https://api.github.com/users/';


function formatQueryParams(username){
 // const queryItems = Object.keys(username)
  const queryItems = username;
  return queryItems;
  
}



function displayResults(responseJson){

  const searchUser = $('#search-user').val();
  $('#results-list').empty();

  $('#results-list').append(`<h3> User Name: ${searchUser}</h3>`);

  for (let i = 0; i < responseJson.length; i++){

    $('#results-list').append(

      `<li>
  
      <p>${responseJson[i].name}</p>
      <p> Url: ${responseJson[i].clone_url}</p>
   
      
      </li>`
      
      )};
    $('#results').removeClass('hidden');
}


function getUsers(username){
const params={
  username: username,
};


  const queryString = formatQueryParams(username)
  const url = searchUrl  + queryString + '/repos';

 // console.log(url);

  const options = {
    header: new Headers({"Accept" : appUrl}),
    };
  

  fetch(url, options)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  });
}




function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchUser = $('#search-user').val();
    getUsers(searchUser);
  });
}

$(watchForm);