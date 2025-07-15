import Cookies from 'js-cookie';


interface Credentials {
  [key: string]: string;
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

export default loginUser;
export { registerUser };
