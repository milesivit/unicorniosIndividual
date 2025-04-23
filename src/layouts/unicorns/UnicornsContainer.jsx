import { useContext, useEffect, useState } from "react";
import UnicornView from "./UnicornsView";
import { UnicornContext } from "../../context/UnicornContext";

const UnicornContainer = () => {
    const {
        unicorns,
        loading,
        error,
        addUnicorn,
        editUnicorn,
        deleteUnicorn
    } = useContext(UnicornContext);

    const handleAddUnicorn = async (newUnicorn) => {
        await addUnicorn(newUnicorn);
    };

    const handleEditUnicorn = async (id, updatedUnicorn) => {
        await editUnicorn(id, updatedUnicorn);
    };

    const handleDeleteUnicorn = async (id) => {
        await deleteUnicorn(id);
    };

    return (
        <UnicornView
            unicorns={unicorns}
            loading={loading}
            error={error}
            createUnicorns={handleAddUnicorn}
            editUnicorns={handleEditUnicorn}
            deleteUnicorns={handleDeleteUnicorn}
        />
    );
};

export default UnicornContainer;
