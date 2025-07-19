import { lazy } from "react";
import { Route, RouteProps } from "react-router-dom";
import NotFound from "../../pages/404";
const Salary = lazy(() => import("../../pages/Experts/Salary/Salary"));
const GeneralInformation = lazy(
  () => import("../../pages/Experts/GeneralInformation/GeneralInformation")
);
const NewService = lazy(
  () => import("../../pages/Experts/NewService/NewService")
);
const DashboardLayout = lazy(() => import("../../layouts/DashboardLayout"));
const Dashboard = lazy(() => import("../../pages/dashboard"));
const SendedCV = lazy(() => import("../../pages/Recruitment/ads/sendedCv"));
const AddAds = lazy(() => import("../../pages/Recruitment/ads/addAds"));
const RecruitmentAds = lazy(() => import("../../pages/Recruitment/ads"));
const QuickTurn = lazy(() => import("../../pages/QuickTurn"));
const Vacations = lazy(() => import("../../pages/Experts/Vacations/Vacations"));
const Comments = lazy(() => import("../../pages/Comments/Comments"));
const User = lazy(() => import("../../pages/user"));
const Blog = lazy(() => import("../../pages/Blog/Blog"));
const BlogDetails = lazy(
  () => import("../../pages/Blog/BlogDetails/BlogDetails")
);
const Lines = lazy(() => import("../../pages/Lines"));
const Expert = lazy(() => import("../../pages/Experts"));
const Services = lazy(() => import("../../pages/Services"));
const ServicesInformation = lazy(
  () => import("../../pages/Services/Information")
);
const ServicesTip = lazy(() => import("../../pages/Services/Tips"));
const ServicesSeo = lazy(() => import("../../pages/Services/Seo"));
const ServicesFaq = lazy(() => import("../../pages/Services/Faq"));
const ServicesExperts = lazy(() => import("../../pages/Services/Experts"));
const Branch = lazy(() => import("../../pages/Branch"));
const CreateBranch = lazy(() => import("../../pages/Branch/Create"));
const Profile = lazy(() => import("../../pages/Profile"));
const Transactions = lazy(() => import("../../pages/Transactions"));
const Reservation = lazy(() => import("../../pages/Reservation"));
const TemporaryClosure = lazy(
  () => import("../../pages/TemporaryClosure/TemporaryClosure")
);
const Sms = lazy(() => import("../../pages/Sms/Sms"));
const Single = lazy(() => import("../../pages/Sms/Single/Single"));
const Group = lazy(() => import("../../pages/Sms/Group/Group"));
const Public = lazy(() => import("../../pages/Sms/Public/Public"));
const Setting = lazy(() => import("../../pages/Setting/Setting"));
const PanelDetails = lazy(() => import("../../pages/Panel/PanelDetails"));
const PanelUpgrade = lazy(() => import("../../pages/Panel/PanelUpgrade"));
const Account = lazy(() => import("../../pages/Account/Account"));
const Payments = lazy(() => import("../../pages/Payments"));

const DashboardChildrenRoute: RouteProps[] = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/lines",
    element: <Lines />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blogdetails",
    element: <BlogDetails />,
  },
  {
    path: "/expert",
    element: <Expert />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/services/information",
    element: <ServicesInformation />,
  },
  {
    path: "/services/tip",
    element: <ServicesTip />,
  },
  {
    path: "/services/faq",
    element: <ServicesFaq />,
  },
  {
    path: "/services/experts",
    element: <ServicesExperts />,
  },
  {
    path: "/services/seo",
    element: <ServicesSeo />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/reservation",
    element: <Reservation />,
  },
  {
    path: "/payments",
    element: <Payments />,
  },

  {
    path: "expert/vacations",
    element: <Vacations />,
  },
  {
    path: "expert/salary",
    element: <Salary />,
  },
  {
    path: "expert/information",
    element: <GeneralInformation />,
  },
  {
    path: "expert/service",
    element: <NewService />,
  },
  {
    path: "/QuickTurn",
    element: <QuickTurn />,
  },
  {
    path: "/branch",
    element: <Branch />,
  },
  {
    path: "/branch/create",
    element: <CreateBranch />,
  },
  {
    path: "/comments",
    element: <Comments />,
  },
  {
    path: "/temporaryclosure",
    element: <TemporaryClosure />,
  },
  {
    path: "/sms",
    element: <Sms />,
  },
  {
    path: "/sms/single",
    element: <Single />,
  },
  {
    path: "/sms/group",
    element: <Group />,
  },
  {
    path: "/sms/public",
    element: <Public />,
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/recruitment/ads",
    element: <RecruitmentAds />,
  },
  {
    path: "/recruitment/add",
    element: <AddAds />,
  },
  {
    path: "/recruitment/send-cv",
    element: <SendedCV />,
  },
  {
    path: "/panel",
    element: <PanelDetails />,
  },
  {
    path: "/panel/upgrade",
    element: <PanelUpgrade />,
  },
  {
    path: "/user",
    element: <User />,
  },
];

const DashboardRoute: RouteProps[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: DashboardChildrenRoute.map((childRoute) => (
      <Route {...childRoute} />
    )),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default DashboardRoute;
