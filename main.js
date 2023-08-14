import { CircularPBar } from './components/circular-pbar.js';

const progressBar = document.getElementById('progressBar');
const trackBar = document.getElementById('trackBar');

trackBar.addEventListener('input', evt => {
    progressBar.setAttribute('value', trackBar.value);
});