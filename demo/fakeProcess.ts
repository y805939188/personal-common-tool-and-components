const getProcess = (() => {
  let prevProcess = 0;
  let index = 1;
  return () => {
    const getRandom = (process: number) => {
      if (process >= 100) return 100;
      index++;
      if (index > 50) return (prevProcess = process + (index = 1));
      const currentProcess = (Math.random() * 100) | 0;
      return currentProcess > process ?
        (index = 1) && (prevProcess = currentProcess) :
        getRandom(prevProcess);
    }
    return getRandom(prevProcess);
  }
})();

export default getProcess;
