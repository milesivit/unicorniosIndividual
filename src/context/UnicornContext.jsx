import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

export const UnicornContext = createContext();

const BASE_URL = 'https://crudcrud.com/api/f6d183b4e8344afeb1f8158a3e76d99d/unicorns'; 

export const UnicornProvider = ({ children }) => {
    const [unicorns, setUnicorns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUnicorns = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(BASE_URL);
            setUnicorns(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    
    const addUnicorn = async (newUnicorn) => {
        setLoading(true);
        try {
            const { data: created } = await axios.post(BASE_URL, newUnicorn);
            setUnicorns(prev => [...prev, created]);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    
    const editUnicorn = async (id, updated) => {
        setLoading(true);
        try {
            await axios.put(`${BASE_URL}/${id}`, updated);
            setUnicorns(prev =>
                prev.map(u => (u._id === id ? { ...updated, _id: id } : u))
            );
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    
    const deleteUnicorn = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            setUnicorns(prev => prev.filter(u => u._id !== id));
        } catch (e) {
            setError(e.message);
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