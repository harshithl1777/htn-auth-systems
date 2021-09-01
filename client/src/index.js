import axios from 'axios';

axios.get('/api/test').then(({ data }) => console.log(data));

alert('Testing');
