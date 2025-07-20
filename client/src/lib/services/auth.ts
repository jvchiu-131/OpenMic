import Cookies from 'js-cookie';


interface Credentials {
  [key: string]: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  profilePic: string;
  genres: string[];
  instruments: string[];
  contact: string;
}

const loginUser = async (credentials: Credentials) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

   
    Cookies.set('token', data.token, { expires: 1 }); // 1 day

    return data;
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
};

const registerUser = async (credentials: Credentials) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    return data; // success
  }catch (error) {
    console.log('URL:', `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`);
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}


  const registerMusician = async (formData: FormData) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error('No token found. Please login first.');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/musicians/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Musician registration failed');
    }

    return data; // success
  } catch (error) {
    console.error(error);
    return { error: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

export default loginUser;
export { registerUser, registerMusician };
