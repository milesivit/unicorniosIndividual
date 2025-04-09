import { Fragment, useState } from "react";

const UnicornView = ({
  names,
  loading,
  error,
  setSearchUnicorns,
  createUnicorns,
  localUnicorns,
  editUnicorns,
  deleteUnicorns
}) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [age, setAge] = useState('');
  const [power, setPower] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showLocalTable, setShowLocalTable] = useState(true);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !color.trim() || !power.trim() || !age.trim()) {
      setFormError("Por favor, completa todos los campos.");
      return;
    }

    const ageValue = Number(age);
    if (isNaN(ageValue) || ageValue <= 0) {
      setFormError("La edad debe ser un número positivo.");
      return;
    }

    const newUnicorn = {
      name,
      color,
      age: ageValue,
      power
    };

    if (editingId) {
      await editUnicorns(editingId, newUnicorn);
    } else {
      await createUnicorns(newUnicorn);
    }

    // Reset form
    setName('');
    setColor('');
    setAge('');
    setPower('');
    setEditingId(null);
    setShowForm(false);
    setFormError('');
  };

  const handleEdit = (id) => {
    const unicorn = localUnicorns.find(u => u._id === id);
    if (unicorn) {
      setName(unicorn.name);
      setColor(unicorn.color);
      setAge(unicorn.age);
      setPower(unicorn.power);
      setEditingId(unicorn._id);
      setShowForm(true);
      setShowLocalTable(true);
      setFormError('');
    }
  };

  return (
    <Fragment>
      <h1>🦄 Unicornios</h1>

      <button onClick={() => {
        setShowForm(!showForm);
        setShowLocalTable(true);
        setEditingId(null);
        setName('');
        setColor('');
        setAge('');
        setPower('');
        setFormError('');
      }}>
        Crear Unicornio
      </button>

      <button onClick={() => {
        setSearchUnicorns(true);
        setShowLocalTable(false);
        setFormError('');
      }}>
        Buscar Unicornios
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <h2>{editingId ? "Editar Unicornio" : "Nuevo Unicornio"}</h2>
          <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} required />
          <input type="number" placeholder="Edad" value={age} onChange={(e) => setAge(e.target.value)} min="1" required />
          <input type="text" placeholder="Poder" value={power} onChange={(e) => setPower(e.target.value)} required />

          {formError && <p style={{ color: 'red' }}>{formError}</p>}

          <button type="submit">{editingId ? "Actualizar" : "Guardar"}</button>
        </form>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {loading ? (
        <p>Cargando Unicornios...</p>
      ) : showLocalTable ? (
        <>
          <h2>Mis Unicornios</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Color</th>
                <th>Edad</th>
                <th>Poder</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {localUnicorns.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.color}</td>
                  <td>{u.age}</td>
                  <td>{u.power}</td>
                  <td><button onClick={() => handleEdit(u._id)}>Editar</button></td>
                  <td><button onClick={() => deleteUnicorns(u._id)}>Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h2>Resultados de la API</h2>
          <table border="1">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Color</th>
                <th>Edad</th>
                <th>Poder</th>
              </tr>
            </thead>
            <tbody>
              {names.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.color}</td>
                  <td>{u.age}</td>
                  <td>{u.power}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Fragment>
  );
};

export default UnicornView;
