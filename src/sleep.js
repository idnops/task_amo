const timeout = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const sleep = async (delay, fn, ...args) => {
  await timeout(delay);
  return fn(...args);
};

export default sleep;
