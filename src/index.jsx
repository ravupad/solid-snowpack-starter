import {render} from 'solid-js/dom';
import {createState, onCleanup, For} from 'solid-js';
import route, {register, setOnFailure} from './router';
import jsx from './nanocss';

const Wrapper = jsx('div', {
  'background-color': 'red',
  'padding': '10px'
});

const Li = jsx('div', {
  'background-color': 'cyan'
});

const A = () => {
  const [state, setState] = createState({
    arr: [0],
    iter: 0,
  });
  let iter = setInterval(() => setState(state => ({
    arr: [...state.arr, state.iter+1],
    iter: state.iter+1
  })), 100000);
  onCleanup(() => {
    console.log('cleanup of A');
    clearInterval(iter);
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

const App = () => {
  const [state, setState] = createState({
    component: A,
    props: {}
  });
  const r = (path, c) => register(path, (params) => {
    setState({
      component: c,
      props: params
    });
  });
  r('/', A);
  setOnFailure(() => setState({
    component: () => <div>Not Found</div>,
    props: {}
  }));
  route();
  return () => <state.component {...state.props} />;
};

render(() => <App/>, document.getElementById('root')); 

if (import.meta.hot) {
  import.meta.hot.accept(({module}) => {
    console.log('hmr update', module);
  });
  import.meta.hot.dispose(() => {
    console.log('hmr dispose');
  });
}
