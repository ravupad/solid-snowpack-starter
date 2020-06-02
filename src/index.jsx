import {render} from 'solid-js/dom';
import {createState, onCleanup} from 'solid-js';
import route, {register, setOnFailure} from './router';
import A from './A';

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
  return () => <state.component {...state.props}/>;
};

render(() => <App/>, document.getElementById('root')); 
