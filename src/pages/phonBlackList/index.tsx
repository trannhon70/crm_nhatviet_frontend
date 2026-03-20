import { FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";
import { getPagingPatientDetele } from "../../features/patientSlice";
import { Button, Form, FormProps, Input, Modal, Table, TableProps, Tag } from "antd";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { Link } from "react-router-dom";
import moment from "moment";
import NotHospital from "../../components/notHospital";
import TableComponent from "../../components/tableComponent";
import { MdOutlinePreview } from "react-icons/md";
import { fetchGetPaging } from "../../features/phoneBlackListSlice";
import { BlackListAPI } from "../../apis/blackList.api";
import { toast } from "react-toastify";
import PopconfirmComponent from "../../components/popconfirmComponent";

const scrollProps = {
    x: 'calc(700px + 50%)',
    y: 130 * 5
};

type FieldType = {
    phone?: string;

};

const PhonBlackList: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [form] = Form.useForm();
    const { data, total } = useSelector((state: RootState) => state.blackList);
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(25)
    const [query, setQuery] = useState<any>({
        pageSize: pageSize,
        pageIndex: pageIndex
    }
    )
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        try {
            const result = await BlackListAPI.create(values);
            if (result.data.statusCode === 1) {
                toast.success(`thêm mới thành công`)
                form.resetFields();
                dispatch(fetchGetPaging(query));

            }
        } catch (error) {
            console.log(error);

        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {

        dispatch(fetchGetPaging(query))
    }, [dispatch, pageIndex, pageSize, query])

    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }

    const columns: TableProps<any>['columns'] = [
        {
            title: "STT",
            dataIndex: 'STT',
            key: 'STT',
            render: (_, record, index) => {
                return <>{index + 1}</>
            },
        },
        {
            title: "Số điện thoại",
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: "Người thêm",
            key: 'user',
            dataIndex: 'user',
            render: (value) => {
                return <>{value?.fullName}</>
            },
        },

        {
            title: "Thời gian thêm",
            key: 'created_at',
            dataIndex: 'created_at',
            render: (value) => {
                return <>{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</>
            },
        },

        {
            title: "Thao tác",
            key: 'id',
            dataIndex: 'id',
            render: (_, record, index) => {
                return <>
                    <PopconfirmComponent
                        title={<>Xóa điện thoại {record.phone}</>}
                        description={`Bạn có chắc chắn là muốn xóa số điện thoại này!`}
                        value={_}
                        deleteRole={deleteBlackList}
                    />
                </>
            },
        },
    ];

    const deleteBlackList =async (value: any) => {
        try {
            const result = await BlackListAPI.deleteBlackList(Number(value));
            if (result.data.statusCode === 1) {
                toast.success(`Xóa thành công`)
                dispatch(fetchGetPaging(query));
            }
        } catch (error) {
            console.log(error);
        }
    }
    const dataBreadcrumb = [
        {
            title: "Danh sách đen",
        },
    ];


    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className="flex items-center justify-end w-full" >
            <Button type="primary" onClick={showModal}>
                Thêm mới
            </Button>
        </div>

        <div className="mt-2">
            <TableComponent rowKey={false} columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} scroll={scrollProps} />
        </div>
        <Modal title="Thêm số điện thoại" open={isModalOpen} footer={false} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Điện thoại không được bỏ trống!' }]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item className="text-right" label={null}>
                    <Button className="mr-2" type="primary" htmlType="submit">
                        Thêm mới
                    </Button>
                    <Button type="dashed" onClick={handleCancel} >
                        Thoát
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </Fragment>
}

export default PhonBlackList