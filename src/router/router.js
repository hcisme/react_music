import React, { Suspense } from 'react';
// 导入路由表
import routes from './index';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams
} from 'react-router-dom';

const Element = (props) => {
  const { element: Component } = props;
  const navigate = useNavigate(),
    location = useLocation(),
    params = useParams(),
    [usp] = useSearchParams();

  // 无论是 函数式组件 类式组件 都可使用 hooks
  // return <Component navigate={navigate} location={location} params={params} usp={usp} />;
  return React.cloneElement(Component, {
    navigate,
    location,
    params,
    usp
  });
};

/* 递归创建Route */
const createRoute = (routes) => {
  return routes.map((item, index) => {
    const { path, index: i, children } = item;
    return (
      <Route
        index={i}
        key={index}
        path={path}
        element={<Element {...item} />}
      >
        {Array.isArray(children) ? createRoute(children) : null}
      </Route>
    );
  });
};

/* 路由容器 */
export default function RouterView() {
  return (
    <Suspense fallback={<>加载中...</>}>
      <Routes>{createRoute(routes)}</Routes>
    </Suspense>
  );
}
