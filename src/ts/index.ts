import createPanel from './panel';
import createField from './field';

function ready(): void {
  const body = document.body;
  const game = document.createElement('section');
  game.classList.add('game');
  body.append(game);
  const fieldSize = 4;
  const [panel, field] = [createPanel(), createField(fieldSize)];
  game.append(panel, field);
}

document.addEventListener('DOMContentLoaded', ready);
