import React, {useCallback, useEffect, useState} from "react";
import '../styles/Email.css'
import mail from '../../assets/images/mail.svg'
import inbox from '../../assets/images/inbox.svg'
import trash from '../../assets/images/trash.svg'
import sta from '../../assets/images/star.svg'
import archive from '../../assets/images/archive.svg'
import draft from '../../assets/images/draft.svg'
import sent from '../../assets/images/send.svg'
import down from '../../assets/images/down.svg'
import front from '../../assets/images/front.svg'
import back from '../../assets/images/back.svg'
import outbox from '../../assets/images/outbox.svg'
function Email(){
    const [gMailClicked, setGmailClicked] = useState(false)
    const [folderClicked, setFolderClicked] = useState(false)
    const [inboxClicked, setInboxClicked] = useState(false)
    const [inboxContent, setInboxContent] = useState(false)
    const [isLoading, setIsLoading] = useState (true);
    const [error, setError] = useState (null);

    const [count, setCount] = useState(0)
    const [count1, setCount1] = useState(0)
    const [data, setData] = useState({})
    const [divId, setDivId] = useState(0)


    let url = "https://dummyjson.com/products"
    const arr = [5];

    const fetchData = useCallback (async () => {
        setIsLoading (true);
        try {
            const res = await fetch (url, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
            if (res.ok) {
                const data = await res.json ();
                setData (data.products);
                setIsLoading (false);
            }
            // setDataList(dataList.concat(data[6]))
        } catch (err) {
            setError (err.message);
            setIsLoading (false);
        }
    }, []);

    useEffect (
        () => {
            const couter = setInterval (() => {
                setCount ((count + 1) % arr.length);
            }, 500);

            fetchData ();
            return () => clearInterval (couter);
        },
        [fetchData, count, arr.length, document.getElementsByClassName("AllInbox")]
    );


    function displayGmailContent(event){
        if(event.target.className == "GmailContent" || event.target.className == "down" ){

            if (count == 0){
                setGmailClicked(true)
                setCount(count+1)
            }
            else if(count > 0) {
            setGmailClicked(false)
           setCount(0)}}

    }

    function displayFolderContent(event){

        if(event.target.className == "FolderContent" ){

            if (count1 == 0){

                setFolderClicked(true)
                setCount1(count+1)

            }
            else if(count1 > 0) {
                setFolderClicked(false)
                setCount1(0)}
        }

    }

    function displayInbox(event){
        if(event.target.className == "inbox"){
            setInboxClicked(true)

        }
    }



    function displayInboxContent(){
          setInboxContent(true)

    }

    const getDivId = (id, event) => {setDivId(id)
        displayInboxContent()}







    return(
        <div className= "main">
        <div className= "MailContainer">

            <div className="MailFeatures">
                <div className="colours">
                    <div className="Red"></div>
                    <div className="Orange"></div>
                    <div className="Green"></div>
                </div>
                <br/>
                <div className="gmc">
                <div className="GmailContent" onClick={displayGmailContent}> <img className="mail" src={mail}/> <p>Gmail</p> <img className="down" src={down}/></div>
                {gMailClicked && (<div>
                    <div className="inbox" onClick={displayInbox}><img className="mail" src={inbox}/> <p>Inbox</p>  <li>{data.length}</li> </div>
                    <div className="inbox" ><img className="mail" src={sent}/><p>Sent</p>  <li>451</li></div>
                     <div className="inbox" ><img className="mail" src={sta}/> <p>Starred</p>  <li>245</li></div>
                     <div className="inbox" > <img className="mail" src={archive}/><p>Archive</p>  <li>99</li></div>
                     <div className="inbox" > <img className="mail" src={trash}/><p>Delete</p>  <li>509</li></div>
                 <div className="inbox" > <img className="mail" src={draft}/><p>Draft</p>  <li>10</li></div>
                </div>)}
                <br/>

                <div className="FolderContent" onClick={displayFolderContent}> Folder</div>
                {folderClicked && (<div>
                    <div className="inbox" onClick={displayInbox}><img className="mail" src={inbox}/> <p>Inbox</p>  <li>{data.length}</li> </div>
                    <div className="inbox" ><img className="mail" src={sent}/><p>Sent</p>  <li>451</li></div>
                    <div className="inbox" ><img className="mail" src={sta}/> <p>Starred</p>  <li>245</li></div>
                    <div className="inbox" > <img className="mail" src={archive}/><p>Archive</p>  <li>99</li></div>
                    <div className="inbox" > <img className="mail" src={trash}/><p>Delete</p>  <li>509</li></div>


                </div>)}
                </div>
            </div>
            <div className="FeaturesDisplay">

                <div className="InboxBar"> <div className="Inbox">Inbox</div>
                   <br/>
                   <p id="noOfMessages"> 2445 messages, 2 Unread</p>

                </div>
                <input className="search" placeholder={'     search'} />
                <div className="topBox">
                    {inboxClicked &&
                        (error == "null"? <div>error loading, check network connection</div>:
                            data.map((value, index) => (
                    <div className="AllInbox" onClick={() =>
                        getDivId(value.id)}>
                        <img className="profilePicture1" src={value.images[1]}/>
                        <div className="title" key={index}>  {value.title}</div>
                        <div className="time">14:35</div>
                        <div className="Blue"></div>

                    </div>

                ) ))}
                </div>
            </div>
            <div className= "FeaturesDisplayContent">
                <div className= "icons">
                    <img className= "icon" src={archive} />
                    <img className= "icon" src={trash}/>|
                    <img id="reply" className= "icon" src={back} />
                    <img className= "icon" src={front}/>
                    | <img className= "icon" src={outbox}/>

                </div>

                {inboxContent && (
                    <div className="info" >


                        <div className="inboxInfo">
                            <div className="profile">
                                <img className="profilePicture" src={data[divId].images[1]}/>
                                <div className="textTitle" >  {data[divId].title}
                                    <br/> to: kusejoshua@gmail.com</div>


                            </div>

                        <div className="description">{data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            {data[divId].description}
                            </div>

                        <img className="inboxContentPicture" src={data[divId].images[0]}/>

                        </div>

                    </div>


                )
                    }
            </div>

        </div>
        </div>
    )
}

export default Email