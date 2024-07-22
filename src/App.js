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
import CreatePassword from './components/auth/CreatePassword';
import StudentDashBoard from './components/dashboard/StudentDashBoard';
import CourseEnrolled from './components/student/CourseEnrolled';
import BatchAllocated from './components/student/BatchAllocated';
import StudentStudyMaterial from './components/student/StudentStudyMaterial';
import CounsellorPerformance from './components/counselling/CounsellorPerformance';
import Attendance from './components/instructor/attendance/Attendance';
import AllStudents from './components/student/AllStudents';
import AllEmployees from './components/admin/AllEmployees';
import Feedback from './components/student/feedback/Feedback';
import InstructorFeedback from './components/admin/InstructorFeedback';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/student" element={<StudentRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path='/student/create-password' element={<CreatePassword></CreatePassword>}></Route>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/admin" element={<AdminDashBoard />}>
            <Route path="categories" element={<Category />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="categories/:categoryId/update" element={<UpdateCategory />} />
            <Route path="categories/:categoryId/courses" element={<Courses />} />
            <Route path="categories/:categoryId/courses/add" element={<AddCourse />} />
            <Route path="categories/:categoryId/courses/:courseId/update" element={<UpdateCourse />} />
            <Route path="categories/:categoryId/courses/:courseId/sub" element={<Subject />} />
            <Route path="categories/:categoryId/courses/:courseId/sub/add" element={<AddSubject />} />
            <Route path="categories/:categoryId/courses/:courseId/sub/:subjectId/update" element={<UpdateSubject />} />
            <Route path="categories/:categoryId/courses/:courseId/sub/:subjectId/topics" element={<Topics />} />
            <Route path="categories/:categoryId/courses/:courseId/sub/:subjectId/topics/:topicId/update" element={<UpdateTopic />} />
            <Route path="categories/:categoryId/courses/:courseId/sub/:subjectId/topics/add" element={<AddTopic />} />
            <Route path="labs" element={<Lab />} />
            <Route path="labs/add" element={<AddLab />} />
            <Route path="labs/:labId/batches" element={<Batches />} />
            <Route path="labs/:labId/batches/add" element={<AddBatch />} />
            <Route path="labs/:labId/batches/:batchId/update" element={<UpdateBatch />} />
            <Route path='students' element={<AllStudents></AllStudents>}></Route>
            <Route path='employees' element={<AllEmployees></AllEmployees>}></Route>
            <Route path='instructor/feedbacks' element={<InstructorFeedback></InstructorFeedback>}></Route>

          </Route>
          <Route path="/dashboard/counsellor" element={<CounsellorDashBoard />}>
            <Route path="pending/counselling" element={<PendingCounselling />} />
            <Route path="performance" element={<CounsellorPerformance />} />

          </Route>
          <Route path="/dashboard/instructor" element={<InstructorDashBoard />}>
            <Route path="batches" element={<InstructoBatches />} />
            <Route path="batches/:batchId/students" element={<StudentsByBatch />} />
            <Route path="batches/allocation" element={<BatchAllocation />} />
            <Route path="batches/study" element={<InstructoBatches />} />
            <Route path="batches/:batchId/study" element={<StudyMaterial />} />
            <Route path="batches/:batchId/study/upload" element={<UploadStudyMaterial />} />
            <Route path="batches/attendance" element={<InstructoBatches />} />
            <Route path="batches/:batchId/students/attendance" element={<StudentsByBatch />} />
            <Route path='attendance' element={<InstructoBatches></InstructoBatches>}></Route>
          </Route>


          <Route path='/dashboard/student' element={<StudentDashBoard></StudentDashBoard>}>
            <Route path='enrolled-courses' element={<CourseEnrolled></CourseEnrolled>}></Route>
            <Route path='batch-allocated' element={<BatchAllocated></BatchAllocated>}></Route>
            <Route path='study-material' element={<StudentStudyMaterial></StudentStudyMaterial>}></Route>
            <Route path='feedbacks' element={<Feedback></Feedback>}></Route>
          </Route>





        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
