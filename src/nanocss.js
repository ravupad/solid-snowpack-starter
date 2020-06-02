import h from 'solid-js/h';
import {create} from 'nano-css';
import {addon as addonrule} from 'nano-css/addon/rule';
import {addon as   addonjsx} from 'nano-css/addon/jsx';

const nano = create({h});
addonrule(nano);
addonjsx(nano);
const {jsx} = nano;

export default jsx;
