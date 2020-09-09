import LoopPromise from '../';

describe('测试LoopPromise', () => {
  test("Test LoopPromise", (cb) => {
    const fn = jest.fn();
    let index1 = 0;
    let index2 = 0;
    let index3 = 0;
    const TestPromise1 = () => (
      new Promise((resolve) => {
        resolve(++index1);
      })
    );
    const TestPromise2 = () => (
      new Promise((resolve) => {
        fn();
        resolve(++index2);
      })
    );
    const TestPromise3 = () => (
      new Promise((resolve, reject) => {
        reject();
      })
    );
    const TestPromise4 = () => (
      new Promise((resolve, reject) => {
        resolve(++index3);
      })
    )
    const loop1 = new LoopPromise(TestPromise1);
    const loop2 = new LoopPromise(TestPromise2);
    const loop3 = new LoopPromise(TestPromise3);
    const loop4 = new LoopPromise(TestPromise4);
    loop1
      .time(1000)
      .interruptTime(res => (res !== 3))
      .params(() => (''))
      .filterRes(res => res)
      .callback(res => {})
      .trim()
    setTimeout(() => loop1.immediatelyInterrupt(true), 1500)
    loop2
      .time(1500)
      .interruptTime(3, true)
      .callback(res => {
        if (res === 3) {
          expect(fn).toBeCalledTimes(3);
          loop2.clear();
          cb();
        }
      })
      .trim()
    loop3
      .time(1000)
      .trim()
    loop4
      .time(() => (index3*1000))
      .interruptTime(2)

    setTimeout(() => {
      loop2.immediatelyInterrupt();
      setTimeout(() => {
        loop2.restart();
      }, 1000)
    }, 1000)
    

  }, 10000);
});
