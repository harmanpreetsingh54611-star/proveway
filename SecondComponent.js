const SecondComponent=(props)=>{
    {console.log(props)}
    const {first_name,last_name,age,salary}=props.res
    return(
    <>
    <h1>{first_name}</h1>
    <h2>{last_name}</h2>
    <h3>{age}</h3>
    <h3>{salary}</h3>
    </>)
}
export default SecondComponent;