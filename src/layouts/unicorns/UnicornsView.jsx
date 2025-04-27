import { useUnicornContext } from '../../context/UnicornContext';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';      

export default function UnicornsView() {
  const { unicorns, deleteUnicorn, loading, error } = useUnicornContext();

  return (
    <div>
      <h2>🦄💖Lista de Unicornios💖🦄</h2>
      <Link to="/unicornios/crear">
        <Button label="Crear nuevo unicornio" icon="pi pi-plus" className="p-button-rounded p-button-success" />
      </Link>
      <Link to="/">
        <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-success" />
      </Link>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <DataTable value={unicorns} paginator={false} className="p-datatable-sm p-shadow-2">
        <Column field="name" header="Nombre" />
        <Column field="age" header="Edad" />
        <Column field="color" header="Color" />
        <Column field="power" header="Poder" />
        
        <Column 
          header="Acciones" 
          body={(rowData) => (
            <>
              <Link to={`/unicornios/editar/${rowData._id}`}>
                <Button label="Editar" icon="pi pi-pencil" className="p-button-rounded p-button-info" />
              </Link> 
              <Button 
                label="Eliminar" 
                icon="pi pi-trash" 
                className="p-button-rounded p-button-danger" 
                onClick={() => deleteUnicorn(rowData._id)} 
              />
            </>
          )}
        />
      </DataTable>
    </div>
  );
}
