async function handleApiRequest(url, method, body, token) {
    const headers = {};
  
    let config = {
      method,
      headers,
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    if (body) {
      if (body instanceof FormData) {
        config.body = body;
      } else {
        headers['Content-Type'] = 'application/json';
        config.body = JSON.stringify(body);
      }
    }
  
    try {
      const response = await fetch(url, config);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      if (response.status !== 204) { // No content
        return await response.json();
      }
  
      return null; // Or return a success status, e.g., { success: true }
    } catch (error) {
      console.error("API Error:", error);
      throw error; 
    }
}

const registerUser = async (userData) => {
    try {
      return await handleApiRequest('/api/v1/users/register', 'POST', userData);
    } catch (error) {
      throw error;
    }
};

const loginUser = async (credentials) => {
    try {
      return await handleApiRequest('/api/v1/users/login', 'POST', credentials);
    } catch (error) {
      throw error;
    }
};

const logoutUser = async (token) => {
    try {
      return await handleApiRequest('/api/v1/users/logout', 'POST', null, token);
    } catch (error) {
      throw error;
    }
};

const fetchUserDetails = async (token) => {
    try {
      return await handleApiRequest('/api/v1/users/current-user', 'GET', null, token);
    } catch (error) {
      throw error;
    }
};

const updateAccount = async (userData, token) => {
    try {
      return await handleApiRequest('/api/v1/users/update-account', 'PATCH', userData, token);
    } catch (error) {
      throw error;
    }
};

const changePassword = async (passwords, token) => {
    try {
      return await handleApiRequest('/api/v1/users/change-password', 'POST', passwords, token);
    } catch (error) {
      throw error;
    }
};

export {
    handleApiRequest,
    registerUser,
    loginUser,
    logoutUser,
    fetchUserDetails,
    updateAccount,
    changePassword,
};