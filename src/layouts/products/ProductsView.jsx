import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';  
import { Column } from 'primereact/column';        
import { Button } from 'primereact/button';      

export default function ProductsView({ products, deleteProduct }) {
  return (
    <div>
      <h2>Lista de productos📦</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Link to="/productos/create">
          <Button label="Crear nuevo producto" icon="pi pi-plus" className="p-button-rounded p-button-success" />
        </Link>
        <Link to="/">
          <Button label="Volver al inicio" icon="pi pi-home" className="p-button-rounded p-button-secondary" />
        </Link>
      </div>

      <DataTable value={products} paginator={false} className="p-datatable-sm p-shadow-2">
        <Column field="name" header="Nombre" />
        <Column field="stock" header="Stock" />
        <Column field="price" header="Precio" />
        <Column 
          header="Acciones" 
          body={(rowData) => (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to={`/productos/edit/${rowData._id}`}>
                <Button label="Editar" icon="pi pi-pencil" className="p-button-rounded p-button-info" />
              </Link> 
              <Button 
                label="Eliminar" 
                icon="pi pi-trash" 
                className="p-button-rounded p-button-danger" 
                onClick={() => deleteProduct(rowData._id)}
              />
            </div>
          )}
        />
      </DataTable>
    </div>
  );
}
