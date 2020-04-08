import {addSteps} from './features';
import {getTime, getSteps} from './features';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

let dragSrcEl: HTMLElement | null = null;
const cellArr: HTMLElement[] = [];

export function getCellArr(): HTMLElement[] {
    return cellArr;
}

function checkResult(arr: HTMLElement[]): void {
  const result = arr.every((elem, i) => {
    if (arr.length - 1 === i) {
      return  elem.textContent === '';
    }
    return  elem.textContent === i + 1 + '';
  });
  if (result) {
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
  checkResult(cellArr);
  addSteps(1);
}

export function addDragListener(elem: HTMLElement): void {
  elem.addEventListener('dragstart', handleDragStart);
  elem.addEventListener('dragover', handleDragOver);
  elem.addEventListener('drop', handleDrop);
  elem.addEventListener('dragend', handleDragEnd);
}

export function addCells(size: number, field: HTMLElement, numArr: string[]): void {
  for (let i = 0; i < size**2; i++) {
    const elem = document.createElement('div');
    cellArr.push(elem);
    elem.classList.add('game__field__cell', `m_${size}`);
    // elem.setAttribute('draggable', 'true');
    field.append(elem);
    if (numArr[i] === '0') {
      continue;
    }
    elem.append(numArr[i]);
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

export function createField (size: number): HTMLElement {
  const field = document.createElement('div');
  field.classList.add('game__field');
  return field;
}
