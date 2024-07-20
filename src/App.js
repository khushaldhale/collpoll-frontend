// import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import AdminDashBoard from './components/dashboard/AdminDashBoard';
import Category from './components/categories/Category';
import AddCategory from './components/categories/AddCategory';
import UpdateCategory from './components/categories/UpdateCategory';
import NavBar from './pages/NavBar';
import Courses from './components/courses/Courses';
import AddCourse from './components/courses/AddCourse';
import UpdateCourse from './components/courses/UpdateCourse';
import Subject from './components/subjects/Subject';
import AddSubject from './components/subjects/AddSubject';
import UpdateSubject from './components/subjects/UpdateSubject';
import Topics from './components/topics/Topics';
import UpdateTopic from './components/topics/UpdateTopic';
import AddTopic from './components/topics/AddTopic';
import Lab from './components/labs/Lab';
import AddLab from './components/labs/AddLab';
import CounsellorDashBoard from './components/dashboard/CounsellorDashBoard';
import PendingCounselling from './components/counselling/PendingCounselling';
import StudentRegister from './components/auth/StudentRegister';
import InstructoBatches from './components/instructor/batches/InstructoBatches';
import StudentsByBatch from './components/instructor/batches/StudentsByBatch';
import BatchAllocation from './components/instructor/batches/BatchAllocation';
import StudyMaterial from './components/instructor/studyMaterial/StudyMaterial';
import UploadStudyMaterial from './components/instructor/studyMaterial/UploadStudyMaterial';
import Batches from './components/batches/Batches';
import AddBatch from './components/batches/AddBatch';
import UpdateBatch from './components/batches/UpdateBatch';
import InstructorDashBoard from './components/dashboard/InstructorDashBoard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/student" element={<StudentRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/admin" element={<AdminDashBoard />}>
            <Route path="categories" element={<Category />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="categories/:categoryId/update" element={<UpdateCategory />} />
            <Route path='categories/:categoryId/courses' element={<Courses></Courses>}></Route>
            <Route path='categories/:categoryId/courses/add' element={<AddCourse></AddCourse>}></Route>
            <Route path='categories/:categoryId/courses/:courseId/update' element={<UpdateCourse></UpdateCourse>}></Route>
            <Route path='categories/:categoryId/courses/:courseId/sub' element={<Subject></Subject>}></Route>
            <Route path='categories/:categoryId/courses/:courseId/sub/add' element={<AddSubject></AddSubject>}></Route>
            <Route path='categories/:categoryId/courses/:courseId/sub/:subjectId/update' element={<UpdateSubject></UpdateSubject>}></Route>
            <Route path='categories/:categoryId/courses/:courseId/sub/:subjectId/topics' element={<Topics></Topics>}></Route>
            <Route path='categories/:categoryId/courses/:courseId/sub/:subjectId/topics/:topicId/update' element={<UpdateTopic></UpdateTopic>}></Route>
            <Route path='categories/:categoryId/courses/:courseId/sub/:subjectId/topics/add' element={<AddTopic></AddTopic>}></Route>
            <Route path='labs' element={<Lab></Lab>}></Route>
            <Route path='labs/add' element={<AddLab></AddLab>}></Route>
            {/*  routes for batches  */}
            <Route path='labs/:labId/batches' element={<Batches></Batches>}></Route>
            <Route path='labs/:labId/batches/add' element={<AddBatch></AddBatch>}></Route>
            <Route path='labs/:labId/batches/:batchId/update' element={<UpdateBatch></UpdateBatch>}></Route>
          </Route>
          <Route path='/dashboard/counsellor' element={<CounsellorDashBoard></CounsellorDashBoard>}>
            <Route path='pending/counselling' element={<PendingCounselling></PendingCounselling>}></Route>
          </Route>
          <Route path='/dashboard/instructor' element={<InstructorDashBoard></InstructorDashBoard>}>
            {/* running batches ans dtudents in it   */}
            <Route path='batches' element={<InstructoBatches></InstructoBatches>}> </Route>
            <Route path='batches/:batchId/students' element={<StudentsByBatch></StudentsByBatch>}> </Route>
            {/* batch allocation to students  */}
            <Route path='batches/allocation' element={<BatchAllocation></BatchAllocation>}> </Route>
            {/* study Material */}
            {/* it will show all the batches to upload study material, conditional rendering done */}
            <Route path='batches/study' element={<InstructoBatches></InstructoBatches>}> </Route>
            {/*  showing study material for all particular batch */}
            <Route path='batches/:batchId/study' element={<StudyMaterial></StudyMaterial>}> </Route>
            {/* upload study material for particular batch */}
            <Route path='batches/:batchId/study/upload' element={<UploadStudyMaterial></UploadStudyMaterial>}> </Route>
            {/*  attendance routes  */}
            {/*  conditional rendering here as well  */}
            <Route path='batches/attendance' element={<InstructoBatches></InstructoBatches>}> </Route>
            <Route path='batches/:batchId/students/attendance' element={<StudentsByBatch></StudentsByBatch>}> </Route>
          </Route>
        </Routes>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
}
export default App;