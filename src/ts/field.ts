import {
  getTime,
  getSteps,
  stopTimer,
  addSteps,
  getCellArr,
  setCellArr,
  addCellArr,
  setCellArrNum, getCellArrNum, setTop, getTop
} from './features';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

let dragSrcEl: HTMLElement | null = null;

export function activeCells(cells: HTMLElement[], is: boolean): void {
  cells.forEach(elem => elem.setAttribute('draggable', is + ''));
}

function compareNumbers(a: number, b: number): number {
  return a - b;
}

function addResult(steps: number): void {
  const newTop = getTop();
  const index = newTop.findIndex(elem => steps > elem);
  if (index === -1 && newTop.length > 10) {
    return;
  }
  if (index !== -1 && newTop.length > 10) {
    newTop[index] = steps;
  }
  newTop.push(steps);
  setTop(newTop.sort(compareNumbers));
}

function checkResult(arr: HTMLElement[]): void {
  const result = arr.every((elem, i) => {
    if (arr.length - 1 === i) {
      return  elem.textContent === '';
    }
    return  elem.textContent === i + 1 + '';
  });
  if (result) {
    stopTimer();
    activeCells(getCellArr(), false);
    addResult(getSteps());
    alert(`Ура! Вы решили головоломку за ${getTime()} и ${getSteps()} ходов`);
  }
}

function handleDragStart(e: DragEvent): void {
  if ((e.target as HTMLElement).textContent === '') {
    return;
  }
  (e.target as HTMLElement).classList.add('drag');
  dragSrcEl = (e.target as HTMLElement);

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', dragSrcEl.innerHTML);
}

function handleDragOver(e: DragEvent): boolean {
  if (e.preventDefault) {
    e.preventDefault();
  }
  if ((e.target as HTMLElement).textContent === '') {
    e.dataTransfer.dropEffect = 'move';
  } else {
    e.dataTransfer.dropEffect = 'none';
  }
  return false;
}

function handleDrop(e: DragEvent): boolean {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl !== e.target) {
    dragSrcEl.innerHTML = (e.target as HTMLElement).innerHTML;
    (e.target as HTMLElement).innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}

function handleDragEnd(e): void {
  e.target.classList.remove('drag');
  checkResult(getCellArr());
  addSteps(1);
}

export function addDragListener(elem: HTMLElement): void {
  elem.addEventListener('dragstart', handleDragStart);
  elem.addEventListener('dragover', handleDragOver);
  elem.addEventListener('drop', handleDrop);
  elem.addEventListener('dragend', handleDragEnd);
}

export function addCells(size: number, field: HTMLElement, numArr: string[]): void {
  let newNumArr = numArr;
  if (getCellArrNum()) {
    newNumArr = getCellArrNum();
    setCellArrNum(null);
  }
  setCellArr([]);
  for (let i = 0; i < size**2; i++) {
    const elem = document.createElement('div');
    addCellArr(elem);
    elem.classList.add('game__field__cell', `m_${size}`);
    field.append(elem);
    if (newNumArr[i] === '0') {
      continue;
    }
    elem.append(newNumArr[i]);
  }
}

export function randomNumbers(size: number): string[] {
  const numberSet = new Set();
  while (numberSet.size !== size**2) {
    numberSet.add(getRandomInt(0, size**2) + '');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return Array.from(numberSet);
}

export function createField (): HTMLElement {
  const field = document.createElement('div');
  field.classList.add('game__field');
  return field;
}
