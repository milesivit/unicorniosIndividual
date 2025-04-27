import { Link } from 'react-router-dom';
import { Button } from 'primereact/button'; 

const HomeView = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Bienvenido al CRUD de productos y unicornios</h1>

      <div>
        <Link to="/unicornios">
          <Button label="Ir a Unicornios" />
        </Link>

        <Link to="/productos">
          <Button label="Ir a Productos" />
        </Link>
      </div>
    </div>
  );
};

export default HomeView;
