import theme from '/@island/theme';

export const Islands = theme.islands;

window.ISLANDS = Islands;
window.ISLAND_PROPS = JSON.parse(
  document.getElementById('island-props')!.textContent!
);
