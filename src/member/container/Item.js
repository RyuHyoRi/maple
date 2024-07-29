import {useEffect, useState} from "react";
import { TbStarFilled } from "react-icons/tb";

export const Item = (props) => {
    const {ocid, api_key, yesterday} = props;
    const [itemData, setItemData] = useState([]);
    const [presetIndex, setPresetIndex] = useState(0);

    const itemFetch = async (ocid) => {
        try {
            const response = await fetch(`https://open.api.nexon.com/maplestory/v1/character/item-equipment?ocid=${ocid}&date=${yesterday}`, {
                method: "GET",
                headers: {
                    "x-nxopen-api-key": api_key,
                }
            });
            const itemData = await response.json();
            setItemData(itemData);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (ocid) {
            itemFetch(ocid);
        }
    }, [ocid]);

    const handlePresetClick = (index) => {
        setPresetIndex(index); // 선택된 프리셋 인덱스 업데이트
    }

    const currentPresetData = itemData[`item_equipment_preset_${presetIndex}`] || itemData.item_equipment;

    return (
        <>
            {itemData && Object.keys(itemData).length > 0 ? (
                <div className="character_data_box character_item_content_box">
                    <div className="character_item_preset_index">
                        <ul className="character_item_preset_list">
                            {['프리셋1', '프리셋2', '프리셋3'].map((preset, index) => (
                                <li key={index}
                                    onClick={() => handlePresetClick(index + 1)}
                                    className={presetIndex === index + 1 ? "selected" : ""}>
                                    <span>{preset}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="character_item_data_box">
                        {currentPresetData.map((item, index) => (
                            <div key={index} className="character_item_data">
                                <div className="character_item_data_top_box">
                                    <div className="character_item_icon">
                                        <img src={item.item_icon} alt="아이템 이미지"/>
                                    </div>
                                    <div className="character_data_item_info">
                                        <div className="character_item_equipment_part">{item.item_equipment_part}</div>
                                        <div className="character_item_name">{item.item_name}</div>
                                        {item.starforce > 0 && (
                                        <div className="character_item_starforce">
                                            <TbStarFilled className="starforce_icon"/>{item.starforce}
                                        </div>
                                        )}
                                    </div>
                                </div>
                                { (item.potential_option_1 || item.potential_option_2 || item.potential_option_3 || item.additional_potential_option_1 || item.additional_potential_option_2 || item.additional_potential_option_3) && (
                                    <div className="character_item_data_bottom_box">
                                        { (item.potential_option_1 || item.potential_option_2 || item.potential_option_3) && (
                                            <div className={`
                                            character_item_option ${item.potential_option_grade === '레전드리' ? 'legendary' 
                                            : item.potential_option_grade === '유니크' ? 'unique' 
                                            : item.potential_option_grade === '에픽' ? 'epic' 
                                            : 'rare'}`}>
                                                <div>잠재</div>
                                                {item.potential_option_1 && <div>{item.potential_option_1}</div>}
                                                {item.potential_option_2 && <div>{item.potential_option_2}</div>}
                                                {item.potential_option_3 && <div>{item.potential_option_3}</div>}
                                            </div>
                                        )}
                                        { (item.additional_potential_option_1 || item.additional_potential_option_2 || item.additional_potential_option_3) && (
                                            <div className={`
                                            character_item_additional_option ${item.additional_potential_option_grade === '레전드리' ? 'legendary'
                                            : item.additional_potential_option_grade === '유니크' ? 'unique'
                                            : item.additional_potential_option_grade === '에픽' ? 'epic'
                                            : 'rare'}`}>
                                                <div>에디</div>
                                                {item.additional_potential_option_1 && <div>{item.additional_potential_option_1}</div>}
                                                {item.additional_potential_option_2 && <div>{item.additional_potential_option_2}</div>}
                                                {item.additional_potential_option_3 && <div>{item.additional_potential_option_3}</div>}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>검색 결과가 없습니다.</div>
            )}
        </>
    )
}

export default Item;