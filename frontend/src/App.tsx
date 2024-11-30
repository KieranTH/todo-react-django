import { Header } from './components';
import { Toaster } from './components/toaster';
import { Body } from './pages';

function App() {
  return (
    <div className='bg-gray-200 w-screen h-screen'>
      <Header/>
      <Body></Body>
      <Toaster/>
    </div>
  );
}

export default App;
