import React, { useState, useEffect, useContext } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";
import AuthContext from "../context/AuthContext";

const SinglesListPage = () => {
  let [singles, setSingles] = useState([]);
  let {authTokens, logoutUser} = useContext(AuthContext)

  useEffect(() => {
    getSingles();
  }, []);

  let getSingles = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/singles/", {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer' + String(authTokens.access)
      }
    });
    let data = await response.json();
    if(response.status === 200){
      console.log('Response is: ', response)
      console.log('Data is: ', data)
      setSingles(data);

    }else if (response.statusText === 'Unauthorized'){
      logoutUser()
    }
    
  };

  return (
    <div className="singles">
      <div className="singles-header">
        <h2 className="singles-title">&#9782; Singles</h2>
        <p className="singles-count">{singles.length}</p>
      </div>
      <div className="singles-list">
        <div className="singles-list-item-header">
          <table><tbody>
            <tr>
              <th>
                <div className="singles-list-item-cover"></div>
              </th>
              <th>
                <div className="singles-list-item-artist">ARTIST</div>
              </th>
              <th>
                <div className="singles-list-item-song">SONG</div>
              </th>
              <th>
                <div className="singles-list-item-date">DATE</div>
              </th>
              <th>
                <div className="singles-list-item-state-header">STATUS</div>
              </th>
              <th>
                <div className="singles-list-item-button"></div>
              </th>
            </tr></tbody>
          </table>
        </div>
        {singles.map((single, index) => (
          <ListItem key={index} single={single} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default SinglesListPage;
