import React, { useState, useEffect } from "react";
import { useTimer } from "@/utils/timer";
import moment from "moment";
import "moment/locale/id";

const Clock = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentTime = useTimer();
  const getDay = moment(currentTime).format("dddd, DD/MM/YYYY");
  const getTime = moment(currentTime).format("HH:mm:ss");

  return (
    <>
      <p className="text-xl font-bold">{getDay}</p>
      {isClient && <p className="text-3xl font-bold">{getTime}</p>}
    </>
  );
};

export default Clock;
