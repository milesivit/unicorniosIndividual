import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';

const validationSchema = Yup.object({
  name: Yup.string().required('Requerido'),
  stock: Yup.number().positive('Debe ser mayor a 0').required('Requerido'),
  price: Yup.number().required('Requerido'),
});

export default function ProductForm({ products, addProduct, editProduct }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({ name: '', stock: '', price: '' });

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const product = products.find((p) => p._id === id);
      if (product) {
        setInitialValues({ name: product.name, stock: product.stock, price: product.price });
      }
    }
  }, [id, products]);

  const handleSubmit = (values) => {
    if (isEdit) {
      editProduct(id, values);
    } else {
      addProduct(values);
    }
    navigate('/productos');
  };

  return (
    <div className="p-d-flex p-flex-column p-align-center p-mt-3">
      <h2>{isEdit ? 'Editar' : 'Crear'} Producto</h2>
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
            <label>Stock:</label>
            <Field name="stock" type="number" className="p-inputtext p-component p-mb-3" />
            <ErrorMessage name="stock" component="div" className="p-text-danger" />
          </div>
          <div>
            <label>Precio:</label>
            <Field name="price" type="number" className="p-inputtext p-component p-mb-3" />
            <ErrorMessage name="price" component="div" className="p-text-danger" />
          </div>
          <div className="p-d-flex p-gap-3">
            <Button type="submit" label={isEdit ? 'Actualizar' : 'Crear'} className="p-button-success p-button-rounded" />
            <Button label="Volver" className="p-button-secondary p-button-rounded" onClick={() => navigate('/productos')} />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
