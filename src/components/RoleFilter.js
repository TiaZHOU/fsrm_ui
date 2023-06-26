import React, { useState, useEffect } from 'react';
import data from '../data/data.json';
import ActorDetails from "./ShowTable";
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
    }, [ filteredActors]);

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
            <div>
                <h1>浮生若梦 演出报告</h1>
                <h2>角色</h2>
                {roles.map((role, index) => (
                    <React.Fragment key={role}>
                        <button onClick={() => handleRoleClick(role)}>
                            {role}
                        </button>
                        <text> </text>
                        {(index + 1) % 5 === 0 && <br />}
                    </React.Fragment>
                ))}
            </div>
            <button onClick={()=>{
                setSelectedRole();
                setSelectedActor();
                setRoles([]);
                setFilteredActors([])}}>
                Reset</button>
            {selectedRole && <h3> {selectedRole} 演员列表（按上场顺序）:</h3>}
            {filteredActors.map((actor, index) =>(
                    <React.Fragment key={actor}>
                        <button onClick={() => handleActorClick(actor)}>
                            {actor}
                        </button>
                        <text> </text>
                        {(index + 1) % 5 === 0 && <br />}
                    </React.Fragment>
                ) )}

            {selectedActor && <ActorDetails actor={selectedActor} data={data} />}
        </div>
    );
};

export default RoleFilter;
