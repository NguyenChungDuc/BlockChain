import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InitRouters from './Router';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {InitRouters.map((route, index) => {
          if (route.children) {
            return (
              <Route key={index} path={route.path} element={route.element}>
                {
                  route.children.map((children, index) => (
                    <Route
                      key={index}
                      path={children.path}
                      element={children.element}
                    />
                  ))}
              </Route>
            );
          } else {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          }
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;