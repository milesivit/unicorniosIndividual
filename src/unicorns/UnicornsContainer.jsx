import { useState, useEffect, Fragment } from "react";

const UnicornContainer = () => {
    const [name, setName] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchUnicorn, setSearchUnicorn] = useState(false);
    const [localUnicorn, setLocalUnicorn] = useState([])

    //GET, leer y listar los unicornios
    const getUnicorns = async () => {
        try {
            const response = await fetch (`https://crudcrud.com/api/c8aa6911a19c4c56957fc91f64785811`, {
                method: 'GET'
            });
            if (response.status === 200) {
                const data = await response.json();
                setName(data) 
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoading(false);
            setSearchUnicorn(false)
        }
    };

    const addUnicorns = async (newUnicorn) => {
        try {
            const response = await fetch (`https://crudcrud.com/api/c8aa6911a19c4c56957fc91f64785811`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(newUnicorn)
            });
            if (response.status === 200){
                const createdUnicorn = await response.json();
                const updatedUnicorn = [... name, createdUnicorn];
                setName(updatedUnicorn);
                const updatedLocal = [... localUnicorn, createdUnicorn];
                setLocalUnicorn(updatedLocal);
                localStorage.setItem('createdUnicorns', JSON.stringify(updatedLocal));

                console.log('Unicornio Creado!!')
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoading(false);
            setSearchUnicorn(false)
        }
    };

    const editUnicorns = async (id, updatedUnicorn) => {
        try {
            const response = await fetch (`https://crudcrud.com/api/c8aa6911a19c4c56957fc91f64785811/${id}`, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(updatedUnicorn)
            });
            if (response.status === 200){
                const updatedItem = await response.json();
                const updatedLocal = localUnicorn.map(uni => 
                    uni.id === id ? updatedItem : uni
                );
                setLocalUnicorn(updatedLocal);
                localStorage.setItem('createdUnicorns', JSON.stringify(updatedLocal));

                console.log('Unicornio actualizado con exito!!!')
            } else {
                setError(response.statusText);
            }
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoading(false);
            setSearchUnicorn(false)
        }
    }

    const deleteUnicorns = async (id) => {
        try {
            const response = await fetch (`https://crudcrud.com/api/c8aa6911a19c4c56957fc91f64785811/${id}`, {
                method: ' DELETE' 
            });
            if (response.ok) {
                console.log('Unicornio eliminado :(')

                const updateLocal = localUnicorn.filter(obj => obj.id !== id);

                setLocalUnicorn(updateLocal);
                
                localStorage.setItem('createdUnicorns',  JSON.stringify(updateLocal))

            } else {
                setError(response.statusText)
            }                                                                   
        } catch (error) {
            console.error(error)
        } 
    }; 

    useEffect(() => {
        const saved = localStorage.getItem('createdUnicorns');

        if (saved) {
            setLocalUnicorn(JSON.parse(saved))
        }
    }, []);

    useEffect (() => {
        if (searchUnicorn) {
            setLoading(true)
            getUnicorns();
        }
    }, [searchUnicorn]);

    return(
        <UnicornsView 
        users={users} 
        loading={loading} 
        error={error} 
        setSearchUnicorns={setSearchUnicorn}
        createUnicorns={createUnicorn}
        localUnicorns={localUnicorn}
        editUnicorns={editUnicorns}
        deleteUnicorns={deleteUnicorns}
        />
    );
}


export default UnicornContainer
