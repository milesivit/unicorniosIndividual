import { createContext, useState, useEffect, useContext } from "react";

export const UnicornContext = createContext();

const BASE_URL = 'https://crudcrud.com/api/9752cc882def411aac98b1b4c223ac84/unicorns'; 

export const UnicornProvider = ({ children }) => {
    const [unicorns, setUnicorns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUnicorns = async () => {
        setLoading(true);
        try {
            const response = await fetch(BASE_URL);
            if (response.ok) {
                const data = await response.json();
                setUnicorns(data);
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const addUnicorn = async (newUnicorn) => {
        setLoading(true);
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUnicorn)
            });

            if (response.ok) {
                const created = await response.json();
                setUnicorns(prev => [...prev, created]);
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const editUnicorn = async (id, updated) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated)
            });

            if (response.ok) {
                setUnicorns(prev =>
                    prev.map(u => (u._id === id ? { ...updated, _id: id } : u))
                );
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteUnicorn = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setUnicorns(prev => prev.filter(u => u._id !== id));
            } else {
                setError(`Error: ${response.statusText}`);
            }
        } catch (e) {
            setError(`Network error: ${e.message}`);
        }
    };

    useEffect(() => {
        getUnicorns();
    }, []);

    return (
        <UnicornContext.Provider
            value={{
                unicorns,
                loading,
                error,
                getUnicorns,
                addUnicorn,
                editUnicorn,
                deleteUnicorn
            }}
        >
            {children}
        </UnicornContext.Provider>
    );
};

export const useUnicornContext = () => {
    return useContext(UnicornContext);
};