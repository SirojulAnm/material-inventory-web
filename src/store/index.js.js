import { atom } from 'recoil';

const getTokenStateFromLocalStorage = () => {
  const tokenState = localStorage.getItem('tokenStorage');
  return tokenState ? { check: true, user: JSON.parse(tokenState) } : { check: false, user: [] };
}

export const tokenState = atom({
  key: 'tokenState',
  default: getTokenStateFromLocalStorage(),
});

// export const tokenState = atom({
//   key: 'tokenState',
//   default: {
//     check: false,
//     user: []
//   },
// });
