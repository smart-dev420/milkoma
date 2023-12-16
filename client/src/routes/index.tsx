import { createHashRouter, Outlet } from "react-router-dom";
import { NotFound } from "../components/NotFound";
import { PageLayout } from "../pages/PageLayout";
import { Home } from "../pages/Home";
import { DirectPage } from "../pages/DirectPage";
import { FindCreator } from "../pages/Creator";
import { CreatorFind } from "../pages/Creator/CreatorFind";
import { CreatorDetail } from "../pages/Creator/Detail";
import { CreatorStep } from "../pages/Creator/Step";
import { ViewHistory } from "../pages/VIewHistory";
import { MypageLayout } from "../pages/MypageLayout";
import { SignUp, Login, ForgotPassword, OtpSent, ResetPassword } from "../pages/Sign";
import { HomePage, ProjectList, DetailPage, ContractPage, ContractManage, ChattingPage, CardManage, Profile, Payment } from "../pages/MyPage";

export const router = createHashRouter([
    {
      path: "/login",
      element: (
        <Login />
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/signup",
      element: (
        <SignUp />
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/forgot",
      element: (
        <ForgotPassword />
      ),
      errorElement: <NotFound />,
    },
    {
      // path: "/otp/:email",
      path: "/otp",
      element: (
        <OtpSent />
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/resetpswd",
      element: (
        <ResetPassword />
      ),
      errorElement: <NotFound />,
    },
    {
      path: "/",
      element: (
        <PageLayout>
          <Outlet />
        </PageLayout>
      ),
      errorElement: <NotFound />,
      children: [
        {
          path: "",
          element: <Home />,
          errorElement: <NotFound />,
        },
        {
          path: "find",
          element: <Home />,
          errorElement: <NotFound />,
        },
        {
          path: "direct_request",
          element: <DirectPage/>,
          errorElement: <NotFound />,
        },
        {
          path: "creator",
          element: <FindCreator/>,
          errorElement: <NotFound />,
        },
        {
          path: "creator/find",
          element: <CreatorFind/>,
          errorElement: <NotFound />,
        },
        {
          path: "creator/detail/:userId",
          element: <CreatorDetail/>,
          errorElement: <NotFound />,
        },
        {
          path: "creator/step/:userId",
          element: <CreatorStep/>,
          errorElement: <NotFound />,
        },
        {
          path: "history",
          element: <ViewHistory/>,
          errorElement: <NotFound />,
        },
        
      ],
    },
    {
      path:"/mypage",
      element: (
        <MypageLayout>
          <Outlet />
        </MypageLayout>
      ),
      errorElement: <NotFound />,
      children: [
        {
        path: "",
        element: <HomePage />,
        errorElement: <NotFound />,
      },
      {
        path: "project",
        element: <ProjectList />,
        errorElement: <NotFound />,
      },
      {
        path: "detail/:cid",
        element: <DetailPage />,
        errorElement: <NotFound />,
      },
      {
        path: "contract/:cid",
        element: <ContractPage />,
        errorElement: <NotFound />,
      },
      {
        path: "contract_manage",
        element: <ContractManage />,
        errorElement: <NotFound />,
      },
      {
        path: "chatting",
        element: <ChattingPage />,
        errorElement: <NotFound />,
      },
      {
        path: "card_manage",
        element: <CardManage />,
        errorElement: <NotFound />,
      },
      {
        path: "pay/:cid",
        element: <Payment />,
        errorElement: <NotFound />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <NotFound />,
      },
    ]
    }

  ]);