import LoopPromise from '../src';

let index = 0;
const addPromise = (params) => (
	new Promise((res) => {
		// console.log(++index)
		res(index++);
	})
)

const loop = new LoopPromise(addPromise);

const oDiv = document.querySelector('#console');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
btn1.addEventListener('click', () => {
	loop.restart();
});
btn2.addEventListener('click', () => {
	loop.immediatelyInterrupt();
});

loop
	.time(1000) // 每隔1秒触发一次
	.interruptTime((res) => (res !== 10), true) // 当返回true的时候就一直loop
	.params(() => ('params')) // 设置参数
	.filterRes(res => res) // 统一处理resolved值
	.callback(res => { oDiv.innerHTML = `${oDiv.innerHTML} ${res}` }) // 回调

loop.trim(); // 开始轮询promise
