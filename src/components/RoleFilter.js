import React, { useState, useEffect } from 'react';
import SearchTable from './SearchTable';
import data from '../data/data.json';
const RoleFilter = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [filteredActors, setFilteredActors] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedActor, setSelectedActor] = useState(null);

    useEffect(() => {
        const rolesSet = new Set();
        data.forEach(show => {
            const cast = show.cast;
            Object.keys(cast).forEach(key => {
                if (cast[key] && (!filteredActors.length || filteredActors.includes(cast[key]))) {
                    rolesSet.add(key);
                }
            });
        });
        setRoles([...rolesSet]);
    }, [data, filteredActors]);

    const handleRoleClick = (role) => {
        setSelectedRole(role);
        const actors = new Set();
        data.forEach(show => {
            const cast = show.cast;
            Object.keys(cast).forEach(key => {
                if (key === role && cast[key]) {
                    actors.add(cast[key]);
                }
            });
        });
        setFilteredActors([...actors]);
    };

    const handleActorClick = (actor) => {
        setSelectedActor(actor);
    }

    return (
        <div>
            {roles.map(role => (
                <button key={role} onClick={() => handleRoleClick(role)}>
                    {role}
                </button>
            ))}
            {selectedRole && <h3>Actors who played {selectedRole}:</h3>}
            {filteredActors.map(actor => <button key={actor} onClick={() => handleActorClick(actor)}>{actor}</button>)}
            {selectedActor && <SearchTable actor={selectedActor} data={data} />}
        </div>
    );
};

export default RoleFilter;
