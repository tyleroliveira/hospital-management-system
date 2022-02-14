const newFormHandler = async (event) => {
    event.preventDefault();
  
    const first_name = document.querySelector('#first_name').value.trim();
    const last_name = document.querySelector('#last_name').value.trim();
    const address = document.querySelector('#address').value.trim();
    const city = document.querySelector('#city').value.trim();
    const state = document.querySelector('#state').value.trim();
    const zip = document.querySelector('#zip').value.trim();
    const country = document.querySelector('#country').value.trim();
    // const medicine = document.querySelector('#medicine').value.trim();
    const insurance = document.querySelector('#insurance').value.trim();
    // const treatment_details = document.querySelector('#treatment_details').value.trim();
    // const next_scheduled_visit = document.querySelector('#next_scheduled_visit').value.trim();
    // const amount_owed = document.querySelector('#amount_owed').value.trim();
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

  
    if (first_name && last_name && address && city && state && zip && country  && insurance && username && password) {
      const response = await fetch(`/patient/info`, {
        method: 'POST',
        body: JSON.stringify({ 
            first_name, 
            last_name, 
            address, 
            city, 
            state, 
            zip, 
            country, 
            insurance, 
            username, 
            password
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/patient/info');
      } else {
        alert('Failed to update info');
      }
    }
  };
  
//   const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
  
//       const response = await fetch(`/api/projects/${id}`, {
//         method: 'DELETE',
//       });
  
//       if (response.ok) {
//         document.location.replace('/profile');
//       } else {
//         alert('Failed to delete project');
//       }
//     }
//   };
  
  document
    .querySelector('.update-form')
    .addEventListener('submit', newFormHandler);
  
//   document
//     .querySelector('.project-list')
//     .addEventListener('click', delButtonHandler);
  