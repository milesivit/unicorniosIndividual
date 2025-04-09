// Imports de React y PrimeReact 
import { useState, Fragment } from "react";
import 'primereact/resources/themes/lara-light-purple/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { InputText, InputNumber, Button, Card, DataTable, Column } from 'primereact'; // inputs, tabla, botones, etc.

const UnicornView = ({
  names, loading, error,             // datos de API
  createUnicorns, editUnicorns, deleteUnicorns, localUnicorns // funciones y lista local
}) => {
  // Estados del formulario y control de vista
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [age, setAge] = useState(null);
  const [power, setPower] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showLocalTable, setShowLocalTable] = useState(true);
  const [formError, setFormError] = useState('');

  // Guardar o actualizar unicornio
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !color || !power || age === null) {
      setFormError("Completar todos los campos");
      return;
    }

    const newUnicorn = { name, color, age: Number(age), power };

    if (editingId) await editUnicorns(editingId, newUnicorn);
    else await createUnicorns(newUnicorn);

    // Resetear formulario
    setName(''); setColor(''); setAge(null); setPower('');
    setEditingId(null); setShowForm(false); setFormError('');
  };

  // Cargar unicornio para editar
  const handleEdit = (id) => {
    const unicorn = localUnicorns.find(u => u._id === id);
    if (unicorn) {
      setName(unicorn.name); setColor(unicorn.color);
      setAge(unicorn.age); setPower(unicorn.power);
      setEditingId(unicorn._id); setShowForm(true);
      setShowLocalTable(true); setFormError('');
    }
  };

  return (
    <Fragment>
      {/* Titulo y card */}
      <h1>🦄🌈 Unicornios Mágicos 🌈🦄</h1>
      <Card style={{ backgroundColor: '#feffe7', border: '1px solid #e8cdff' }}>
        
        {/* Botones: buscar o nuevo */}
        <div className="mb-3 flex gap-2">
          <Button label="Buscar Unicornios" icon="pi pi-search" onClick={() => {
            setShowLocalTable(false); setFormError('');
          }} />
          <Button label="Nuevo Unicornio" icon="pi pi-plus" onClick={() => {
            setShowForm(!showForm); setShowLocalTable(true);
            setEditingId(null); setName(''); setColor('');
            setAge(null); setPower(''); setFormError('');
          }} />
        </div>

        {/* Formulario */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-4">
            <h2>{editingId ? 'Editar' : 'Nuevo'} Unicornio</h2>
            {/* Inputs */}
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

              {/* Error y botón */}
              {formError && <p className="text-red-500">{formError}</p>}
              <Button type="submit" icon="pi pi-check" label={editingId ? 'Actualizar' : 'Guardar'} className="mt-2" />
            </div>
          </form>
        )}

        {/* Mostrar errores o tablas */}
        {error && <p className="text-red-500">Error: {error}</p>}
        {loading ? (
          <p>Cargando Unicornios...</p>
        ) : showLocalTable ? (
          <>
            <h3>🌈🌸🌟 Mis Unicornios 🌈🌸🌟</h3>
            <DataTable value={localUnicorns} stripedRows showGridlines rows={5} dataKey="_id">
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
        ) : (
          <>
            <h3>Resultados de la API</h3>
            <DataTable value={names} stripedRows showGridlines rows={5}>
              <Column field="name" header="Nombre" />
              <Column field="color" header="Color" />
              <Column field="age" header="Edad" />
            </DataTable>
          </>
        )}
      </Card>
    </Fragment>
  );
};

export default UnicornView;
