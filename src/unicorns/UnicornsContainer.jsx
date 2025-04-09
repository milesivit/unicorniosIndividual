import { useState, useEffect } from "react";
import UnicornView from "./UnicornsView";

// URL base para consumir la API CRUD externa
const BASE_URL = "https://crudcrud.com/api/4d079276314e4763ac3ef7ac46051b18/unicorns";

const UnicornContainer = () => {
    // Estados principales
    const [unicorns, setUnicorns] = useState([]); // Datos traídos desde la API
    const [error, setError] = useState(null);     // Errores de red o API
    const [loading, setLoading] = useState(false); // Estado de carga
    const [localUnicorn, setLocalUnicorn] = useState([]); // Datos guardados localmente

    // Obtener unicornios desde la API (GET)
    const getUnicorns = async () => {
        setLoading(true);
        try {
            const response = await fetch(BASE_URL);
            if (response.ok) {
                const data = await response.json();
                setUnicorns(data); // Guardar en estado si todo sale bien
            } else {
                setError(response.statusText); // Error en la respuesta
            }
        } catch (e) {
            setError(e.message); // Error de red
        } finally {
            setLoading(false); // Finaliza la carga
        }
    };

    // Agregar unicornio (POST)
    const addUnicorns = async (newUnicorn) => {
        setLoading(true);
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUnicorn)
            });

            if (response.ok) {
                const createdUnicorn = await response.json();
                // Agregar al estado local y guardar en localStorage
                const updatedLocal = [...localUnicorn, createdUnicorn];
                setLocalUnicorn(updatedLocal);
                localStorage.setItem('createdUnicorns', JSON.stringify(updatedLocal));
                console.log('Unicornio Creado!!');
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    // Editar unicornio (PUT)
    const editUnicorns = async (id, updatedUnicorn) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUnicorn)
            });

            if (response.ok) {
                // Actualiza el unicornio en el estado local
                const updatedLocal = localUnicorn.map(uni =>
                    uni._id === id ? { ...updatedUnicorn, _id: id } : uni
                );
                setLocalUnicorn(updatedLocal);
                localStorage.setItem('createdUnicorns', JSON.stringify(updatedLocal));
                console.log('Unicornio actualizado!');
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar unicornio (DELETE)
    const deleteUnicorns = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Filtra el unicornio eliminado del estado local
                const updated = localUnicorn.filter(u => u._id !== id);
                setLocalUnicorn(updated);
                localStorage.setItem('createdUnicorns', JSON.stringify(updated));
                console.log('Unicornio eliminado');
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            setError(e.message);
        }
    };

    // Cargar datos al iniciar el componente
    useEffect(() => {
        const saved = localStorage.getItem('createdUnicorns');
        if (saved) {
            setLocalUnicorn(JSON.parse(saved)); // Recupera datos guardados
        }
        getUnicorns(); // Llama a la API
    }, []);

    // Mostrar alerta si hay error
    useEffect(() => {
        if (error) {
            alert(`Error: ${error}`);
            setError(null); // Limpia el error luego de mostrarlo
        }
    }, [error]);

    // Renderiza el componente de vista pasándole props
    return (
        <UnicornView
            unicorns={unicorns}
            loading={loading}
            error={error}
            createUnicorns={addUnicorns}
            localUnicorns={localUnicorn}
            editUnicorns={editUnicorns}
            deleteUnicorns={deleteUnicorns}
        />
    );
};

export default UnicornContainer;
