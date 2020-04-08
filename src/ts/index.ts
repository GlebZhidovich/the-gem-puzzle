import createPanel from './panel';
import {createField, getCellArr, addDragListener, addCells, randomNumbers} from './field';
import {timeCounter, stopTimer, setSteps, setTime} from './features';

let timeDisplay;
let curSize: number;
let curField: HTMLElement;
let isStop = false;

function activeCells(cells: HTMLElement[], is: boolean): void {
    cells.forEach(elem => elem.setAttribute('draggable', is + ''));
}

const actions = {
  start(): void {
    setSteps(0);
    setTime(0, 0);
    curField.innerHTML = '';
    const arrNum = randomNumbers(curSize);
    addCells(curSize, curField, arrNum);
    timeCounter((timeDisplay as HTMLElement));
    activeCells(getCellArr(), true);
  },
  stop(): void {
    if (!isStop) {
      isStop = !isStop;
      activeCells(getCellArr(), false);
      stopTimer();
    } else {
      isStop = !isStop;
      activeCells(getCellArr(), true);
      timeCounter((timeDisplay as HTMLElement));
    }
  },
  size(s): void {
    curSize = s;
    this.start();
  }
};

function ready(): void {
  const body = document.body;
  const game = document.createElement('section');
  game.classList.add('game');
  body.append(game);
  const fieldSize = 4;
  curSize = fieldSize;
  const [panel, field, fieldContainer] = [
    createPanel(),
    createField(fieldSize),
    document.createElement('div')
  ];
  const arrNum = randomNumbers(curSize);
  addCells(curSize,field, arrNum);
  fieldContainer.classList.add('game__field-wrap');
  curField = field;
  addDragListener(field);
  fieldContainer.append(field);
  game.append(panel, fieldContainer);


  function actionsHandler(e): void {
    if (e.target.dataset['btn']) {
      const action = e.target.dataset['btn'];
      actions[action]();
    }
    if (e.target.dataset['size']) {
      const cellSize = e.target.dataset['size'];
      console.log(cellSize);
      actions['size'](cellSize);
    }
  }

  const panelControls = document.querySelector('.game__panel__all-controls-btn');
  panelControls.addEventListener('click', actionsHandler);
  timeDisplay = document.querySelector('.game__panel__time-num');
}

document.addEventListener('DOMContentLoaded', ready);
