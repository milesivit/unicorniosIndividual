import { useState, useEffect } from "react";
import UnicornView from "./UnicornsView";

const BASE_URL = "https://crudcrud.com/api/4cd481ecabd547e0b729e90bad63586b/unicorns";

const UnicornContainer = () => {
    const [name, setName] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchUnicorn, setSearchUnicorn] = useState(true);
    const [localUnicorn, setLocalUnicorn] = useState([]);

    const getUnicorns = async () => {
        setLoading(true);
        try {
            const response = await fetch(BASE_URL);
            if (response.ok) {
                const data = await response.json();
                setName(data);
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
            setSearchUnicorn(false);
        }
    };

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
            setSearchUnicorn(false);
        }
    };

    const editUnicorns = async (id, updatedUnicorn) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUnicorn)
            });

            if (response.ok) {
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
            setSearchUnicorn(false);
        }
    };

    const deleteUnicorns = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
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

    useEffect(() => {
        const saved = localStorage.getItem('createdUnicorns');
        if (saved) {
            setLocalUnicorn(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (searchUnicorn) {
            getUnicorns();
        }
    }, [searchUnicorn]);

    return (
        <UnicornView
            names={name}
            loading={loading}
            error={error}
            setSearchUnicorns={setSearchUnicorn}
            createUnicorns={addUnicorns}
            localUnicorns={localUnicorn}
            editUnicorns={editUnicorns}
            deleteUnicorns={deleteUnicorns}
        />
    );
};

export default UnicornContainer;
