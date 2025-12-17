import { useState } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [visible, setVisible] = useState(false);
  const firstName = watch("firstName"); //it is used to access data outside form
  const lastName = watch("lastName");
  function submitLogic(data) {
    console.log(data);
    setVisible(true);
  }
  return (
    <>
      <form onSubmit={handleSubmit(submitLogic)}>
        <div>
          <label>First Name</label>
          <input
            {...register("firstName", {
              required: { value: true, message: "it can't be empty" }, //it would not allowed to submit if it is empty
              minLength: { value: 3, message: "Min length at least 3" }, //minlength is 3
              maxLength: 6, //maxLength is 6
            })}
          />
        </div>
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <br />
        <div>
          <label>Last Name</label>
          <input
            {...register("lastName", {
              required: { value: true, message: "it can't be empty" }, //it would not allowed to submit if it is empty
              minLength: { value: 3, message: "Min length at least 3" }, //minlength is 3
              maxLength: 6,
            })}
          />
        </div>
        <br />

        <input type="submit" value="Submit" />
      </form>
      {visible && <h1>{firstName + lastName}</h1>}
    </>
  );
}
