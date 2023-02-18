import React from "react";
import { Link } from "react-router-dom";

let getDate = (single) => {
  return new Date(single.updated).toLocaleDateString();
};

let getCover = (single) => {
  let cover = "http://127.0.0.1:8000";
  let coverfile = cover + single.coverart;
  return coverfile;
};

let getTitle = (single) => {
  let title =
    single.artist + " - " + single.songname + " ft. " + single.features;
  return title;
};

let getContent = (single) => {
  let title = getTitle(single);
  let content = single.body.replaceAll("\n", " ");
  content = content.replaceAll(title, "");

  if (content.length > 45) {
    return content.slice(0, 45) + "...";
  } else {
    return content;
  }
};

let getSongName = (single) => {
  let songname = single.songname;
  return songname;
};

let getArtist = (single) => {
  let artist = single.artist;
  return artist;
};

let getState = (single) => {
  let state = single.state;
  return state;
};

const ListItem = ({ single }) => {
  return (
    <Link to={`/single/${single.id}`}>
      <div className="singles-list-item">
        <table><tbody>
          <tr>
            <td>
              <div className="singles-list-item-cover">
                <img src={getCover(single)}></img>
              </div>
            </td>
            <td>
              <div className="singles-list-item-artist">
                  {getArtist(single)}
              </div>
            </td>
            <td>
              <div className="singles-list-item-song">
                {getSongName(single)}
              </div>
            </td>
            <td>
              <div className="singles-list-item-date">
                  {getDate(single)}
              </div>
            </td>
            <td>
              <div className="singles-list-item-state">
                {getState(single)}
              </div>
            </td>
            <td>
              <div className="singles-list-item-button">
                &#9998;
              </div>
            </td>
          </tr></tbody>
        </table>
      </div>
    </Link>
  );
};

export default ListItem;
