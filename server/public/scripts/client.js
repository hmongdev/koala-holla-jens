console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  renderKoalas();
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
  

    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
  $('#viewKoalas').on('click', '#btn-transfer', markTransfer);
}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
} // end getKoalas

function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to get koalas
}
function markTransfer() {
  console.log('In markTransfer');
  let koalasId = $(this).data('id');
  let markTransfer = $(this).data('transfer');
//PUT request
$.ajax({
  method: 'PUT',
  url: `/koalas/transfer/${koalasId}`,
  data: { transfer: markTransfer },
})
  .then(function () {
    refreshBooks();
    console.log('Finished markTransfer');
  })
  .catch(function (error) {
    alert('ERRRRRRRROOOOR on markTransfer:', error);
  });
}
function renderKoalas() {
  $('viewKoalas').empty();

  for (let i = 0; i < koalas.length; i += 1) {
    let koalas = koalas[i];
    // For each koala, append a new row to our table
    $('#viewKoalas').append(`
      <tr>
        <td>${koalas.name}</td>
        <td>${koalas.age}</td>
        <td>${koalas.gender}</td>
        <td>${koalas.readyForTransfer}</td>
        <td>${koalas.notes}</td>
        <td>
        <button data-id=${koalas[i].id}
        data-transfer="transfer"
        id="btn-transfer">Transfer</button>
        </td>
      </tr>
    `);
  }
}
