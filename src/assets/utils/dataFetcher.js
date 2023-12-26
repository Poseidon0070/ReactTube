import axios from 'axios';
const API_KEY = 'e7f08b9a73msh0362970b4d37f32p13b06ajsn0ea61fc2b55f'
const BASE_URL =  'https://youtube-v31.p.rapidapi.com'

const options = {
  params: {
    maxResults: '52',
  },
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  } 
};

let fetchData = async (URL) => {
    try{
        const response = await axios.get(`${BASE_URL}/${URL}`,options);
        return response.data;
    }catch{
        throw new Error("Could not fetch data...")
    }
}

export default fetchData
