
const names = document.getElementsByClassName('the-name');
const occupations = document.getElementsByClassName('the-occupation');
const weapons = document.getElementsByClassName('the-weapon');

const  ihCrudApiRequest = axios.create( { baseURL : 'https://ih-crud-api.herokuapp.com/' } );

// Add a character

document.getElementById('character-form').onsubmit = (event) => {  // See available argument: event
    
    event.preventDefault();                                        // prevent refresh of the page

    const characterDetail = {
        name: names[0].value,
        occupation: occupations[0].value,
        weapon: weapons[0].value
    };

    
    ihCrudApiRequest.post('/characters',characterDetail)
        .then( newCharacter => {
            console.log(`New character added:`,newCharacter);
        
            const { id, name } = newCharacter.data;
            const characterDOM = `
                <li>
                    <h3> ${name} </h3>
                    <p> Id: ${id} </p>
                </li>
            `
            document.getElementById('characters-list').innerHTML += characterDOM
        })
        .catch(err => {
            console.log(`Error in adding character: ${err}`)})
}


// Update a character

    // 1. GET character ID        
    // 2. Pre-fill update form
const idInput = document.getElementById('character-id-input')
document.getElementById('getButton').onclick = () => {
    const idToUpdate = document.getElementById('theCharId').value;
    // console.log('idToUpdate', idToUpdate)
    ihCrudApiRequest.get(`/characters/${idToUpdate}`)
        .then( charToPreFillForm => {
            console.log('charToPreFillForm', charToPreFillForm);

            document.getElementById("character-form").style.display = "none";
            document.getElementById("updateForm").style.display = "block";

            names[1].value = charToPreFillForm.data.name;
            occupations[1].value = charToPreFillForm.data.occupation;
            weapons[1].value = charToPreFillForm.data.weapon;
            idInput.value = charToPreFillForm.data.id;
        })
        .catch(err => {
            document.getElementById("updateForm").style.display="none";

            // console.log(`Error by getting char to update: ${err}`)
            if(err.response.status === 404) {
                const errMess = `The id ${idToUpdate} doesnt exist`;
                // console.log('errMess', errMess)
                const errDiv = document.createElement('div');
                errDiv.innerHTML = errMess;
                // errDiv.setAttribute("id", "error");
                document.body.appendChild(errDiv)
            }
        })
}

    // 3. Update the charatcer
document.getElementById('update-form').onsubmit = (event) => {
    event.preventDefault();

    const idToUpdate = document.getElementById('theCharId').value;
    
    const charToUpdateAPI = {
        name : names[1].value,
        occupation : occupations[1].value,
        weapon : weapons[1].value,
    };

    ihCrudApiRequest.patch(`/characters/${idToUpdate}`, charToUpdateAPI)
        .then(updatedChar => {
            console.log('updatedChar', updatedChar);
            
            document.getElementById("update-form").reset();                     // reset the form
            document.getElementById("update-form").style.display = "none";
          
            const { name, id } = updatedChar.data;
          const updatedCharacterHtml = `
          <h2>Updated character with ID ${idToUpdate}: </h2>
          <li>
            <h3> ${name} </h3>
            <p> Id: ${id} </p>
          </li>
          `;
          document.getElementById("characters-list").innerHTML = "";
          document.getElementById("characters-list").innerHTML += updatedCharacterHtml;
        })
        .catch(err => console.log(`Error while updating: ${err}`))
}


document.getElementById("add-char").onclick = function(event){
    document.getElementById("character-form").style.display = "block";
}
 
document.getElementById("update-char").onclick = function(event){
    document.getElementById("update-form").style.display = "block";
}



// document.getElementById('post-wall-e').onclick = () => {
//     const characterInfo = {
//         name:       'WALL-E',
//         occupation: 'Waste Allocation Robot',
//         weapon:     'Head laser'
//       };

//     const  ihCrudApiRequest = axios.create( { baseURL : 'https://ih-crud-api.herokuapp.com/' } );
    
//     ihCrudApiRequest.post('/characters',characterInfo)
//         .then( newCharacter => {
//             console.log(`New character added:`,newCharacter);
        
//             const { id, name } = newCharacter.data;
//             const characterDOM = `
//                 <li>
//                     <h3> ${name} </h3>
//                     <p> Id: ${id} </p>
//                 </li>
//             `
//             document.getElementById('characters-list').innerHTML += characterDOM
//         })
//         .catch(err => {
//             console.log(`Error in adding character: ${err}`)})
    
    
//     // axios.post('https://ih-crud-api.herokuapp.com/characters', characterInfo)
//     //   .then( newCharacter => {
//     //       console.log(`New character added:`,newCharacter)})
//     //   .catch(err => {
//     //       console.log(`Error in adding character: ${err}`)})
// }


   