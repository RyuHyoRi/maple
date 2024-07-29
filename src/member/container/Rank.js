import {useEffect, useState} from "react";

export const Rank = (props) => {
    const {ocid, world_name, api_key, yesterday, characterData} = props;
    const [rankData, setRankData] = useState([]);
    const [worldRankData, setWorldRankData] = useState([]);
    const [classRankData, setClassRankData] = useState([]);
    const [characterClassInfo, setCharacterClassInfo] = useState('');
    const [classWorldRankData, setClassWorldRankData] = useState([]);

    useEffect(() => {
        if (characterData.character_class === "키네시스") {
            setCharacterClassInfo("프렌즈 월드-키네시스");
        } else if (characterData.character_class === "제로") {
            setCharacterClassInfo("초월자-제로");
        } else if (
            characterData.character_class === "블레스터"
            || characterData.character_class === "제논"
            || characterData.character_class === "데몬어벤져"
            || characterData.character_class === "배틀메이지"
            || characterData.character_class === "와일드헌터"
            || characterData.character_class === "메카닉"
            || characterData.character_class === "데몬슬레이어"
            || characterData.character_class === "시티즌"
        ) {
            setCharacterClassInfo(`레지스탕스-${characterData.character_class}`);
        } else if (
            characterData.character_class === "노블레스"
            || characterData.character_class === "소울마스터"
            || characterData.character_class === "플레임위자드"
            || characterData.character_class === "윈드브레이커"
            || characterData.character_class === "나이트워커"
            || characterData.character_class === "스트라이커"
            || characterData.character_class === "미하일"
        ) {
            setCharacterClassInfo(`기사단-${characterData.character_class}`);
        } else if (
            characterData.character_class === "해적"
            || characterData.character_class === "캐논슈터"
            || characterData.character_class === "캐논블래스터"
            || characterData.character_class === "캐논마스터"
            || characterData.character_class === "건슬링거"
            || characterData.character_class === "발키리"
            || characterData.character_class === "캡틴"
            || characterData.character_class === "인파이터"
            || characterData.character_class === "버커니어"
            || characterData.character_class === "바이퍼"
        ) {
            setCharacterClassInfo(`해적-${characterData.character_class}`);
        } else if (
            characterData.character_class === "로그"
            || characterData.character_class === "어쌔신"
            || characterData.character_class === "허밋"
            || characterData.character_class === "나이트로드"
            || characterData.character_class === "시프"
            || characterData.character_class === "시프마스터"
            || characterData.character_class === "섀도어"
            || characterData.character_class === "듀얼블레이드"
            || characterData.character_class === "세미듀어러"
            || characterData.character_class === "듀어러"
            || characterData.character_class === "듀얼마스터"
            || characterData.character_class === "슬래셔"
            || characterData.character_class === "듀얼블레이더"
        ) {
            setCharacterClassInfo(`도적-${characterData.character_class}`);
        } else if (
            characterData.character_class === "아처"
            || characterData.character_class === "헌터"
            || characterData.character_class === "레인저"
            || characterData.character_class === "보우마스터"
            || characterData.character_class === "사수"
            || characterData.character_class === "저격수"
            || characterData.character_class === "신궁"
            || characterData.character_class === "에인션트"
            || characterData.character_class === "체이서"
            || characterData.character_class === "패스파인더"
        ) {
            setCharacterClassInfo(`궁수-${characterData.character_class}`);
        } else if (
            characterData.character_class === "매지션"
            || characterData.character_class === "위자드(불,독)"
            || characterData.character_class === "메이지(불,독)"
            || characterData.character_class === "아크메이지(불,독)"
            || characterData.character_class === "위자드(썬,콜)"
            || characterData.character_class === "메이지(썬,콜)"
            || characterData.character_class === "아크메이지(썬,콜)"
            || characterData.character_class === "클레릭"
            || characterData.character_class === "프리스트"
            || characterData.character_class === "비숍"
        ) {
            setCharacterClassInfo(`마법사-${characterData.character_class}`);
        } else if (
            characterData.character_class === "검사"
            || characterData.character_class === "파이터"
            || characterData.character_class === "크루세이더"
            || characterData.character_class === "히어로"
            || characterData.character_class === "페이지"
            || characterData.character_class === "나이트"
            || characterData.character_class === "팔라딘"
            || characterData.character_class === "스피어맨"
            || characterData.character_class === "버서커"
            || characterData.character_class === "다크나이트"
        ) {
            setCharacterClassInfo(`전사-${characterData.character_class}`);
        } else {
            setCharacterClassInfo(`${characterData.character_class}-전체 전직`);
        }
    }, [characterData]);

    const rankFetch = async (ocid) => {
        try {
            const response = await fetch(`https://open.api.nexon.com/maplestory/v1/ranking/overall?ocid=${ocid}&date=${yesterday}`, {
                method: "GET",
                headers: {
                    "x-nxopen-api-key": api_key,
                }
            });
            const rankData = await response.json();
            setRankData(rankData.ranking[0]);
        } catch (error) {
            console.log("error", error);
        }
    }

    const worldRankFetch = async (ocid) => {
        try {
            const response = await fetch(`https://open.api.nexon.com/maplestory/v1/ranking/overall?ocid=${ocid}&world_name=${world_name}&date=${yesterday}`, {
                method: "GET",
                headers: {
                    "x-nxopen-api-key": api_key,
                }
            });
            const rankData = await response.json();
            setWorldRankData(rankData.ranking[0]);
        } catch (error) {
            console.log("error", error);
        }
    }

    console.log(world_name);

    const classRankFetch = async (ocid) => {
        if (characterClassInfo !== "") {
            try {
                const encodedClass = encodeURIComponent(characterClassInfo);
                const response = await fetch(`https://open.api.nexon.com/maplestory/v1/ranking/overall?ocid=${ocid}&date=${yesterday}&class=${encodedClass}`, {
                    method: "GET",
                    headers: {
                        "x-nxopen-api-key": api_key,
                    }
                });
                const rankData = await response.json();
                console.log(rankData);
                setClassRankData(rankData.ranking[0]);
            } catch (error) {
                console.log("error", error);
            }
        }
    }

    const classWorldRankFetch = async (ocid) => {
        if (characterClassInfo !== "") {
            try {
                const encodedClass = encodeURIComponent(characterClassInfo);
                const response = await fetch(`https://open.api.nexon.com/maplestory/v1/ranking/overall?ocid=${ocid}&date=${yesterday}&class=${encodedClass}&world_name=${world_name}`, {
                    method: "GET",
                    headers: {
                        "x-nxopen-api-key": api_key,
                    }
                });
                const rankData = await response.json();
                console.log(rankData);
                setClassWorldRankData(rankData.ranking[0]);
            } catch (error) {
                console.log("error", error);
            }
        }
    }

    useEffect(() => {
        if (ocid && characterClassInfo) {
            rankFetch(ocid);
            worldRankFetch(ocid);
            classRankFetch(ocid);
            classWorldRankFetch(ocid);
        }
    }, [ocid, characterClassInfo]);

    return (
        <div className="character_data_box">
            <div className="rank_data_box">
                {rankData && Object.keys(rankData).length && worldRankData && Object.keys(worldRankData).length > 0 ? (
                    <div className="rank_box">
                        <div className="rank_text_box">
                            <div>전체 랭킹</div>
                            <div>{new Intl.NumberFormat().format(rankData.ranking)} 위</div>
                        </div>
                        <div className="world_rank_text_box">
                            <div>월드 랭킹</div>
                            <div>{new Intl.NumberFormat().format(worldRankData.ranking)} 위</div>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
                {classRankData && Object.keys(classRankData).length && classWorldRankData && Object.keys(classWorldRankData).length > 0 ? (
                    <div className="rank_box">
                        <div className="rank_text_box">
                            <div>직업 랭킹(전체)</div>
                            <div>{new Intl.NumberFormat().format(classRankData.ranking)} 위</div>
                        </div>
                        <div className="world_rank_text_box">
                            <div>직업 랭킹(월드)</div>
                            <div>{new Intl.NumberFormat().format(classWorldRankData.ranking)} 위</div>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default Rank;