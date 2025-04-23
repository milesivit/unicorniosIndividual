import { Link } from 'react-router-dom';
import { Button } from 'primereact/button'; // Importamos el componente Button de PrimeReact

const HomeView = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Bienvenido al CRUD de productos o unicornios</h1>

      <div>
        {/* Botón de Unicornios que redirige a /unicornios */}
        <Link to="/unicornios">
          <Button label="Ir a Unicornios" />
        </Link>

        {/* Botón de Productos, aún no lleva a ninguna parte */}
        <Button label="Ir a Productos" disabled />
      </div>
    </div>
  );
};

export default HomeView;
