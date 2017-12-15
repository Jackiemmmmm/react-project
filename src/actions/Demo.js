export const demoTest = (a, b) => {
  console.log(a, b);
  return { type: 'TEST', test: 'change' };
};

export const crashButton = () => (
  { type: 'CRUSH_IN_THE_REDUCER' }
);
