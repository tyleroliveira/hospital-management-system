const newFormHandler = async (event) => {
    event.preventDefault();
  
    const first_name = document.querySelector('#first_name').value.trim();
    const last_name = document.querySelector('#last_name').value.trim();
    const address = document.querySelector('#address').value.trim();
    const city = document.querySelector('#city').value.trim();
    const state = document.querySelector('#state').value.trim();
    const zip = document.querySelector('#zip').value.trim();
    const country = document.querySelector('#country').value.trim();
    const insurance = document.querySelector('#insurance').value.trim();
    const username = document.querySelector('#username').value.trim();
      const response = await fetch(`/api/patient`, {
        method: 'PUT',
        body: JSON.stringify({ 
            first_name, 
            last_name, 
            address, 
            city, 
            state, 
            zip, 
            country, 
            insurance, 
            username
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
  };
  document
    .querySelector('.update-form')
    .addEventListener('submit', newFormHandler);
  