import createPanel from './panel';
import {createField, addDragListener, addCells, randomNumbers, activeCells} from './field';
import {
  timeCounter,
  stopTimer,
  setSteps,
  setTime,
  getCellArr,
  getData,
  getTimer,
  setCellArrNum,
  setData
} from './features';

let timeDisplay;
let curSize: number;
let curField: HTMLElement;

const actions = {
  'new game'(): void {
    setSteps(0);
    setTime(0, 0);
    curField.innerHTML = '';
    const arrNum = randomNumbers(curSize);
    addCells(curSize, curField, arrNum);
    timeCounter((timeDisplay as HTMLElement));
    activeCells(getCellArr(), true);
  },
  'start/stop'(): void {
    if (getTimer()) {
      activeCells(getCellArr(), false);
      stopTimer();
    } else {
      activeCells(getCellArr(), true);
      timeCounter((timeDisplay as HTMLElement));
    }
  },
  save() {
      this['start/stop']();
      setCellArrNum(getCellArr());
      localStorage.setItem('data', JSON.stringify(getData()));
      alert('You save game');
  },
  size(s): void {
    curSize = s;
    this['start/stop']();
  }
};

function ready(): void {
  if (localStorage.getItem('data')) {
    const data = JSON.parse(localStorage.getItem('data'));
    setData(data);
  }
  const body = document.body;
  const game = document.createElement('section');
  game.classList.add('game');
  body.append(game);
  const fieldSize = 4;
  curSize = fieldSize;
  const [panel, field, fieldContainer] = [
    createPanel(),
    createField(),
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
      if (actions[action]) {
        actions[action]();
      }
    }
    if (e.target.dataset['size']) {
      const cellSize = e.target.dataset['size'];
      actions['size'](cellSize);
    }
  }

  const panelControls = document.querySelector('.game__panel__all-controls-btn');
  panelControls.addEventListener('click', actionsHandler);
  timeDisplay = document.querySelector('.game__panel__time-num');
}

document.addEventListener('DOMContentLoaded', ready);
