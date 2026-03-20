import { Badge, Button, Dropdown, Modal, Table, TableProps, Tag } from "antd";
import { FC, Fragment, useEffect, useState } from "react";

import moment from 'moment';
import "moment/locale/vi"; // Import ngôn ngữ tiếng Việt
import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getPagingNotication } from "../../features/noticationSlice";
import { noticationAPI } from "../../apis/nitication.api";
import useClipboard from "../../hooks/useClipboard";
moment.locale("vi");


const Notication: FC = () => {
    const notication = useSelector((state: RootState) => state?.notication);
    const dispatch = useDispatch<AppDispatch>();
    const [pageSize, setPageSize] = useState<number>(100);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const hospitalId = localStorage.getItem('hospitalId');
    const [dataModal, setDataModal] = useState<any>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { copyToClipboard } = useClipboard()
    const query = {
        pageSize: pageSize,
        pageIndex: pageIndex,
        hospitalId: hospitalId
    }
    useEffect(() => {

        setTimeout(() => {
            if (hospitalId) {
                dispatch(getPagingNotication(query))
            }
        }, 1000)
    }, [hospitalId])

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                // console.log('aaaa');

                dispatch(getPagingNotication(query))
                // window.location.reload(); 
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onClickModal = async (value: any) => {
        setDataModal([value?.patient])
        setIsModalOpen(true);
        const result = await noticationAPI.updateStatus(value?.id, { status: 1 })
        if (result.data.statusCode === 1) {
            dispatch(getPagingNotication(query))
        }
    }

    const onclickCopy = (value: any) => {
        copyToClipboard(`Nội dung tư vấn: ${value.content}`)
    }


    const columns: TableProps<any>['columns'] = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
            render: (_, decord, index) => <Button onClick={() => onclickCopy(decord)} variant="solid" color="danger" >Copy</Button>,
            width: 80,
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <>{text}</>,
            width: 200,
        },
        {
            title: 'chi phí',
            dataIndex: 'money',
            key: 'money',
            render: (value, record, index) => <div  >{value}</div>,
            width: 100,
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render(value, record, index) {

                return {
                    children: <Tag style={{ textTransform: "uppercase" }} color="processing" >{value}</Tag>,

                }
            },
            width: 150,
        },
        {
            title: 'Tuổi',
            dataIndex: 'yearOld',
            key: 'yearOld',
            width: 100,
            render(value, record, index) {

                return {
                    children: <div  >{value}</div>,

                }
            },
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
            render(value, record, index) {

                return {
                    children: <div  >{value}</div>,

                }
            },
        },
        {
            title: 'Mã chuyên gia',
            dataIndex: 'code',
            key: 'code',
            width: 150,
            render(value, record, index) {

                return {
                    children: <div  >{value}</div>,

                }
            },
        },
        {
            title: 'khoa',
            dataIndex: 'department',
            key: 'department',
            render(value, record, index) {

                return {
                    children: <div style={{ textTransform: "uppercase" }} >{value?.name}</div>,

                }
            },
            width: 150,
        },
        {
            title: 'Bệnh',
            dataIndex: 'diseases',
            key: 'diseases',
            render(value, record, index) {

                return {
                    children: <div style={{ textTransform: "uppercase" }} >{value?.name}</div>,

                }
            },
            width: 250,
        },
        {
            title: 'Nguồn đến',
            dataIndex: 'media',
            key: 'media',
            render(value, record, index) {

                return {
                    children: <div style={{ textTransform: "uppercase" }} >{value?.name}</div>,

                }
            },
            width: 150,

        },
        {
            title: 'tỉnh/TP',
            dataIndex: 'city',
            key: 'city',
            render(value, record, index) {

                return {
                    children: <div style={{ textTransform: "uppercase" }} >{value?.name}</div>,

                }
            },
            width: 150,
        },
        {
            title: 'Quận/huyện',
            dataIndex: 'district',
            key: 'district',
            render(value, record, index) {

                return {
                    children: <div style={{ textTransform: "uppercase" }} >{value?.name}</div>,

                }
            },
            width: 150,
        },


        {
            title: 'Thời gian hẹn',
            key: 'appointmentTime',
            dataIndex: 'appointmentTime',
            render(value, record, index) {

                return {
                    children: <div >{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</div >,
                }
            },
            width: 150,
        },
        {
            title: 'Thời gian nhắc hẹn',
            key: 'reminderTime',
            dataIndex: 'reminderTime',
            width: 150,
            render(value, record, index) {
                return {
                    children: <div >{value !== 0 ? moment(value * 1000).format('DD-MM-YYYY HH:mm:ss') : ''}</div>,
                }
            },
        },
        {
            title: 'Link URL',
            dataIndex: 'note',
            key: 'note',
            render(value, record, index) {
                return {
                    children: <div  >{value}</div>,
                }
            },
            width: 150,
        },
        {
            title: 'Sửa thời gian đăng ký',
            dataIndex: 'editregistrationTime',
            key: 'editregistrationTime',
            render(value, record, index) {
                return {
                    children: <div  >{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</div  >,
                }
            },
            width: 160,
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctor',
            key: 'doctor',
            render(value, record, index) {
                return {
                    children: <div style={{ textTransform: "uppercase" }} >{value?.name}</div>,
                }
            },
            width: 150,
        },
        {
            title: 'Tình trạng cuộc hẹn',
            dataIndex: 'status',
            key: 'status',
            render(value, record, index) {
                // Đảm bảo `children` không hiển thị khi `colSpan` là `0`
                const children = (() => {
                    if (value === 'CHỜ ĐỢI') {
                        return <Tag style={{ textTransform: "uppercase" }} color="magenta">{value}</Tag>;
                    } else if (value === 'ĐÃ ĐẾN') {
                        return <Tag style={{ textTransform: "uppercase" }} color="green">{value}</Tag>;
                    } else if (value === 'CHƯA ĐẾN') {
                        return <Tag style={{ textTransform: "uppercase" }} color="#1613cf">{value}</Tag>;
                    } else if (value === 'KHÔNG XÁC ĐỊNH') {
                        return <Tag style={{ textTransform: "uppercase" }} color="red">{value}</Tag>;
                    }
                    return null;
                })();

                return {
                    children,
                };

            },
            width: 150,
        },
        {
            title: 'Người thêm',
            dataIndex: 'user',
            key: 'user',
            render(value, record, index) {
                return {
                    children: <div style={{ textTransform: "uppercase" }} >{value?.fullName}</div>,
                }
            },
            width: 150,
        },

        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            render(value, record, index) {

                return {
                    children: <div >{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</div >,
                }
            },
            width: 150,
        },
    ];

    const onClickCheckAll = async () => {
        const body = notication.data
            .filter((it: any) => it.status === 0)
            .map((item: any) => ({ id: item.id }));
        const result = await noticationAPI.checkAllNotication(body)
        if (result.data.statusCode === 1) {
            dispatch(getPagingNotication(query))
        }
    }

    return <Fragment>

        <Dropdown
            menu={{ items: notication?.data }}
            trigger={['click']}
            placement="bottomRight"
            dropdownRender={(menu: any) => {
                return <div className="bg-slate-100 rounded"  >

                    <Button disabled={notication?.data.every((item: any) => item.status === 1)} onClick={onClickCheckAll} className="mb-1" color="primary" variant="solid">
                        Đã xem tất cả
                    </Button>
                    <div className='scroll__Dropdown  ' style={{ maxHeight: '250px', overflowY: 'auto', minWidth: '250px' }}>
                        {
                            menu?.props?.items?.length > 0 && menu?.props?.items?.map((item: any, index: number) => {
                                return <div onClick={() => onClickModal(item)} key={index} className={`py-[5px] px-[10px] hover:bg-orange-600 hover:text-white cursor-pointer flex items-center justify-between ${item.status === 0 ? 'bg-orange-500 text-white' : ''} gap-2`} >
                                    <div>
                                        {item?.patient?.name}
                                    </div>
                                    <div>
                                        {moment(item?.created_at * 1000).fromNow()}
                                    </div>
                                </div>
                            })
                        }

                    </div>

                </div>
            }}
        >
            <Badge className='cursor-pointer' count={notication?.totalStatus || 0}>
                <IoMdNotifications className='text-orange-500' size={30} />
            </Badge>
        </Dropdown>

        <Modal width={1000} open={isModalOpen} onOk={handleOk} footer={false} onCancel={handleCancel}>
            <Table<any> columns={columns} dataSource={dataModal || []} pagination={false} size="middle" bordered className="mt-5" scroll={{ x: 800 }} tableLayout="fixed" />
        </Modal>
    </Fragment>
}

export default Notication