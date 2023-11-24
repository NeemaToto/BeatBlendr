import { Route, Routes} from 'react-router-dom';
import NotFound from './NotFound';
import TextComponent from './Text';
import ButtonComponent from './Buttons';

const RouterSwitcher = () => {
  return (
    <Routes>
      <Route path='/' element={<TextComponent />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/text-component" element={<TextComponent />} />
      <Route path="/button-component" element={<ButtonComponent />} />
    </Routes>
  );
};

export default RouterSwitcher;