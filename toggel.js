import { useState } from "react";
export default function Toggel() {
  const [visible, setVisible] = useState(true);
  const toggel = () => {
    setVisible(!visible);
  };
  return (
    <>
      {visible && <h1>Visible</h1>}
      <button onClick={toggel}>Toggel</button>
    </>
  );
}
