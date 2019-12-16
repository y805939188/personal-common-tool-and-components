import LoopPromise from '../src';
import ajaxFetchProcess from './fakeProcess';

const fetchOriginData = () => (
  new Promise((resolved) => {
    const result = ajaxFetchProcess();
    resolved(result);
  })
);

const loop = new LoopPromise(fetchOriginData);
const oProgress1 = document.querySelector('#progress1');
const oProgress2 = document.querySelector('#progress2');
const btn1 = document.querySelector('#btn3');
const btn2 = document.querySelector('#btn4');
btn1.addEventListener('click', () => {
	loop.trim();
});
btn2.addEventListener('click', () => {
	loop.immediatelyInterrupt();
});

loop
  .time(2000)
  .interruptTime(res => res !== 100)
  .callback(res => (oProgress1.innerHTML = `进度: ${res}%`) && oProgress2.setAttribute('value', res))
