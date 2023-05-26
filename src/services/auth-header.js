export default function authHeader() {
  const access_token = localStorage.getItem('access_token');
  console.log("access_token", access_token);

  if (access_token) {

    const config = {
     
        "Content-type": "application/json; charset=UTF-8",
        'Accept': 'application/json',
        Authorization: `Bearer ${access_token}` 
    };

    
    return config;

  } else {
    return {};
  }
}