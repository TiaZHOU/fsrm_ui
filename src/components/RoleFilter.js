import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import data from "../data/data.json";
import ActorDetails from "./ActorDetails";
import "./RoleFilter.css";
import ActorTitle from "./ActorTitle";
import ActorPresenceChart from "./ActorPresenceChart";
import ActorShowsCSVExport from "./ActorShowsCSVExport";
import ActorCastList from "./ActorCastList";
import ActorWorkedWith from "./ActorWorkedWith";

const RoleFilter = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [filteredActors, setFilteredActors] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const rolesSet = new Set();
    data.forEach((show) => {
      const cast = show.cast;
      Object.keys(cast).forEach((key) => {
        rolesSet.add(key);
      });
    });
    setRoles([...rolesSet]);
  }, [filteredActors]);

  const handleRoleClick = (role) => {
    setStep((prevStep) => prevStep + 1);
    setSelectedRole(role);
    const actors = new Set();
    data.forEach((show) => {
      const cast = show.cast;
      Object.keys(cast).forEach((key) => {
        if (key === role && cast[key]) {
          actors.add(cast[key]);
        }
      });
    });
    setFilteredActors([...actors]);
  };

  const handleActorClick = (actor) => {
    setSelectedActor(actor);
    setStep((prevStep) => prevStep + 1);
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedRole(null);
    setSelectedActor(null);
    setRoles([]);
    setFilteredActors([]);
  };

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return renderRoleButtons();
      case 2:
        return renderActorButtons();
      case 3:
        return selectedActor ? (
          <>
            <ActorDetails actor={selectedActor} data={data} />
            <ActorPresenceChart data={data} actor={selectedActor} />
          </>
        ) : null;
      case 4:
        return selectedActor ? (
          <ActorCastList data={data} actor={selectedActor} />
        ) : null;
      case 5:
        return selectedActor ? (
          <ActorWorkedWith data={data} actor={selectedActor} />
        ) : null;
      case 6:
        return selectedActor ? (
          <>
            <ActorTitle data={data} actor={selectedActor} />
            <ActorShowsCSVExport data={data} actor={selectedActor} />
          </>
        ) : null;
      default:
        return null;
    }
  };

  const renderSteppers = () => {
    return (
      <div>
        {renderStepComponent()}

        {step > 1 && <button onClick={handlePreviousStep}>Previous</button>}

        {step > 2 && step < 6 && (
          <button onClick={handleNextStep}>Next Step</button>
        )}

        {step >= 3 && <button onClick={handleReset}>Reset</button>}
      </div>
    );
  };

  const renderRoleButtons = () => {
    return (
      <>
        <div className="header">
          <h1>浮生若梦 演出报告</h1>
          <h2>角色</h2>
        </div>
        <div className="role-buttons-container">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleClick(role)}
              className={`role-button ${selectedRole === role ? "active" : ""}`}
            >
              {role}
            </button>
          ))}
        </div>
      </>
    );
  };

  const renderActorButtons = () => {
    return (
      <>
        <h3 className="actor-list-heading">
          {selectedRole} 演员列表（按上场顺序）:
        </h3>
        <div className="actor-buttons-container">
          {filteredActors.map((actor) => (
            <button
              key={actor}
              onClick={() => handleActorClick(actor)}
              className={`actor-button ${
                selectedActor === actor ? "active" : ""
              }`}
            >
              {actor}
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="role-filter-container">
      <TransitionGroup className="card-container">
        <CSSTransition key={step} classNames="card" timeout={300}>
          <div className="card">{renderSteppers()}</div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default RoleFilter;
