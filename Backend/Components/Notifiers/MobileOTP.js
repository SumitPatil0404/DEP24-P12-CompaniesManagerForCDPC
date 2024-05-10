const fetch = require('node-fetch');

const fun=async ()=>
{

    const url = 'https://telesign-telesign-voice-verify-v1.p.rapidapi.com/voice-verify?phone_number=%2B919817006334&verify_code=1234';
    const options = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': '5f37f3e691msh6d0ae36238fa885p162fd9jsn28c6cbb9dac3',
        'X-RapidAPI-Host': 'telesign-telesign-voice-verify-v1.p.rapidapi.com'
      }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fun();