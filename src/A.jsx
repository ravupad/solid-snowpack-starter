import {createState, For} from 'solid-js';
import jsx from './nanocss';
import route from './router';

const For2 = jsx('div', {
  'background-color': 'green',
  'padding': '10px'
});

const Li = jsx('div', {
  'background-color': 'red'
});

const A = () => {
  const [state, setState] = createState({
    arr: [0],
    iter: 0,
  });
  setInterval(() => setState(state => ({
    arr: [...state.arr, state.iter+1],
    iter: state.iter+1
  })), 10000);
  return (
    <For2>
      <div>Hello </div>
      <For each={state.arr}>
        {i => <Li>{i}</Li>}
      </For>
    </For2>
  );
};

export default A;
