import React, { useState, useEffect } from "react";
import { getToken } from "./firebaseInit";

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  // To load once
  useEffect(() => {
    if(!localStorage.getItem('device_id')){
      let data;

      async function tokenFunc() {
        data = await getToken(setTokenFound);
        if (data) {
          localStorage.setItem('device_id',data)
        }
        return data;
      }

      tokenFunc();
    }

  });

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;