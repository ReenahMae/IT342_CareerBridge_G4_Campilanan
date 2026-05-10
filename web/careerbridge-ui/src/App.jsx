import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import JobSeekerJobDetails from "./pages/JobSeekerJobDetails";
import Profile from "./pages/Profile";
import JobSeekerApplications from "./pages/JobSeekerApplications";
import JobSeekerCompanies from "./pages/JobSeekerCompanies";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerJobPosts from "./pages/employer/EmployerJobPosts";
import EmployerCreateJob from "./pages/employer/EmployerCreateJob";
import EmployerApplicants from "./pages/employer/EmployerApplicants";




function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<JobSeekerDashboard/>}/>
        <Route path="/jobs/:jobId" element={<JobSeekerJobDetails/>}/>
        <Route path="/companies" element={<JobSeekerCompanies/>}/>
        <Route path="/applications" element={<JobSeekerApplications/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/employer/dashboard"element={<EmployerDashboard />}/>
        <Route path="/employer/jobs"element={<EmployerJobPosts />}/>
        <Route path="/employer/jobs/create" element={<EmployerCreateJob />} />
<Route
  path="/employer/applicants"
  element={<EmployerApplicants />}
/>
      </Routes>

    </BrowserRouter>

  )
}

export default App;