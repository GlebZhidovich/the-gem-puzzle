import createControls from './controls';

export default (): HTMLElement => {
  const [panel, timer, steps, time, stepStart, timeStart] = [
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('div'),
    document.createElement('span'),
    document.createElement('span')
  ];

  panel.classList.add('game__panel');
  timer.classList.add('game__panel__timer');
  steps.classList.add('game__panel__steps');
  time.classList.add('game__panel__time');
  stepStart.classList.add('game__panel__steps-num');
  timeStart.classList.add('game__panel__time-num');
  stepStart.append('0');
  timeStart.append('00:00');
  steps.append('Steps: ', stepStart);
  time.append('Time: ', timeStart);
  const controls: HTMLElement = createControls();

  timer.append(steps, time);
  panel.append(controls, timer);
  return panel;
};
