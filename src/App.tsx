
import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/layout';
import { AuthContext } from './context/AuthContext';
import AgeStatistics from './pages/dataReport/ageStatistics';
import CustomerService from './pages/dataReport/customerService';
import Gender from './pages/dataReport/gender';
import HospitalizationStatus from './pages/dataReport/hospitalizationStatus';
import MediaSource from './pages/dataReport/mediaSource';
import Receptionist from './pages/dataReport/receptionist';
import StatisticsByDisease from './pages/dataReport/statisticsByDisease';
import SummaryReport from './pages/dataReport/summaryReport';
import Error from './pages/error';
import Home from './pages/home';
import HospitalList from './pages/hospitalList';
import CreateHospotal from './pages/hospitalList/createHospotal';
import Login from './pages/login';
import ActivityLog from './pages/operationHistory/activityLog';
import LogErrorLog from './pages/operationHistory/logErrorLog';
import AppointmentRegistrationList from './pages/patientAppointmentManagement/appointmentRegistrationList';
import CreateAppointmentRegistrationList from './pages/patientAppointmentManagement/appointmentRegistrationList/create';
import AppointmentRegistrationListHistory from './pages/patientAppointmentManagement/appointmentRegistrationListHistory';
import CurrentTrendReport from './pages/patientAppointmentManagement/currentTrendReport';
import CustomerServiceDetailReport from './pages/patientAppointmentManagement/customerServiceDetailReport';
import CustomGraphicalReports from './pages/patientAppointmentManagement/customGraphicalReports';
import ExportPatientData from './pages/patientAppointmentManagement/exportPatientData';
import OperationHistory from './pages/patientAppointmentManagement/operationHistory';
import PeopleManagement from './pages/peopleManagement';
import CreatePeople from './pages/peopleManagement/createPeople';
import ProfileUser from './pages/profile';
import ChangePassword from './pages/profile/changePassword';
import DepartmentManagement from './pages/settings/departmentManagement';
import CreateDepartment from './pages/settings/departmentManagement/createDepartment';
import DiseaseManagement from './pages/settings/diseaseManagement';
import CreateDiseaseManagement from './pages/settings/diseaseManagement/create';
import DoctorManagement from './pages/settings/doctorManagement';
import CreateDocTor from './pages/settings/doctorManagement/create';
import CreateSearchEngine from './pages/settings/searchEngine/createSearchEngine';
import SearchEngine from './pages/settings/searchEngine/searchEngine';
import CreateRight from './pages/systemManagement/createRight';
import RightsManagement from './pages/systemManagement/rightsManagement';
import CustomerDeleted from './pages/customerDeleted';
import PhonBlackList from './pages/phonBlackList';
import RegionalReport from './pages/dataReport/regionalReport';


const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const App: React.FC = () => {
  const { setAuthenticated } = useContext(AuthContext);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, [setAuthenticated]);




  return (

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<LayoutComponent />} >
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<ProfileUser />} />
          <Route path='/quan-ly-quyen' element={<RightsManagement />} />
          <Route path='/quan-ly-quyen/them-moi' element={<CreateRight />} />
          <Route path='/quan-ly-quyen/cap-nhat/:id' element={<CreateRight />} />

          <Route path='/danh-sach-benh-vien' element={<HospitalList />} />
          <Route path='/danh-sach-benh-vien/them-moi' element={<CreateHospotal />} />
          <Route path='/danh-sach-benh-vien/cap-nhat/:id' element={<CreateHospotal />} />

          <Route path='/quan-ly-con-nguoi' element={<PeopleManagement />} />
          <Route path='/quan-ly-con-nguoi/them-moi' element={<CreatePeople />} />
          <Route path='/quan-ly-con-nguoi/cap-nhat/:id' element={<CreatePeople />} />

          {/* quản lý cuộc hẹn bệnh nhân */}
          <Route path='/danh-sach-dang-ky-hen' element={<AppointmentRegistrationList />} />
          <Route path='/danh-sach-dang-ky-hen/view/:id' element={<AppointmentRegistrationListHistory />} />
          <Route path='/danh-sach-dang-ky-hen/history/:id' element={<OperationHistory />} />
          <Route path='/danh-sach-dang-ky-hen/them-moi' element={<CreateAppointmentRegistrationList />} />
          <Route path='/danh-sach-dang-ky-hen/cap-nhat/:id' element={<CreateAppointmentRegistrationList />} />

          <Route path='/bao-cao-chi-tiet-dich-vu-khach-hang' element={<CustomerServiceDetailReport />} />
          <Route path='/bao-cao-xu-huong-hang-thang' element={<CurrentTrendReport />} />
          <Route path='/xuat-du-lieu-benh-nhan' element={<ExportPatientData />} />
          <Route path='/bao-cao-do-hoa-tuy-chinh' element={<CustomGraphicalReports />} />

          <Route path='/thay-doi-mat-khau' element={<ChangePassword />} />

          {/* báo cáo dữ liệu */}
          <Route path='/bao-cao-tong-hop' element={<SummaryReport />} />
          <Route path='/thong-ke-gioi-tinh' element={<Gender />} />
          <Route path='/thong-ke-tuoi' element={<AgeStatistics />} />
          <Route path='/thong-ke-theo-benh' element={<StatisticsByDisease />} />
          <Route path='/thong-ke-theo-nguon-truyen-thong' element={<MediaSource />} />
          <Route path='/thong-ke-theo-tinh-trang-nhap-vien' element={<HospitalizationStatus />} />
          <Route path='/thong-ke-theo-bac-si' element={<Receptionist />} />
          <Route path='/thong-ke-theo-dich-vu-khach-hang' element={<CustomerService />} />
          <Route path='/bao-cao-khu-vuc' element={<RegionalReport />} />

          {/* cài đặt */}
          <Route path='/thiet-lap-benh-tat' element={<DiseaseManagement />} />
          <Route path='/thiet-lap-benh-tat/them-moi' element={<CreateDiseaseManagement />} />
          <Route path='/thiet-lap-benh-tat/cap-nhat/:id' element={<CreateDiseaseManagement />} />

          <Route path='/thiet-lap-bac-si' element={<DoctorManagement />} />
          <Route path='/thiet-lap-bac-si/them-moi' element={<CreateDocTor />} />
          <Route path='/thiet-lap-bac-si/cap-nhat/:id' element={<CreateDocTor />} />

          <Route path='/quan-ly-khoa' element={<DepartmentManagement />} />
          <Route path='/quan-ly-khoa/them-moi' element={<CreateDepartment />} />
          <Route path='/quan-ly-khoa/cap-nhat/:id' element={<CreateDepartment />} />

          <Route path='/cong-cu-tim-kiem' element={<SearchEngine />} />
          <Route path='/cong-cu-tim-kiem/them-moi' element={<CreateSearchEngine />} />
          <Route path='/cong-cu-tim-kiem/cap-nhat/:id' element={<CreateSearchEngine />} />

          {/* lịch sử thao tác */}
          <Route path='/nhat-ky-hoat-dong' element={<ActivityLog />} />
          <Route path='/nhat-ky-loi-dang-nhap' element={<LogErrorLog />} />
          <Route path='/danh-sach-khach-hang-bi-xoa' element={<CustomerDeleted />} />
          <Route path='/danh-sach-den' element={<PhonBlackList />} />

        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

export default App;