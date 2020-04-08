import createPanel from './panel';
import {createField, getCellArr} from './field';
import {timeCounter, stopTimer} from './features';

let timeDisplay;
let curSize: number;
let curField: HTMLElement;
let isStop = false;

function activeCells(cells: HTMLElement[], is: boolean): void {
    cells.forEach(elem => elem.setAttribute('draggable', is + ''));
}

const actions = {
  start(): void {
    curField.innerHTML = '';
    curField.append(createField(curSize));
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
  fieldContainer.classList.add('game__field-wrap');
  curField = fieldContainer;
  fieldContainer.append(field);
  game.append(panel, fieldContainer);


  function actionsHandler(e): void {
    if (e.target.dataset['btn']) {
      const action = e.target.dataset['btn'];
      actions[action]();
    }
  }

  const panelControls = document.querySelector('.game__panel__controls');
  panelControls.addEventListener('click', actionsHandler);
  timeDisplay = document.querySelector('.game__panel__time-num');
}

document.addEventListener('DOMContentLoaded', ready);
