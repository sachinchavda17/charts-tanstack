export const getUsers = async()=>{
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    return res.json()
}
export const createUser = async(user)=>{
    console.log("new user created")
}