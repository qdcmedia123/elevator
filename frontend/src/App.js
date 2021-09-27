import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  findAndRemoveByIndex,
  floors,
  isItemExits,
  isRequestIdExists,
  removeItem,
} from "./helper";
import "./index.scss";

function App() {
  const initialPosition = (floors.length - 4) * 58;
  const [style, setStyle] = useState({
    top: `${initialPosition}px`,
    id: 4,
    time: new Date(),
  });
  const [pauseInterval, setPauseInterval] = useState(true);
  const [activeButtons, setActiveButton] = useState([]);
  const [openedDoor, setOpenedDoor] = useState(null);
  const [requests, setRequests] = useState([]);

  const moveElevator = useCallback(
    async (id, direction) => {
      let request = {
        id: id,
        time: new Date(),
        completed: false,
        fromFloor: style.id,
        toFloor: id,
        active: true,
        direction: direction,
      };
      try {
        await axios.post("http://localhost:8000/api/elevator", request);
        setPauseInterval(false);
      } catch (err) {
        console.err(err);
      }
      setRequests([...requests, request]);
    },
    [requests, style.id]
  );

  useEffect(() => {
    if (pauseInterval) return;
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/get-nearest-request"
        );
        const getPosition = await axios.get(
          "http://localhost:8000/api/position"
        );

        let { data } = response;
        if (data.length === 0) {
          setTimeout(() => {
            setStyle({
              top: `${initialPosition}px`,
              id: 4,
              transition: `all ${Math.abs(getPosition.data.id - 4)}s`,
            });
          }, 4000);
          let defaultPosition = {
            id: 4,
            time: new Date(),
            completed: false,
            fromFloor: 0,
            toFloor: 0,
            active: true,
            direction: "none",
          };
          await axios.post(
            "http://localhost:8000/api/position",
            defaultPosition
          );
          setPauseInterval(true);
          return;
        }
        data = data[0];
        const position =
          Math.abs(data.id - floors.length) * 52 +
          Math.abs(15 * (data.id - floors.length)) +
          "px";
        const different = Math.abs(getPosition.data.id - data.id);
        const timeForOneStep = 1;
        const numOfSecound = different * timeForOneStep;
        const totalTimeTwoStep = numOfSecound.toString() + "s";
        setStyle((prevState) => ({
          ...prevState,
          top: position,
          id: data.id,
          transition: `all ${totalTimeTwoStep}`,
          time: data.time,
        }));

        setTimeout(async () => {
          try {
            setOpenedDoor(data.id);
            setRequests((prevState) =>
              removeItem(prevState, data.id, data.direction)
            );
            setActiveButton((prevState) =>
              findAndRemoveByIndex(prevState, data.id)
            );
            await axios.delete(
              `http://localhost:8000/api/elevator/${data._id}`
            );
            delete data._id;
            await axios.post("http://localhost:8000/api/position", data);
            setTimeout(() => {
              setOpenedDoor(null);
            }, 4000);
          } catch (err) {
            console.error(err);
          }
        }, numOfSecound * 1000);
      } catch (err) {
        console.error(err);
      }
    }, 7000);
    return () => clearInterval(interval);
  }, [pauseInterval, activeButtons, initialPosition]);

  const sendRequest = useCallback(
    async (fromFloor, toFloor) => {
      setPauseInterval(false);
      let request = {
        id: toFloor,
        time: style.time,
        completed: false,
        fromFloor: fromFloor,
        toFloor: 0,
        active: true,
        direction: toFloor > fromFloor ? "up" : "down",
      };
      setActiveButton([...activeButtons, toFloor]);
      try {
        await axios.post("http://localhost:8000/api/elevator", request);
      } catch (err) {
        console.err(err);
      }
    },
    [activeButtons, style]
  );

  return (
    <div className="container">
      <div className="floor__container">
        {floors.map((floor) => (
          <div key={floor.id} className="container__item">
            <button
              key={floor.id}
              id={floor.id}
              className={
                requests.indexOf(floor.id) !== -1
                  ? "active__button floor__item"
                  : "floor__item"
              }
            >
              {floor.id === 0 ? "G" : floor.id}
            </button>
            <div>{openedDoor === floor.id ? "Opened" : "Closed"}</div>

            <div className="direction">
              <div className="up__or__down">
                {floor.id < floors.length - 1 && (
                  <button
                    className={
                      isItemExits(requests, floor.id, "up") === 1
                        ? "direction__arr active__button"
                        : "direction__arr"
                    }
                    onClick={() => moveElevator(floor.id, "up")}
                  >
                    &uarr;
                  </button>
                )}
                {floor.id > 0 && (
                  <button
                    className={
                      isItemExits(requests, floor.id, "down") === 1
                        ? "direction__arr active__button"
                        : "direction__arr"
                    }
                    onClick={() => moveElevator(floor.id, "down")}
                  >
                    &darr;
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="elevator__container">
        <div className="elavator__position" style={style}>
          <div className="floor__elvbuttons">
            {floors.map((floor, key) => (
              <div
                onClick={() => sendRequest(style.id, floor.id)}
                key={key}
                data-test={isRequestIdExists(floor.id, requests)}
                className={
                  activeButtons.indexOf(floor.id) !== -1
                    ? "floor__elvbuttons--item active__button"
                    : "floor__elvbuttons--item"
                }
                data-floorno={style.id}
                data-button={floor.id}
              >
                {floor.id === 0 ? "G" : floor.id}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/**/}
    </div>
  );
}

export default App;
