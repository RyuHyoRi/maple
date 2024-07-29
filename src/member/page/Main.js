import {useState} from "react";
import { IoFemale, IoMale } from "react-icons/io5";
import Rank from "../container/Rank";
import Item from "../container/Item";

function Main() {
    const api_key = "live_582f40b3b640a29d538950842fce7456fdbc22e3f1b307eafdc9beb6a2f335357864f69fee77f29708e29330389b377a";
    const [characterName, setCharacterName] = useState("");
    const [characterOcid, setCharacterOcid] = useState("");
    const encodedCharacterName = encodeURIComponent(characterName);
    const [characterData, setCharacterData] = useState([]);
    const [statData, setStatData] = useState([]);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setCharacterName(newValue);
    };

    const ocidFetch = async () => {
        try {
            const response = await fetch(`https://open.api.nexon.com/maplestory/v1/id?character_name=${encodedCharacterName}`, {
                method: "GET",
                headers: {
                    "x-nxopen-api-key": api_key,
                }
            });
            const data = await response.json();
            setCharacterOcid(data.ocid);
            return data.ocid;
        } catch (error) {
            console.log("error", error);
            return null;
        }
    };

    const handleSearch = async () => {
        const ocid = await ocidFetch();
        if (ocid) {
            characterFetch(ocid);
            statFetch(ocid);
        }
    };

    const characterFetch = async (ocid) => {
        try {
            const response = await fetch(`https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}&date=${yesterday}`, {
                method: "GET",
                headers: {
                    "x-nxopen-api-key": api_key,
                }
            });
            const characterData = await response.json();
            setCharacterData(characterData);
        } catch (error) {
            console.log("error", error);
        }
    };
    console.log(characterData);

    const statFetch = async (ocid) => {
        try {
            const response = await fetch(`https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}&date=${yesterday}`, {
                method: "GET",
                headers: {
                    "x-nxopen-api-key": api_key,
                }
            });
            const statData = await response.json();
            setStatData(statData);
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleKeyPress = (event) => {
        if (event.keyCode === 13 || event.which === 13) {
            handleSearch();
        }
    };

    return (
        <div className="main">
            <div className="main_box">
                <h2>메이플스토리 캐릭터 검색</h2>
                <div className="content_box">
                    <div className="left_box">
                        <div className="search_box">
                            <input
                                className="character_name_input"
                                type="text"
                                placeholder="캐릭터 이름을 입력하세요."
                                value={characterName}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                            />
                            <button onClick={handleSearch} className="search_button">검색</button>
                        </div>
                        {characterData && Object.keys(characterData).length > 0 ? (
                        <div className="character_data_box">
                                <>
                                    <img className="character_image" src={characterData.character_image} alt="캐릭터 이미지"/>
                                    <div className="character_info_text_box">
                                        <div className="character_name_text_box">
                                            <span className="character_name_text">{characterData.character_name}</span>
                                            <span className="character_gender_icon">{characterData.character_gender === "여" ? <IoFemale className="female_icon"/> : <IoMale className="male_icon"/>}</span>
                                        </div>
                                        <div className="character_level_text_box">Lv. {characterData.character_level}</div>
                                        <div className="character_world_text_box">{characterData.world_name}</div>
                                        <div className="character_class_text_box">{characterData.character_class}</div>
                                        <div className="character_guild_text_box">{characterData.character_guild_name}</div>
                                    </div>
                                </>
                        </div>
                        ) : (
                            <div></div>
                        )}
                        {characterOcid ? (
                            <Rank ocid={characterOcid} world_name={characterData.world_name} api_key={api_key} yesterday={yesterday} characterData={characterData}/>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    {characterOcid ? (
                        <div className="right_box">
                            <Item ocid={characterOcid} api_key={api_key} yesterday={yesterday}/>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Main;