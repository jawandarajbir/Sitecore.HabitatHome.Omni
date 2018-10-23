import React from "react";
import EventListItem from "../EventListItem";

const EventList = ({ fields }) => {
  return (
    <React.Fragment>
      <div className="events">
        <div className="events-items">
          {fields.items.map((e, i) => (
            <EventListItem key={i} {...e} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default EventList;