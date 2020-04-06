function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

let selected: HTMLElement | null = null;
let dragSrcEl: HTMLElement | null = null;
const cellArr: HTMLElement[] = [];

function checkResult(arr: HTMLElement[]): void {
  const result = arr.every((elem, i) => {
    if (arr.length - 1 === i) {
      return  elem.textContent === '';
    }
    return  elem.textContent === i + 1 + '';
  });
  console.log(result);
}

function handleDragStart(e: DragEvent): void {
  if (this.textContent === '') {
    return;
  }
  this.classList.add('drag');
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e: DragEvent): boolean {
  if (e.preventDefault) {
    e.preventDefault();
  }
  if (this.textContent === '') {
    e.dataTransfer.dropEffect = 'move';
  } else {
    e.dataTransfer.dropEffect = 'none';
  }
  return false;
}

function handleDragEnter(): void {
  if (this.textContent === '') {
    selected = this;
    this.classList.add('over');
  }
}

function handleDragLeave(): void {
  if (selected) {
    selected = null;
    this.classList.remove('over');
  }
}

function handleDrop(e: DragEvent): boolean {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  return false;
}

function handleDragEnd(): void {
  if (selected) {
    selected.classList.remove('over');
  }
  this.classList.remove('drag');
  checkResult(cellArr);
}

function addHandlers() {

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

  for (let i = 0; i < size**2; i++) {
      const elem = document.createElement('div');
      cellArr.push(elem);
      elem.classList.add('game__field__cell', `m_${size}`);
      elem.setAttribute('draggable', 'false');
      elem.addEventListener('dragstart', handleDragStart);
      elem.addEventListener('dragenter', handleDragEnter);
      elem.addEventListener('dragover', handleDragOver);
      elem.addEventListener('dragleave', handleDragLeave);
      elem.addEventListener('drop', handleDrop);
      elem.addEventListener('dragend', handleDragEnd);
      if (numberArr[i] !== '0') {
        elem.append(numberArr[i]);
      }
      field.append(elem);
  }
  return field;
};
