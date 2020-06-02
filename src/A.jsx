import {createState, For, onCleanup} from 'solid-js';
import jsx from './nanocss';
import route from './router';

const Wrapper = jsx('div', {
  'background-color': 'cyan',
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
  let iter = setInterval(() => setState(state => ({
    arr: [...state.arr, state.iter+1],
    iter: state.iter+1
  })), 1000);
  onCleanup(() => {
    console.log('cleanup of A');
    clearIterval(iter);
  });
  return (
    <Wrapper>
      <input type="text" placeholder="input" />
      <div>Hello </div>
      <For each={state.arr}>
        {i => <Li>{i}</Li>}
      </For>
    </Wrapper>
  );
};

export default A;
