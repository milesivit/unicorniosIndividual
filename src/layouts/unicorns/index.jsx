import { Routes, Route } from 'react-router-dom';
import UnicornsView from './UnicornsView';
import UnicornForm from './UnicornForm';

export default function UnicornRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UnicornsView />} />
      <Route path="/crear" element={<UnicornForm />} />
      <Route path="/editar/:id" element={<UnicornForm />} />
    </Routes>
  );
}
