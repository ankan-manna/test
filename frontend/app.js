// app.js

const API_BASE_URL = 'http://localhost:8000/api/v1'; // Replace with your backend URL

// Function to handle API requests
async function handleApiRequest(url, method, data = null, headers = {}) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  return handleApiResponse(response);
}
async function handleApiFormDataRequest(url, method, data = null, headers = {}) {
    const options = {
      method,
      headers: {
        ...headers,
      },
      body : data,
    };
  
    const response = await fetch(url, options);
    return handleApiResponse(response);
  }

// Function to handle API responses
async function handleApiResponse(response) {
  const contentType = response.headers.get('content-type');
  let responseData;

  if (contentType && contentType.includes('application/json')) {
    responseData = await response.json();
  } else {
    responseData = await response.text(); 
  }

  if (!response.ok) {
    const errorMessage = responseData?.message || response.statusText;
    throw new Error(errorMessage);
  }

  return responseData;
}

// Function to handle user registration
async function registerUser(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  try {
    const response = await handleApiFormDataRequest(`${API_BASE_URL}/users/register`, 'POST', formData);
    alert('User registered successfully!');
    form.reset();
  } catch (error) {
    alert(`Registration failed: ${error.message}`);
  }
}

// Function to handle user login
async function loginUser(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.elements.email.value;
  const username = form.elements.username.value;
  const password = form.elements.password.value;

  const loginData = {};
  if (email) {
    loginData.email = email;
  }
  if (username) {
    loginData.username = username;
  }
  loginData.password = password;

  try {
    const response = await handleApiRequest(`${API_BASE_URL}/users/login`, 'POST', loginData);
    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    alert('User logged in successfully!');
    form.reset();
    fetchUserDetails(); 
  } catch (error) {
    alert(`Login failed: ${error.message}`);
  }
}

// Function to handle user logout
async function logoutUser() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    await handleApiRequest(`${API_BASE_URL}/users/logout`, 'POST', null, {
      Authorization: `Bearer ${accessToken}`,
    });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    alert('User logged out successfully!');
    const userDetailsSection = document.getElementById('userDetails');
    userDetailsSection.innerHTML = ''; 
  } catch (error) {
    alert(`Logout failed: ${error.message}`);
  }
}

// Function to fetch user details
async function fetchUserDetails() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error("User not logged In");
    }
    const response = await handleApiRequest(`${API_BASE_URL}/users/current-user`, 'GET', null, {
      Authorization: `Bearer ${accessToken}`,
    });

    const userDetailsSection = document.getElementById('user-details');

    userDetailsSection.innerHTML = `
      <p>Full Name: ${response.data.fullName}</p>
      <p>Username: ${response.data.username}</p>
      <p>Email: ${response.data.email}</p>
      <img src="${response.data.avatar}" alt="Avatar" style="width: 100px; height: 100px;">
    `;
  } catch (error) {
    alert(`Failed to fetch user details: ${error.message}`);
  }
}

// Function to handle update account
async function updateUserAccount(event) {
    event.preventDefault();
    const form = event.target;
    const fullName = form.elements.fullName.value;
    const email = form.elements.email.value;

    const updateData = {
      fullName,
      email
    };
    
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
          throw new Error("User not logged In");
      }
      const response = await handleApiRequest(`${API_BASE_URL}/users/update-account`, 'PATCH', updateData, {
        Authorization: `Bearer ${accessToken}`,
      });
      alert('User details updated successfully!');
      fetchUserDetails();
    
    
  }
  
  // Function to change user password
  async function changePassword(event) {
    event.preventDefault();
    const form = event.target;
    const oldPassword = form.elements.oldPassword.value;
    const newPassword = form.elements.newPassword.value;
    const changePasswordData = {
      oldPassword,
      newPassword
    };
  
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error("User not logged In");
        }
      await handleApiRequest(`${API_BASE_URL}/users/change-password`, 'POST', changePasswordData, {
        Authorization: `Bearer ${accessToken}`,
      });
      alert('Password changed successfully!');
      form.reset();
    } catch (error) {
      alert(`Failed to change password: ${error.message}`);
    }
  }

// Event listeners for forms and buttons
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const updateForm = document.getElementById('updateForm');
    const changePasswordForm = document.getElementById('changePasswordForm');
  
    if (registerForm) {
      registerForm.addEventListener('submit', registerUser);
    }
    if (loginForm) {
      loginForm.addEventListener('submit', loginUser);
    }
    if (logoutButton) {
      logoutButton.addEventListener('click', logoutUser);
    }
    if(updateForm){
        updateForm.addEventListener('submit', updateUserAccount)
    }
    if (changePasswordForm){
        changePasswordForm.addEventListener('submit', changePassword);
    }

    if (localStorage.getItem('accessToken')) {
        fetchUserDetails();
      }
  });