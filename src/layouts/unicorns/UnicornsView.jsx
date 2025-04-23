import { useState, Fragment } from "react";
import 'primereact/resources/themes/lara-light-purple/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText, InputNumber, Button, Card, DataTable, Column } from 'primereact';

const UnicornView = ({
  unicorns, loading, error,              
  createUnicorns, editUnicorns, deleteUnicorns
}) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [age, setAge] = useState(null);
  const [power, setPower] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !color || !power || age === null) {
      setFormError("Completar todos los campos");
      return;
    }
  
    const newUnicorn = { name, color, age: Number(age), power };
  
    if (editingId) {
      // Si estamos editando, llamamos a la función de editar
      await editUnicorns(editingId, newUnicorn);
    } else {
      // Si no, creamos un nuevo unicornio
      await createUnicorns(newUnicorn);
    }
  
    // Resetear el formulario y el estado
    setName('');
    setColor('');
    setAge(null);
    setPower('');
    setEditingId(null);
    setShowForm(false);
    setFormError('');
  };

  const handleEdit = (id) => {
    const unicorn = unicorns.find(u => u._id === id);
    if (unicorn) {
      setName(unicorn.name);
      setColor(unicorn.color);
      setAge(unicorn.age);
      setPower(unicorn.power);
      setEditingId(unicorn._id); // Establecer el ID del unicornio que estamos editando
      setShowForm(true);
      setFormError('');
    }
  };

  return (
    <Fragment>
      <h1>🦄🌈 Unicornios Mágicos 🌈🦄</h1>
      <Card style={{ backgroundColor: '#89ddf0', border: '1px solid #e8cdff' }}>
        
        <div className="mb-3 flex gap-2">
          <Button label="Nuevo Unicornio" icon="pi pi-plus" onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setName(''); setColor('');
            setAge(null); setPower('');
            setFormError('');
          }} />
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-4">
            <h2>{editingId ? 'Editar' : 'Nuevo'} Unicornio</h2>
            <div className="formgrid grid">
              <div className="field col-12 md:col-6">
                <InputText placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
              </div>
              <div className="field col-12 md:col-6">
                <InputText placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full" />
              </div>
              <div className="field col-12 md:col-6">
                <InputNumber placeholder="Edad" value={age} onValueChange={(e) => setAge(e.value)} useGrouping={false} className="w-full" />
              </div>
              <div className="field col-12 md:col-6">
                <InputText placeholder="Poder" value={power} onChange={(e) => setPower(e.target.value)} className="w-full" />
              </div>

              {formError && <p className="text-red-500">{formError}</p>}
              <Button type="submit" icon="pi pi-check" label={editingId ? 'Actualizar' : 'Guardar'} className="mt-2" />
            </div>
          </form>
        )}

        {error && <p className="text-red-500">Error: {error}</p>}
        {loading && <p>Cargando Unicornios...</p>}

        {/* Tabla con los datos de la API */}
        {!loading && !showForm && (
          <>
            <h3>🌈🌸🌟 Mis Unicornios 🌈🌸🌟</h3>
            <DataTable value={unicorns} stripedRows showGridlines rows={5} dataKey="_id">
              <Column field="name" header="Nombre" />
              <Column field="color" header="Color" />
              <Column field="age" header="Edad" />
              <Column field="power" header="Poder" />
              <Column
                header="Acciones"
                body={(rowData) => (
                  <>
                    <Button icon="pi pi-pencil" className="p-button-sm p-button-info mr-2" onClick={() => handleEdit(rowData._id)} label="Editar" />
                    <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => deleteUnicorns(rowData._id)} label="Eliminar" />
                  </>
                )}
              />
            </DataTable>
          </>
        )}
      </Card>
    </Fragment>
  );
};

export default UnicornView;
