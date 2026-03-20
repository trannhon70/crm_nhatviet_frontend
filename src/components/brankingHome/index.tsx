import { Badge, Col } from "antd";
import { FC, Fragment } from "react";
import { FaCrown } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoStar } from "react-icons/io5";

interface IProps {
    color?: string,
    data?: any,
    text?: string
}

const BrankingHome: FC<IProps> = (props) => {
    const { color, data, text } = props

    const getIconByRank = (stt: number) => {
        switch (stt) {
            case 1:
                return <FaCrown color="red" size={20} />;
            case 2:
                return <FaSun color="red" size={20} />;
            case 3:
                return <BsMoonStarsFill color="red" size={20} />;
            case 4:
                return <IoStar color="red" size={20} />;
            default:
                return <IoStar color="red" size={20} />;
        }
    };

    return <Fragment>
        <Col span={5} xs={24} sm={12} md={12} lg={10} xl={8} xxl={5}>
            <Badge.Ribbon color={color} text={text}>

                <Col span={24} className="rounded border-green-700 border  ">
                    <div className="mt-7 bg-slate-200" >
                        {
                            data?.length > 0 && data?.map((item: any) => {
                                return <div key={item.stt} className="flex items-center justify-around p-2   font-medium " >
                                    <div>{getIconByRank(item.stt)}</div>
                                    <div>{item.userName}</div>
                                    <div>{item.count}</div>
                                </div>
                            })
                        }

                    </div>
                </Col>
            </Badge.Ribbon>
        </Col>
    </Fragment>
}

export default BrankingHome