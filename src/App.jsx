import CryptoJS from 'crypto-js';
import { generate_yzm_key9 } from './utils/yzm-query/key9';
import { generate_vat_key9 } from './utils/vat-query/key9';

const App = () => {
  window.CryptoJS = CryptoJS;
  window.generate_yzm_key9 = generate_yzm_key9;
  window.generate_vat_key9 = generate_vat_key9;
  return <h1>Hello World</h1>;
};

export default App;