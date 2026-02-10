import { useState } from "react";
export default function ChildToParentDataChange() {
  const [state, setStart] = useState("Harmanpreet Singh");
  return (
    <div>
      <p>{state}</p>
      <Secondcomp change={setStart} />
    </div>
  );
}
function Secondcomp(props) {
  const { change } = props;
  return (
    <div>
      <button
        onClick={() => {
          change("manu");
        }}
      >
        childchangeparentstate
      </button>
    </div>
  );
}
