function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default (size: number): HTMLElement => {
  const field = document.createElement('div');
  field.classList.add('game__field');
  const numberSet = new Set();
  while (numberSet.size !== size**2) {
    numberSet.add(getRandomInt(0, size**2) + '');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const numberArr: string[] = Array.from(numberSet);
  console.log(numberArr);
  for (let i = 0; i < size**2; i++) {
      const elem = document.createElement('div');
      elem.classList.add('game__field__cell', `m_${size}`);
      elem.setAttribute('data-cell', numberArr[i]);
      if (numberArr[i] !== '0') {
        elem.append(numberArr[i]);
      }
      field.append(elem);
  }
  return field;
};
