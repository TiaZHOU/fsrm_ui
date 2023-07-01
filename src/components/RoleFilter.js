import React, { useState, useEffect } from 'react';
import data from '../data/data.json';
import ActorDetails from './ShowTable';
import './RoleFilter.css';

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
                rolesSet.add(key);
            });
        });
        setRoles([...rolesSet]);
    }, [filteredActors]);

    const handleRoleClick = role => {
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

    const handleActorClick = actor => {
        setSelectedActor(actor);
    };

    return (
        <div className="role-filter-container">
            <div className="header">
                <h1>浮生若梦 演出报告</h1>
                <h2>角色</h2>
            </div>
            <div className="role-buttons-container">
                {roles.map((role) => (
                    <button key={role} onClick={() => handleRoleClick(role)}>
                        {role}
                    </button>
                ))}
            </div>
            <button
                className="reset-button"
                onClick={() => {
                    setSelectedRole(null);
                    setSelectedActor(null);
                    setRoles([]);
                    setFilteredActors([]);
                }}
            >
                Reset
            </button>
            {selectedRole && (
                <h3 className="actor-list-heading">{selectedRole} 演员列表（按上场顺序）:</h3>
            )}
            <div className="actor-buttons-container">
                {filteredActors.map((actor) => (
                    <button key={actor} onClick={() => handleActorClick(actor)}>
                        {actor}
                    </button>
                ))}
            </div>
            {selectedActor && <ActorDetails actor={selectedActor} data={data} />}
        </div>
    );
};

export default RoleFilter;
