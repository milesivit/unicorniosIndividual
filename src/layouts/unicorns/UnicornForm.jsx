import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUnicornContext } from "../../context/UnicornContext";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button'; 

const validationSchema = Yup.object({
  name: Yup.string().required('Requerido'),
  age: Yup.number().positive('Debe ser mayor a 0').required('Requerido'),
  color: Yup.string().required('Requerido'),
  power: Yup.string().required('Requerido'), 
});

export default function UnicornForm() {
  const { unicorns, addUnicorn, editUnicorn } = useUnicornContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({ name: '', age: '', color:'', power: '' });

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const unicorn = unicorns.find((u) => u._id === id);
      if (unicorn) {
        setInitialValues({ name: unicorn.name, age: unicorn.age, color: unicorn.color, power: unicorn.power });
      }
    }
  }, [id, unicorns]);

  const handleSubmit = async (values) => {
    if (isEdit) {
      await editUnicorn(id, values);
    } else {
      await addUnicorn(values);
    }
    navigate('/unicornios');
  };

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <h2>{isEdit ? 'Editar' : 'Crear'} Unicornio</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="p-d-flex p-flex-column p-gap-3" style={{ width: '100%', maxWidth: '400px' }}>
          <div>
            <label>Nombre:</label>
            <Field name="name" className="p-inputtext p-component p-mb-3" />
            <ErrorMessage name="name" component="div" className="p-text-danger" />
          </div>
          <div>
            <label>Edad:</label>
            <Field name="age" type="number" className="p-inputtext p-component p-mb-3" />
            <ErrorMessage name="age" component="div" className="p-text-danger" />
          </div>
          <div>
            <label>Color:</label>
            <Field name="color" className="p-inputtext p-component p-mb-3" />
            <ErrorMessage name="color" component="div" className="p-text-danger" />
          </div>
          <div>
            <label>Poder:</label>
            <Field name="power" className="p-inputtext p-component p-mb-3" />
            <ErrorMessage name="power" component="div" className="p-text-danger" />
          </div>
          
          <div className="p-d-flex p-gap-3">
            <Button type="submit" label={isEdit ? 'Actualizar' : 'Crear'} className="p-button-success p-button-rounded" />
            <Button label="Volver" className="p-button-secondary p-button-rounded" onClick={() => navigate('/unicornios')} />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
