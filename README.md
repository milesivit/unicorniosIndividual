# CRUD unicornios y productos 📦 🦄

## 🧪 Cómo Ejecutarlo
1. Clona el repositorio:
```bash
git clone https://github.com/milesivit/unicorniosIndividual.git
cd unicorniosIndividual
```
2. Instala dependencias:
```bash
npm install
```
3. Ejecuta el proyecto:
```bash
npm run dev
```
4. Asegúrate de tener un endpoint único de `crudcrud.com` y reemplazarlo en `UnicornsContainer.jsx`
---

## 🚀 Tecnologías Utilizadas
- ⚛️ React + Vite
- 🎨 PrimeReact
- 🌍 React Router DOM
- 🌐 API externa: [crudcrud.com](https://crudcrud.com)
- 🧠 Hooks: `useState`, `useEffect`

## Breve descripción del proyecto 
consiste en un CRUD para manejar unicornios, donde se utiliza el contexto global (context API) para gestionar el estado de los unicornios, y se conecta a una API externa para realizar las operaciones de creación, lectura, actualización y eliminación. Por otro lado, los productos se manejan utilizando localStorage para almacenar la información de manera persistente en el navegador, lo que permite guardar y acceder a los productos sin necesidad de una base de datos externa.


## 🧩 Estructura del Unicornio
```json
{
  "name": "Twilight Sparkle",
  "data": {
    "color": "purple",
    "age": 100,
    "power": "Magic"
  }
}
```

## 🔄 Funcionalidad CRUD
- **Create**: Agrega unicornios con un formulario.
- **Read**: Muestra los unicornios en una tabla.
- **Update**: Permite editar unicornios seleccionados.
- **Delete**: Elimina unicornios seleccionados.

## 🧭 Navegación con Rutas
Usamos `react-router-dom` para manejar rutas:

## ⚙️ Requisitos Técnicos
- Uso de `useEffect` para obtener datos de la API al montar el componente.
- Manejo de estado con `useState`.
- Comunicación entre componentes mediante props.
- Código modular, limpio y documentado.

## 💅 Estilo y UX
- Uso de componentes accesibles y responsivos con PrimeReact.

## 🐞 Manejo de Errores
- Control de errores en fetch: try-catch / .catch()
- Validaciones básicas en formularios

## ✨ Extras (Puntos Opcionales)
- Navegación entre rutas
- Validaciones de formularios
- Estilo visual mejorado
- Manejo de errores de la API

---
