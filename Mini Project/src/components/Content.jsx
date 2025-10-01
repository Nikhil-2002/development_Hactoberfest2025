import React, { useEffect, useState } from "react";
import Data from "../dummyData";

const Content = () => {
  const [data, setData] = useState([]);

  // Store Imported data in data variable
  useEffect(() => {
    setData(Data);
  }, []);

  return (
    <content>
        <h4>Tasks</h4>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.title} - {item.completed ? "Done" : "Pending"}
          </li>
        ))}
      </ul>
    </content>
  );
};

export default Content;
