import { Fragment, useState } from "react";
import 'primereact/resources/themes/lara-light-purple/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const UnicornView = ({ names, loading, error, setSearchUnicorns
    , createUnicorns
    , localUnicorns
    , editUnicorns
    , deleteUnicorns

  }) => {

    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [age, setAge] = useState('');
    const [power, setPower] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showLocalTable, setShowLocalTable] = useState(true);
    const [editId, setEditId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUnicorn = {
            name,
            color,
            age: Number(age),
            power
            }
        };

        if (editId) {
            editUnicorns(editId, newUnicorn);
        } else {
            await createUnicorns(newUnicorn);
        }

        setName("");
        setColor("");
        setAge("");
        setPower("");
        setEditId(null);
        setShowForm(false);
    };

    const handleEdit = (id) => {
        const edit = localUnicorns.find(uni => uni.id === id);
        if (edit) {
            setName(edit.name);
            setColor(edit.color);
            setAge(edit.age);
            setPower(edit.power);
            setEditId(id);
            setShowForm(true);
            setShowLocalTable(true);
        }
    }

}
export default UnicornView