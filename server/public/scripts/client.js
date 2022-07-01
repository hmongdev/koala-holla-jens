console.log('js');

$(document).ready(function () {
    console.log('JQ');
    // Establish Click Listeners
    setupClickListeners();
    //refresh if get new koalas
    getKoalas();
    // load existing koalas on page load
    renderKoalas();
}); // end doc ready

function setupClickListeners() {
    // $('#addButton').on('click', saveKoala);
    // $('#viewKoalas').on('click', '#btn-transfer', markTransfer);
}

//GET koala
function getKoalas() {
    console.log('in getKoalas');

    // ajax call to server to get koalas
    $.ajax({
        type: 'GET',
        url: '/koalas',
    })
        .then(function (response) {
            console.log(response);
            renderKoalas(response);
        })
        .catch(function (error) {
            console.log('error in GET', error);
        });
}

//POST koala
// function saveKoala() {
//     // get user input and put in an object
//     let newKoala = {
//         name: $('#nameIn').val(),
//         age: $('#ageIn').val(),
//         gender: $('#genderIn').val(),
//         readyForTransfer: $('#readyForTransferIn').val(),
//         notes: $('#notesIn').val(),
//     };
//     console.log('in saveKoala', newKoala);
//     // ajax call to server to get koalas
//     $.ajax({
//         type: 'POST',
//         url: '/koalas',
//         data: newKoala,
//     })
//         .then(function (response) {
//             console.log('Response from server.', response);
//             renderKoalas();
//         })
//         .catch(function (error) {
//             console.log('Error in POST', error);
//             alert('Unable to add koala at this time. Please try again later.');
//         });
// }

//Render to DOM
function renderKoalas(koalas) {
    //emptying the koala history
    $('#viewKoalas').empty();
    for (let i = 0; i < koalas.length; i += 1) {
        // For each koala, append a new row to our table
        $('#viewKoalas').append(`
      <tr>
        <td>${koalas[i].name}</td>
        <td>${koalas[i].age}</td>
        <td>${koalas[i].gender}</td>
        <td>${koalas[i].readyForTransfer}</td>
        <td>${koalas[i].notes}</td>
        <td>
        <button data-id=${koalas[i].id}
        data-transfer="transfer"
        id="btn-transfer">Transfer</button>
        </td>
      </tr>
    `);
    }
}
