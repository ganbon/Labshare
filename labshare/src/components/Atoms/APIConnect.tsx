const APIConnect = async (url:string,requestdata:any) => {
    // console.log(requestdata)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestdata)
    });
    const data = await response.json();
  return data.response
  };

  export default APIConnect