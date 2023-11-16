import './App.css';
import { useEffect, useState } from 'react';


function App() {
const [list,setList] = useState(undefined)
const [click,setClick] = useState(false)
const [username,setUsername] = useState("")
const [session,setSession] = useState("")
const [result,setResult] = useState("")
const [isUnfollowed, setIsUnfollowed] = useState(false)
const [buttonId,setButtonId] = useState([])
const [isScheduled,setIsScheduled] = useState("want to schedule?")
const options = {
  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  //make sure to serialize your JSON body
  body: JSON.stringify({
    name : username,
    sessionToken : session
        } ),
}

 
const clickhandler_get_nonFollowBack = () => {
  
  setList([])
  setClick(true)
  setResult("Result Pending...")
  fetch("https://c688f62pwi.execute-api.eu-north-1.amazonaws.com/get_non_followbacks",options)
  .then((Response) => Response.json())
  .then((Response) => Response.non_followback_data ? setList(Response.non_followback_data):setList([]));
   
}

const clickhandler_unfollow = (e) => {
   const object = {
    method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id : e.target.value.toString(),
    session : session
  
        } ),

   };

   setIsUnfollowed(false);
   fetch("https://ok2cui9j2e.execute-api.eu-north-1.amazonaws.com/unfollowUser",object)
   .then((Response) => Response.json())
   .then((response) => {
    if(response.response === "true"){
      setIsUnfollowed(true);
      setButtonId((prevState) => {
        return [...prevState, e.target.value]
      })
    }
    else {
      setIsUnfollowed(false);
    }
   })
}

const clickhandler_unfollowAll = () => {
  setIsScheduled('scheduling...')
  const object = {
    method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data : list,
    session : session,
    user_name : username
  
        } ),

   };
  fetch('https://6auvdipio1.execute-api.eu-north-1.amazonaws.com/unfollowAllNonfollowbacks',object)
  .then((response) => response.json())
  .then((response) => setIsScheduled(response.result))
}


return (
  <>
  <div className='header'>
   <p>PHTOOL</p>
   <button className='button-29'>Sign Up</button>
  </div>
  { click ? 
  <div className="get-user-data">
  <label>Enter Product Hunt Username here</label> 
  <input className="username" value = {username} onChange={(e) => setUsername(e.target.value) } type='text' placeholder='Username'></input>
  <label>Enter Product Hunt Session Production here</label>
  <input className="session" value = {session} onChange={(e) => setSession(e.target.value) } type='text' width='300px' placeholder='Y3HiZ%2B24fkvfFphs8qngDauDdJ6GhqqPzHmlQXdfXUYBbOojmAH1L2z3sT6tKijJq0ql6WDKbywD5YgoCnG0d3NbBcB7j1K7BgNzQaGAF1QtFA77sjMAPYjHInidNNKxVn7q18YBbakDjEl3xbkkhsBHy1kotTH0woxl11vpBS8cZESWvSSpgRzRESg08W1FyWk%2BYFC8DHLH0s8EdwWTc0fxCB%2F5i3iiTe4sh%2BdUbvi6Xv1ZZWQDZUVWwwp%2F42lWsD0El4bXaWkBx3AYZd9FrRS82rc7DgYRnUq18PkKMDHGOZMTiqlgnauZP5yXQa7Cjyjksgqa37F%2BOOr99%2Bo0k%2F0Pcfm9nP5o8hrw8lmID6HFxuNp7lCVy6AToe7%2FxxG%2FvC12eUUtKybMP5K2uaMzhEjL1pR8qUjXkPEo8dAgIQTalIkBRsHtQUS7Iy8TxEHyobieuhG8S55s0vwHv9hwjZ%2BbcY1lIbXKu4IzP'></input>
  <button onClick = {clickhandler_get_nonFollowBack} className="button-29" type="submit">Get Non-followbacks</button> 
  {isScheduled}
  <button onClick = {clickhandler_unfollowAll} className="button-29" type="submit">Unfollow All</button> </div>:
  
  <div className="get-user-data">
    <label>Enter Product Hunt Username here</label> 
  <input className="username" value = {username} onChange={(e) => setUsername(e.target.value) } type='text' placeholder='Username'></input>
  <label>Enter Product Hunt Session Production here</label>
  <input className="session" value = {session} onChange={(e) => setSession(e.target.value) } type='text' width='300px' placeholder='Y3HiZ%2B24fkvfFphs8qngDauDdJ6GhqqPzHmlQXdfXUYBbOojmAH1L2z3sT6tKijJq0ql6WDKbywD5YgoCnG0d3NbBcB7j1K7BgNzQaGAF1QtFA77sjMAPYjHInidNNKxVn7q18YBbakDjEl3xbkkhsBHy1kotTH0woxl11vpBS8cZESWvSSpgRzRESg08W1FyWk%2BYFC8DHLH0s8EdwWTc0fxCB%2F5i3iiTe4sh%2BdUbvi6Xv1ZZWQDZUVWwwp%2F42lWsD0El4bXaWkBx3AYZd9FrRS82rc7DgYRnUq18PkKMDHGOZMTiqlgnauZP5yXQa7Cjyjksgqa37F%2BOOr99%2Bo0k%2F0Pcfm9nP5o8hrw8lmID6HFxuNp7lCVy6AToe7%2FxxG%2FvC12eUUtKybMP5K2uaMzhEjL1pR8qUjXkPEo8dAgIQTalIkBRsHtQUS7Iy8TxEHyobieuhG8S55s0vwHv9hwjZ%2BbcY1lIbXKu4IzP'></input>
  <button onClick = {clickhandler_get_nonFollowBack} className="button-29" type="submit">Get Non-followbacks</button>
 </div>
  }
 
 
   <div className='result'>
    {  click ? 
    list.length === 0 ? <p>{result}</p> :(list.map((data) => {
      console.log(data.id)
          const usernames = 
            <div className='user_info'>
            <div className='avatar'><img className="img" src ={data.avatarUrl} alt = "user image" width="100px" height="85px"/>
            <p className='id'>#{data.id}</p>
            </div>
            <div><p>{data.name}</p></div>
            <div > { buttonId.includes(data.id) ? <button className='button-29'>Done</button>:
             <button value = {data.id} onClick = {clickhandler_unfollow} className='button-29' type="submit" >Unfollow</button>}
            
            </div>
            </div>

          return (
            <div>
            
                    {usernames}
            </div>
          

         ) })): null }
         </div>
         </> )
    }

export default App;
