import { useEffect, useState } from "react";
import { getPort } from "../../commonFunctions";
import InfoModal from "../../component/InfoModal";
import axios from "axios";
const Home = () => {
  const [path, setPath] = useState({ apiUrl: getPort() });
  const [infoMessage, setInfoMessage] = useState(null);

  useEffect(() => {
    const initialFunctionCall = async () => {
      await checkCompanyInfo();
    };
    initialFunctionCall();
  }, []);

  const checkCompanyInfo = async () => {
    try {
      const response = await axios.post(`${path.apiUrl}/checkCompanyInfo`, {
        registerEmailId: JSON.parse(sessionStorage["auth"])["email"],
      });
      if (!response.data.success) {
        setInfoMessage({
          modalOpen: true,
          message: "Please register your company in the Admin menu.",
          type: "error",
          userName: `${JSON.parse(sessionStorage["auth"])["firstName"]} 
            ${JSON.parse(sessionStorage["auth"])["lastName"]}`,
        });
      } else {
        sessionStorage.setItem("isCompanyInfo", true);
      }
    } catch (ex) {
      console.log("Error in checkCompanyInfo", ex);
    }
  };

  return (
    <>
      <main class="container py-5">
        <section class="text-center mb-5">
          <h1 class="display-4 fw-bold mb-3">Welcome to FlexCap</h1>
          <p class="lead mb-4">
            Streamline your bug tracking and project management with powerful
            collaboration tools.
          </p>
          {/* <button class="btn btn-primary btn-lg">Get Started</button> */}
        </section>

        <section class="row g-4 mb-5">
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <i class="bi bi-bug feature-icon mb-3"></i>
                <h2 class="card-title h4">Issue Tracking</h2>
                <ul class="list-unstyled">
                  <li>
                    <i class="bi bi-check2 me-2"></i>Raise and track bugs
                    efficiently
                  </li>
                  <li>
                    <i class="bi bi-check2 me-2"></i>Collaborate with developers
                    in real-time
                  </li>
                  <li>
                    <i class="bi bi-check2 me-2"></i>Prioritize and assign
                    issues
                  </li>
                  <li>
                    <i class="bi bi-check2 me-2"></i>Track issue status and
                    resolution
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <i class="bi bi-folder feature-icon mb-3"></i>
                <h2 class="card-title h4">Project Management</h2>
                <ul class="list-unstyled">
                  <li>
                    <i class="bi bi-check2 me-2"></i>Add and manage project
                    details
                  </li>
                  <li>
                    <i class="bi bi-check2 me-2"></i>Set project milestones and
                    deadlines
                  </li>
                  <li>
                    <i class="bi bi-check2 me-2"></i>Track project progress
                  </li>
                  <li>
                    <i class="bi bi-check2 me-2"></i>Share project information
                    with team
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100">
              <div class="card-body">
                <i class="bi bi-people feature-icon mb-3"></i>
                <h2 class="card-title h4">Admin Dashboard</h2>
                <ul class="list-unstyled">
                  <li>
                    <i class="bi bi-check2 me-2"></i>Add and manage team members
                  </li>
                  <li>
                    <i class="bi bi-check2 me-2"></i>Set user roles and
                    permissions
                  </li>
                  <li>
                    <i class="bi bi-check2 me-2"></i>Monitor team performance
                  </li>
                  <li>
                    <i class="bi bi-check2 me-2"></i>Generate reports and
                    analytics
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-5">
          <h2 class="text-center mb-4">
            Powerful Features for Seamless Collaboration
          </h2>
          <div class="row g-4">
            <div class="col-md-4">
              <div class="d-flex align-items-center">
                <i class="bi bi-plus-circle me-3 feature-icon"></i>
                <span>Easy bug reporting for testers</span>
              </div>
            </div>
            <div class="col-md-4">
              <div class="d-flex align-items-center">
                <i class="bi bi-search me-3 feature-icon"></i>
                <span>Advanced search and filtering</span>
              </div>
            </div>
            <div class="col-md-4">
              <div class="d-flex align-items-center">
                <i class="bi bi-gear me-3 feature-icon"></i>
                <span>Customizable workflows</span>
              </div>
            </div>
            <div class="col-md-4">
              <div class="d-flex align-items-center">
                <i class="bi bi-people me-3 feature-icon"></i>
                <span>Team collaboration tools</span>
              </div>
            </div>
            <div class="col-md-4">
              <div class="d-flex align-items-center">
                <i class="bi bi-folder me-3 feature-icon"></i>
                <span>Project overview dashboards</span>
              </div>
            </div>
            <div class="col-md-4">
              <div class="d-flex align-items-center">
                <i class="bi bi-bug me-3 feature-icon"></i>
                <span>Detailed bug lifecycle tracking</span>
              </div>
            </div>
          </div>
        </section>

        <section class="text-center">
          <h2 class="mb-3">Ready to enhance your team's productivity?</h2>
          <p class="lead mb-4">
            Join FlexCap today and experience seamless bug tracking, project
            management, and team collaboration.
          </p>
          <div>
            {/* <button class="btn btn-primary btn-lg me-2">Sign Up Now</button> */}
            {/* <button class="btn btn-outline-primary btn-lg">Request Demo</button> */}
          </div>
        </section>
      </main>

      {infoMessage?.modalOpen &&
        !JSON.parse(sessionStorage["auth"])["isUser"] && (
          <InfoModal infoMessage={infoMessage} />
        )}
    </>
  );
};

export default Home;
