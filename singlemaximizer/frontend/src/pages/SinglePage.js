import React, {useState, useEffect, Component } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/back-arrow.svg'
import axios from 'axios'



const SinglePage = () => {

    let { id } = useParams()
    let [single, setSingle] = useState(null)
    let navigate = useNavigate()
    
    
    
    useEffect(() => {
        getSingle()
    }, [id])
    
   
    


    let getSingle = async () => {
        console.log("id is: ", id)
        if (id === 'new'){
            setSingle(single => ({...single, 'albumtitle': ""}))
            setSingle(single => ({...single, 'artist': ""}))
            setSingle(single => ({...single, 'bio': ""}))
            setSingle(single => ({...single, 'body': ""}))
            setSingle(single => ({...single, 'coverart': null}))
            setSingle(single => ({...single, 'email': ""}))
            setSingle(single => ({...single, 'facebook': ""}))
            setSingle(single => ({...single, 'features': ""}))
            setSingle(single => ({...single, 'firstname': ""}))
            setSingle(single => ({...single, 'genres': ""}))
            setSingle(single => ({...single, 'itunes': ""}))
            setSingle(single => ({...single, 'label': ""}))
            setSingle(single => ({...single, 'lastname': ""}))
            setSingle(single => ({...single, 'mp3': null}))
            setSingle(single => ({...single, 'pitch': ""}))
            setSingle(single => ({...single, 'press': null}))
            setSingle(single => ({...single, 'producer': ""}))
            setSingle(single => ({...single, 'songname': ""}))
            setSingle(single => ({...single, 'soundcloud': ""}))
            setSingle(single => ({...single, 'spotify': ""}))
            setSingle(single => ({...single, 'twitter': ""}))
            setSingle(single => ({...single, 'website': ""}))
            setSingle(single => ({...single, 'youtube': ""}))
            let coverfile = "http://127.0.0.1:8000/media/New-Trackstarz-App-logo.png"
            setSingle(single => ({...single, 'coverfile': coverfile}))
            return
        } 
        let response = await fetch(`/api/singles/${id}/`)
        let data = await response.json()
        console.log("Current genre is: ", data.genres)
        console.log("Current mp3 is: ", data.mp3)
        console.log("Current press is: ", data.press)
        console.log("Current coverart is: ", data.coverart)
        console.log("GetSingle started as: ", single)
        setSingle(data)
        single = data
        let coverurl = "http://127.0.0.1:8000"
        let coverfile = coverurl + data.coverart
        setSingle(single => ({...single, 'coverfile': coverfile}))
        setSingle(single => ({...single, 'coverchange': false}))
        setSingle(single => ({...single, 'mp3change': false}))
        setSingle(single => ({...single, 'presschange': false}))
        console.log("GetSingle now is: ", single)
    }


    let createSingle = async () => {
        let form_data = new FormData()
        console.log("Creating Single: ", single)
        form_data.append('body', single.body)
        form_data.append('songname', single.songname)
        form_data.append('artist', single.artist)
        form_data.append('firstname', single.firstname)
        form_data.append('lastname', single.lastname)
        form_data.append('email', single.email)
        form_data.append('website', single.website)
        form_data.append('features', single.features)
        form_data.append('genres', single.genres)
        form_data.append('producer', single.producer)
        form_data.append('twitter', single.twitter)
        form_data.append('facebook', single.facebook)
        console.log("Single.spotify is: ", single?.spotify)
        if(single.spotify !== undefined){
            form_data.append('spotify', single.spotify)
        }
        if(single.itunes !== undefined){
            form_data.append('itunes', single.itunes)
        }
        if(single.soundcloud !== undefined){
            form_data.append('soundcloud', single.soundcloud)
        }
        if(single.youtube !== undefined){
            form_data.append('youtube', single.youtube)
        }
        console.log("Single.coverart is: ", single?.coverart)
        if(single.coverart !== null){
            console.log("Cover Art Appended: ", single.coverart)
            form_data.append('coverart', single.coverart)
        }
        if(single.mp3 !== null){
            form_data.append('mp3', single.mp3)
        }
        if(single.press !== null){
            form_data.append('press', single.press)
        }
        let url = `/api/singles/`
        axios.post(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => console.log(err))
    }


    let updateSingle = async () => {
        let form_data = new FormData()
        form_data.append('body', single.body)
        form_data.append('songname', single.songname)
        form_data.append('artist', single.artist)
        form_data.append('firstname', single.firstname)
        form_data.append('lastname', single.lastname)
        form_data.append('email', single.email)
        form_data.append('website', single.website)
        form_data.append('features', single.features)
        form_data.append('genres', single.genres)
        form_data.append('producer', single.producer)
        form_data.append('twitter', single.twitter)
        form_data.append('facebook', single.facebook)
        form_data.append('spotify', single.spotify)
        form_data.append('itunes', single.itunes)
        form_data.append('soundcloud', single.soundcloud)
        form_data.append('youtube', single.youtube)
        if(single.coverchange){
            form_data.append('coverart', single.coverart)
        }
        if(single.mp3change){
            form_data.append('mp3', single.mp3)
        }
        if(single.presschange){
            form_data.append('press', single.press)
        }
        let url = `/api/singles/${id}/`
        axios.put(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => console.log(err))
    }


        


    let deleteSingle = async () => {
        fetch(`/api/singles/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }

        })
        navigate('/')
    }



    

    let handleSubmit = () => {
        console.log('Submit Single: ', single)
        if(id !== 'new') {
            console.log('Submit Single Updated: ', single)
            updateSingle()
        }else if(id === 'new' && single.body !== null) {
            console.log('Submit Single Created: ', single)
            createSingle()
        }
        navigate('/')
    }


    let handleChange = (e) => {
        console.log("Single is currently: ", single)
        console.log('Handle Change event: ', e)
        const target = e.target
        console.log('Handle Change target: ', target)
        const type = target.type
        console.log('Handle Change type: ', type)
        const name = target.name
        console.log('Handle Change name: ', name)
        const value = target.value
        console.log('Handle Change value: ', value)
        if(name === "artist"){
            setSingle(single => ({...single, 'artist': value}))
            console.log('Handle Artist Change: ', single)
        }else if(name === "songname"){
            setSingle(single => ({...single, 'songname': value}))
            console.log('Handle Song Name Change: ', single)
        }else if(name === "features"){
            setSingle(single => ({...single, 'features': value}))
            console.log('Handle Features Change: ', single)
        }else if(name === "producer"){
            setSingle(single => ({...single, 'producer': value}))
            console.log('Handle Producer Change: ', single)
        }else if(name === "hiphop"){
            if(target.checked){
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ''}))  
                }
                let newgenres = single.genres + ' ' + name
                setSingle(single => ({...single, 'genres': newgenres}))
                console.log('Handle Genres Hip Hop Change UChecked: ', newgenres)
            }else{
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ''}))  
                }
                if (single.genres.includes('hiphop')){
                    let newgenres = single.genres.replaceAll('hiphop', '')
                    newgenres = newgenres.replace(/\s+/g,' ').trim()
                    setSingle(single => ({...single, 'genres': newgenres}))
                    console.log('Handle Genres Hip Hop Change Already Checked: ', newgenres)
                }
                
                
                
            }
        }else if(name === "chh"){
            if(target.checked){
                console.log('Handle Genres CHH Change Current Genre: ', single.genres)
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ' '})) 
                    console.log('CHH Handle Change Genre changed to: ', single.genres) 
                }
                let newgenres = single.genres + ' ' + name
                setSingle(single => ({...single, 'genres': newgenres}))
                console.log('Handle Genres CHH Change New Genre: ', newgenres)
            }else{
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ''}))  
                }
                if (single.genres.includes('chh')){
                    let newgenres = single.genres.replaceAll('chh', '')
                    newgenres = newgenres.replace(/\s+/g,' ').trim()
                    setSingle(single => ({...single, 'genres': newgenres}))
                    console.log('Handle Genres CHH Change Already Checked: ', newgenres)
                }
            }
        }else if(name === "randb"){
            if(target.checked){
                console.log('Handle Genres R&B Change Current Genre: ', single.genres)
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ' '})) 
                    console.log('R&B Handle Change Genre changed to: ', single.genres) 
                }
                let newgenres = single.genres + ' ' + name
                setSingle(single => ({...single, 'genres': newgenres}))
                console.log('Handle Genres R&B Change New Genre: ', newgenres)
            }else{
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ''}))  
                }
                if (single.genres.includes('randb')){
                    let newgenres = single.genres.replaceAll('randb', '')
                    newgenres = newgenres.replace(/\s+/g,' ').trim()
                    setSingle(single => ({...single, 'genres': newgenres}))
                    console.log('Handle Genres R&B Change Already Checked: ', newgenres)
                }
            }
        }else if(name === "pop"){
            if(target.checked){
                console.log('Handle Genres Pop Change Current Genre: ', single.genres)
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ' '})) 
                    console.log('Pop Handle Change Genre changed to: ', single.genres) 
                }
                let newgenres = single.genres + ' ' + name
                setSingle(single => ({...single, 'genres': newgenres}))
                console.log('Handle Genres Pop Change New Genre: ', newgenres)
            }else{
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ''}))  
                }
                if (single.genres.includes('pop')){
                    let newgenres = single.genres.replaceAll('pop', '')
                    newgenres = newgenres.replace(/\s+/g,' ').trim()
                    setSingle(single => ({...single, 'genres': newgenres}))
                    console.log('Handle Genres Pop Change Already Checked: ', newgenres)
                }
            }
        }else if(name === "rock"){
            if(target.checked){
                console.log('Handle Genres Rock Change Current Genre: ', single.genres)
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ' '})) 
                    console.log('Rock Handle Change Genre changed to: ', single.genres) 
                }
                let newgenres = single.genres + ' ' + name
                setSingle(single => ({...single, 'genres': newgenres}))
                console.log('Handle Genres Rock Change New Genre: ', newgenres)
            }else{
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ''}))  
                }
                if (single.genres.includes('rock')){
                    let newgenres = single.genres.replaceAll('rock', '')
                    newgenres = newgenres.replace(/\s+/g,' ').trim()
                    setSingle(single => ({...single, 'genres': newgenres}))
                    console.log('Handle Genres Rock Change Already Checked: ', newgenres)
                }
            }
        }else if(name === "ccm"){
            if(target.checked){
                console.log('Handle Genres CCM Change Current Genre: ', single.genres)
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ' '})) 
                    console.log('CCM Handle Change Genre changed to: ', single.genres) 
                }
                let newgenres = single.genres + ' ' + name
                setSingle(single => ({...single, 'genres': newgenres}))
                console.log('Handle Genres CCM Change New Genre: ', newgenres)
            }else{
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ''}))  
                }
                if (single.genres.includes('ccm')){
                    let newgenres = single.genres.replaceAll('ccm', '')
                    newgenres = newgenres.replace(/\s+/g,' ').trim()
                    setSingle(single => ({...single, 'genres': newgenres}))
                    console.log('Handle Genres CCM Change Already Checked: ', newgenres)
                }
            }
        }else if(name === "gospel"){
            if(target.checked){
                console.log('Handle Genres Gospel Change Current Genre: ', single.genres)
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ' '})) 
                    console.log('Gospel Handle Change Genre changed to: ', single.genres) 
                }
                let newgenres = single.genres + ' ' + name
                setSingle(single => ({...single, 'genres': newgenres}))
                console.log('Handle Genres Gospel Change New Genre: ', newgenres)
            }else{
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ''}))  
                }
                if (single.genres.includes('gospel')){
                    let newgenres = single.genres.replaceAll('gospel', '')
                    newgenres = newgenres.replace(/\s+/g,' ').trim()
                    setSingle(single => ({...single, 'genres': newgenres}))
                    console.log('Handle Genres Gospel Change Already Checked: ', newgenres)
                }
            }
        }else if(name === "country"){
            if(target.checked){
                console.log('Handle Genres Country Change Current Genre: ', single.genres)
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ' '})) 
                    console.log('Country Handle Change Genre changed to: ', single.genres) 
                }
                let newgenres = single.genres + ' ' + name
                setSingle(single => ({...single, 'genres': newgenres}))
                console.log('Handle Genres Country Change New Genre: ', newgenres)
            }else{
                if (typeof single.genres === 'undefined'){
                    setSingle(single => ({...single, 'genres': ''}))  
                }
                if (single.genres.includes('country')){
                    let newgenres = single.genres.replaceAll('country', '')
                    newgenres = newgenres.replace(/\s+/g,' ').trim()
                    setSingle(single => ({...single, 'genres': newgenres}))
                    console.log('Handle Genres Country Change Already Checked: ', newgenres)
                    console.log('Handle Genres Country Change Single is now: ', single)
                }
            }
        }else if(name === "twitter"){
            setSingle(single => ({...single, 'twitter': value}))
        console.log('Handle Twitter Change: ', single)
        }else if(name === "facebook"){
            setSingle(single => ({...single, 'facebook': value}))
        console.log('Handle Facebook Change: ', single)
        }else if(name === "soundlcoud"){
            setSingle(single => ({...single, 'soundcloud': value}))
        console.log('Handle Soundcloud Change: ', single)
        }else if(name === "spotify"){
            setSingle(single => ({...single, 'spotify': value}))
        console.log('Handle Spotify Change: ', single)
        }else if(name === "itunes"){
            setSingle(single => ({...single, 'itunes': value}))
        console.log('Handle Spotify Change: ', single)
        }else if(name === "youtube"){
            setSingle(single => ({...single, 'youtube': value}))
            console.log('Handle Youtube Change: ', single)
        }else if(name === "mp3"){
            let song = target.files[0]
            setSingle(single => ({...single, 'mp3': song, name}))
            setSingle(single => ({...single, 'mp3change': true}))
            console.log('Handle MP3 Change: ', song)
        }else if(name === "coverart"){
            let cover = target.files[0]
            let reader = new FileReader()
            let coverfile = URL.createObjectURL(cover)
            reader.readAsDataURL(cover)
            reader.onload = (e) => {
            console.log('Handle Cover Reader: ', cover)
            }
            
            setSingle(single => ({...single, 'coverart': cover}))
            setSingle(single => ({...single, 'coverfile': coverfile}))
            setSingle(single => ({...single, 'coverchange': true}))
            console.log('Handle Cover Art Change: ', cover)
        }else if(name === "press"){
            let photo = target.files[0]
            setSingle(single => ({...single, 'press': photo}))
            setSingle(single => ({...single, 'presschange': true}))
            console.log('Handle Press Change: ', photo)
        }else if(name === "body"){
            setSingle(single => ({...single, 'body': value}))
            console.log('Handle Body Change: ', single)
        }
        
    }

    
    return (
            <div className="single">
                <div className='single-header'>
                    <h3>
                        <ArrowLeft onClick={handleSubmit}/> 
                    </h3>
                    {id !== 'new' ? (
                        <button onClick={deleteSingle}>Delete</button>
                    ) : (
                        <button onClick={handleSubmit}>Done</button>
                    )}
                    
                </div>
                <div className="singles-list">
                    <table className="singletable"><tbody>
                        <tr>
                            <td className="coverartcell" rowSpan="4">
                                <img className="coverart" src={single?.coverfile || ''}></img>
                            </td>
                            <td className="mainlabelcell">
                                <label>ARTIST</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="maininputcell">
                                <input onChange={(e) => { handleChange(e) }} name="artist" value={single?.artist || ''}></input>
                            </td>
                        </tr>
                        <tr>
                            <td className="mainlabelcell">
                                <label>SONG NAME</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="maininputcell">
                                <input onChange={(e) => { handleChange(e) }} name="songname" value={single?.songname || ''}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <input type="file" onChange={(e) => { handleChange(e) }} name="coverart" ></input>
                            </td>
                        </tr></tbody>
                    </table>
                
                <table className="singletable"><tbody>
                    <tr>
                        <td className="labelcell">
                            <label>FEATURES</label>
                        </td>
                        <td className="labelcell">
                            <label>PRODUCER</label>
                        </td>
                    </tr>
                    <tr>
                        <td className="inputcell">
                            <input onChange={(e) => { handleChange(e) }} name="features" value={single?.features || ''}></input>
                        </td>
                        <td className="inputcell">
                            <input onChange={(e) => { handleChange(e) }} name="producer" value={single?.producer || ''}></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelcell">
                            <label>GENRES</label>
                        </td>
                        <td className="labelcell">
                            <label>TWITTER</label>
                        </td>
                    </tr>
                    <tr>
                        <td rowSpan="7" className="inputcheck">
                            <span className="checkspace"><input type="checkbox" onChange={(e) => { handleChange(e) }} name="hiphop" checked={single?.genres?.includes('hiphop')}></input>
                            <label name="hiphop">Hip Hop</label></span>
                            <br></br><div className="checkspace"></div>
                            <span className="checkspace"><label name="chh">
                            <input type="checkbox" onChange={(e) => { handleChange(e) }} name="chh" checked={single?.genres?.includes('chh')}></input>
                            CHH</label></span>
                            <br></br><div className="checkspace"></div>
                            <span className="checkspace"><label name="randb">
                            <input type="checkbox" onChange={(e) => { handleChange(e) }} name="randb" checked={single?.genres?.includes('randb')}></input>
                            R&B</label></span>
                            <br></br><div className="checkspace"></div>
                            <span className="checkspace"><label name="pop">
                            <input type="checkbox" onChange={(e) => { handleChange(e) }} name="pop" checked={single?.genres?.includes('pop')}></input>
                            Pop</label></span>
                            <br></br><div className="checkspace"></div>
                            <span className="checkspace"><label name="rock">
                            <input type="checkbox" onChange={(e) => { handleChange(e) }} name="rock" checked={single?.genres?.includes('rock')}></input>
                            Rock</label></span>
                            <br></br><div className="checkspace"></div>
                            <span className="checkspace"><label name="ccm">
                            <input type="checkbox" onChange={(e) => { handleChange(e) }} name="ccm" checked={single?.genres?.includes('ccm')}></input>
                            CCM</label></span>
                            <br></br><div className="checkspace"></div>
                            <span className="checkspace"><label name="gospel">
                            <input type="checkbox" onChange={(e) => { handleChange(e) }} name="gospel" checked={single?.genres?.includes('gospel')}></input>
                            Gospel</label></span>
                            <br className="checkspace"></br><div className="checkspace"></div>
                            <span className="checkspace"><label name="country">
                            <input type="checkbox" onChange={(e) => { handleChange(e) }} name="country" checked={single?.genres?.includes('country')}></input>
                            Country</label></span>
                        </td>
                        <td className="inputcell">
                        <input type="url" onChange={(e) => { handleChange(e) }} name="twitter" value={single?.twitter || ''}></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelcell">
                        <label>FACEBOOK</label>
                        </td>
                    </tr>
                    <tr>
                        <td className="inputcell">
                        <input type="url" onChange={(e) => { handleChange(e) }} name="facebook" value={single?.facebook || ''}></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelcell">
                        <label>SOUNDCLOUD</label>
                        </td>
                    </tr>
                    <tr>
                        <td className="inputcell">
                        <input type="url" onChange={(e) => { handleChange(e) }} name="soundcloud" value={single?.soundcloud || ''}></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelcell">
                        <label>SPOTIFY</label>
                        </td>
                    </tr>
                    <tr>
                        <td className="inputcell">
                        <input type="url" onChange={(e) => { handleChange(e) }} name="spotify" value={single?.spotify || ''}></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelcell">
                        <label>iTUNES</label>
                        </td>
                        <td className="labelcell">
                        <label>YOUTUBE</label>
                        </td>
                    </tr>
                    <tr>
                        <td className="inputcell">
                        <input type="url" onChange={(e) => { handleChange(e) }} name="itunes" value={single?.itunes || ''}></input>
                        </td>
                        <td className="inputcell">
                        <input type="url" onChange={(e) => { handleChange(e) }} name="youtube" value={single?.youtube || ''}></input>
                        </td>
                    </tr>
                    <tr>
                        <td className="labelcell">
                        <label>MP3</label>
                        </td>
                        <td className="labelcell">
                        <label>PRESS PHOTOS</label>
                        </td>
                    </tr>
                    <tr>
                        <td className="inputcell">
                        <input type="file" onChange={(e) => { handleChange(e) }} name="mp3" placeholder="Upload file..." ></input>
                        </td>
                        <td className="inputcell">
                        <input type="file" onChange={(e) => { handleChange(e) }} name="press" ></input>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                        <label>BODY</label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                        <textarea onChange={(e) => { handleChange(e) }} name="body" value={single?.body || ''}></textarea>
                        </td>
                    </tr></tbody>
                </table>
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                </div>
            </div>
        )
    }


export default SinglePage