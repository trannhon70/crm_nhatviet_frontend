import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
} from "antd";
import moment from "moment";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import {
  useCheckRoleLeTan,
  useCheckRoleTuVan,
} from "../../../hooks/useCheckRole";
import useMenuData from "../../../hooks/useMenuData";
import { GENDER, STATUS } from "../../../utils";
interface IProps {
  formItemLayout: any;
  tailFormItemLayout: any;
  form: any;
  onFinish: any;
  patient: any;
  handleChangeDepartment: any;
  handleChangeCity: any;
  id: number;
  onOk: any;
  error: any;
  setError: any;
  onClickPrev: any;
  disease?: any;
  userId?: number;
}
const FormCreateUser: FC<IProps> = (props) => {
  const {
    formItemLayout,
    tailFormItemLayout,
    form,
    onFinish,
    patient,
    handleChangeDepartment,
    handleChangeCity,
    id,
    onOk,
    error,
    setError,
    onClickPrev,
    disease,
    userId,
  } = props;
  const { t } = useTranslation(["DSDangKyHen"]);
  const checkRoleTuVan = useCheckRoleTuVan();
  const checkRoleLeTan = useCheckRoleLeTan();
  const menu = useMenuData();
  console.log(checkRoleLeTan, 'checkRoleLeTan');
  console.log(id, 'id');

  // thực hiện check chỉ có tài khoản admin và connieleung mới có quyền chỉnh sửa khi bệnh nhân đã đến
  // danh sách admin, connie, hoàng phương
  const lockedUsers = [4, 54, 68];
  const checkButton = id && patient?.patient?.status === "ĐÃ ĐẾN" ? lockedUsers.includes(userId ?? -1) ? false : true : false;

  return (
    <Fragment>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        size="middle"
        variant="filled"
        className="flex w-[100%] "
      >
        <div className="w-[50%] border-solid border-2 border-indigo-600 p-3 rounded-l  ">
          <div className="text-xl font-bold text-slate-600 mb-3 ">
            {" "}
            {t("DSDangKyHen:thong_tin_co_ban")} :{" "}
          </div>
          <Form.Item
            name="name"
            label={t("DSDangKyHen:ho_va_ten")}
            rules={[
              { required: true, message: t("DSDangKyHen:ho_va_ten_err") },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label={t("DSDangKyHen:gioi_tinh")}
            rules={[
              { required: true, message: t("DSDangKyHen:gioi_tinh_err") },
            ]}
          >
            <Select
              disabled={checkRoleLeTan}
              showSearch
              placeholder={t("DSDangKyHen:chon_gioi_tinh")}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={GENDER}
            />
          </Form.Item>
          <Form.Item
            name="yearOld"
            label={t("DSDangKyHen:nhap_tuoi")}
            rules={[{ required: true, message: t("DSDangKyHen:tuoi_err") }]}
          >
            <InputNumber disabled={checkRoleLeTan} style={{ width: "100%" }} />
          </Form.Item>
          {!checkRoleLeTan && (
            <Form.Item
              name="phone"
              label={t("DSDangKyHen:nhap_so_dien_thoai")}
              rules={[
                { required: true, message: t("DSDangKyHen:so_dien_thoai_err") },
              ]}
            >
              <Input
                onChange={(e) => setError({ ...error, phone: false })}
                status={error.phone === true ? "error" : ""}
                type="number"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}

          {!checkRoleLeTan && (
            <Form.Item name="content" label={t("DSDangKyHen:noi_dung_tu_van")}>
              <Input.TextArea rows={3} />
            </Form.Item>
          )}

          <Form.Item
            name="departmentId"
            label={t("DSDangKyHen:chon_khoa")}
            rules={[{ required: true, message: t("DSDangKyHen:khoa_err") }]}
          >
            <Select
              disabled={checkRoleLeTan}
              showSearch
              placeholder={`--${t("DSDangKyHen:chon_khoa")}--`}
              filterOption={(input, option) =>
                typeof option?.label === "string" &&
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={patient?.department.map((item: any) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
              onChange={handleChangeDepartment}
            />
          </Form.Item>
          <Form.Item
            name="diseasesId"
            label={t("DSDangKyHen:chon_benh")}
            rules={[{ required: true, message: t("DSDangKyHen:benh_err") }]}
          >
            <Select
              disabled={checkRoleLeTan}
              showSearch
              placeholder={`--${t("DSDangKyHen:chon_benh")}--`}
              filterOption={(input, option) =>
                typeof option?.label === "string" &&
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={disease.map((item: any) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            name="mediaId"
            label={t("DSDangKyHen:nguon_den")}
            rules={[
              { required: true, message: t("DSDangKyHen:nguon_den_err") },
            ]}
          >
            <Select
              disabled={checkRoleLeTan}
              showSearch
              placeholder={`--${t("DSDangKyHen:nguon_den")}--`}
              filterOption={(input, option) =>
                typeof option?.label === "string" &&
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={patient.media.map((item: any) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            name="cityId"
            label={t("DSDangKyHen:tinh/TP")}
            rules={[{ required: true, message: t("DSDangKyHen:tinh/TP_err") }]}
          >
            <Select
              disabled={checkRoleLeTan}
              showSearch
              placeholder={`--${t("DSDangKyHen:chon_tinh/tp")}--`}
              filterOption={(input, option) =>
                typeof option?.label === "string" &&
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={
                patient.loading === "succeeded" &&
                patient.city.map((item: any) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })
              }
              onChange={handleChangeCity}
            />
          </Form.Item>
          <Form.Item name="districtId" label={t("DSDangKyHen:quan/huyen")}>
            <Select
              disabled={checkRoleLeTan}
              showSearch
              placeholder={`--${t("DSDangKyHen:chon_quan/huyen")}--`}
              filterOption={(input, option) =>
                typeof option?.label === "string" &&
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={patient.district.map((item: any) => {
                return {
                  value: item.id,
                  label: item.full_name,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            name="code"
            label={t("DSDangKyHen:ma_chuyen_gia")}
            rules={[
              { required: true, message: t("DSDangKyHen:ma_chuyen_gia_err") },
            ]}
          >
            <Input disabled={checkRoleLeTan} />
          </Form.Item>
          {id && !checkRoleLeTan ? (
            <Form.List name="treatment">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...formItemLayout}
                      label={`${index === 0 ? t("DSDangKyHen:muc_dieu_tri") : ""
                        } `}
                      required={false}
                      key={field.key}
                      colon={index === 0 ? true : false}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        noStyle
                      >
                        <Input placeholder="" style={{ width: "60%" }} />
                      </Form.Item>
                      {fields?.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      {t("DSDangKyHen:them_muc_dieu_tri")}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          ) : (
            ""
          )}
        </div>
        {/* right */}
        <div className="w-[50%] border-solid border-2 border-indigo-600 p-3 rounded-r ">
          <Form.Item
            name="appointmentTime"
            label={t("DSDangKyHen:thoi_gian_hen")}
            rules={[
              { required: true, message: t("DSDangKyHen:thoi_gian_hen_err") },
            ]}
          >
            <DatePicker
              disabled={checkRoleLeTan}
              placeholder={`--${t("DSDangKyHen:chon_thoi_gian_hen")}--`}
              showTime
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={onOk}
            />
          </Form.Item>
          {/* <Form.Item label={t("DSDangKyHen:luu_y")}>
                    <Alert message={t("DSDangKyHen:thoi_gian_nhac_hen_phai_nho_hon_thoi_gian_hen")} type="warning" />
                </Form.Item> */}
          <Form.Item
            name="reminderTime"
            label={t("DSDangKyHen:thoi_gian_nhac_hen")}
            rules={
              !id
                ? [
                  {
                    required: true,
                    message: t("DSDangKyHen:thoi_gian_nhac_hen_err"),
                  },
                ]
                : []
            }
          // validateStatus={error.reminderTime ? "error" : ""}
          // help={error.reminderTime}
          >
            <DatePicker
              placeholder={t("DSDangKyHen:chon_thoi_gian_nhac_hen")}
              showTime
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
                setError({
                  ...error,
                  reminderTime: false,
                });
              }}
              onOk={onOk}
            />
          </Form.Item>
          {!checkRoleLeTan && (
            <Form.Item name="note" label={t("DSDangKyHen:link_url")}>
              <Input.TextArea rows={3} />
            </Form.Item>
          )}

          <div className="text-xl font-bold text-slate-600 mb-3 ">
            {" "}
            {t("DSDangKyHen:den_kham_chua")} :{" "}
          </div>
          {/* {
                    !checkRoleLeTan && <Form.Item name="editregistrationTime" label={t("DSDangKyHen:sua_thoi_gian_dang_ky")} >
                    <DatePicker
                        placeholder={t("DSDangKyHen:chon_thoi_gian_sua_doi")}
                        showTime
                        onChange={(value, dateString) => {
                            console.log('Selected Time: ', value);
                            console.log('Formatted Selected Time: ', dateString);
                        }}
                        onOk={onOk}
                    />
                </Form.Item>
                } */}

          <Form.Item name="status" label={t("DSDangKyHen:trang_thai")}>
            <Select
              disabled={(() => {
                if (checkRoleLeTan && patient.patient.status === "ĐÃ ĐẾN") {
                  return true;
                }
                return false;
              })()}
              showSearch
              placeholder={t("DSDangKyHen:trang_thai")}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={
                !checkRoleTuVan
                  ? STATUS()
                  : [
                    { id: "1", value: "CHỜ ĐỢI", label: "CHỜ ĐỢI" },
                    {
                      id: "4",
                      value: "KHÔNG XÁC ĐỊNH",
                      label: "KHÔNG XÁC ĐỊNH",
                    },
                  ]
              }
            />
          </Form.Item>
          {!checkRoleTuVan && (
            <Form.Item label={t("DSDangKyHen:luu_y")}>
              <Alert
                message={t(
                  "DSDangKyHen:khi_benh_nhan_toi_kham_moi_chon_bac_si_tiep_benh"
                )}
                type="warning"
              />
            </Form.Item>
          )}

          {!checkRoleTuVan && (
            <Form.Item
              name="doctorId"
              label={t("DSDangKyHen:bac_si_tiep_benh")}
            >
              <Select
                allowClear
                showSearch
                placeholder={`--${t("DSDangKyHen:lua_chon")}--`}
                filterOption={(input, option) =>
                  typeof option?.label === "string" &&
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                options={patient.doctor.map((item: any) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
              />
            </Form.Item>
          )}

          {menu?.[1].ds?.action_DSDKH?.money === true &&
            id &&
            !checkRoleLeTan ? (
            <Form.Item name="money" label={t("DSDangKyHen:chi_phi")}>
              <InputNumber className="w-[100%]" />
            </Form.Item>
          ) : (
            ""
          )}

          {id
            ? patient.patient.status === "ĐÃ ĐẾN" && (
              <>
                <div className="text-xl font-bold text-slate-600 mb-3 ">
                  {" "}
                  {t("DSDangKyHen:ho_so_tiep_nhan")} :{" "}
                </div>
                <Form.Item
                  name="record"
                  label={t("DSDangKyHen:noi_dung_tiep_nhan")}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              </>
            )
            : ""}
          {id && !checkRoleLeTan ? (
            <>
              <div className="text-xl font-bold text-slate-600 mb-3 ">
                {t("DSDangKyHen:ho_so_tham_kham_qua_dien_thoại")} :{" "}
              </div>

              {patient?.patient?.chatPatients &&
                patient?.patient?.chatPatients.length > 0 && (
                  <Form.Item label={t("DSDangKyHen:noi_dung_tham_kham")}>
                    {patient?.patient?.chatPatients.map(
                      (item: any, index: number) => {
                        return (
                          <div key={index} className="flex gap-2 mt-2 ">
                            <div>
                              {moment(item.created_at * 1000).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </div>
                            <div>
                              <Tag color="orange-inverse">
                                {item.user.fullName}
                              </Tag>
                            </div>
                            <div>{item.name}</div>
                          </div>
                        );
                      }
                    )}
                  </Form.Item>
                )}
              <Form.Item
                name="chat"
                label={t("DSDangKyHen:nhap_ho_so_tham_kham")}
              >
                <Input.TextArea rows={3} />
              </Form.Item>
            </>
          ) : (
            ""
          )}

          <Form.Item {...tailFormItemLayout}>
            <Button disabled={checkButton} type="primary" htmlType="submit">
              {id ? t("DSDangKyHen:cap_nhat") : t("DSDangKyHen:them_moi")}
            </Button>
            <Button className="ml-2" danger type="dashed" onClick={onClickPrev}>
              {t("DSDangKyHen:quay_lai")}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Fragment>
  );
};

export default FormCreateUser;
