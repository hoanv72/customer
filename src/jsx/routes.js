/// Dashboard
import Home from "./components/Dashboard/Home";
import WorkoutStatistic from "./components/Dashboard/WorkoutStatistic";
import DistanceMap from "./components/Dashboard/DistanceMap";
import WorkoutPlan from "./components/Dashboard/WorkoutPlan";
import FoodMenu from "./components/Dashboard/FoodMenu";
import PersonalRecord from "./components/Dashboard/PersonalRecord";

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";

/// Product List
import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
import ProductList from "./components/AppsMenu/Shop/ProductList/ProductList";
import ProductDetail from "./components/AppsMenu/Shop/ProductGrid/ProductDetail";
import Checkout from "./components/AppsMenu/Shop/Checkout/Checkout";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";
import ProductOrder from "./components/AppsMenu/Shop/ProductOrder";
import Customers from "./components/AppsMenu/Shop/Customers/Customers";

/// Charts
import SparklineChart from "./components/charts/Sparkline";
import ChartJs from "./components/charts/Chartjs";
import Chartist from "./components/charts/chartist";
import RechartJs from "./components/charts/rechart";
import ApexChart from "./components/charts/apexcharts";

/// Bootstrap
import UiAlert from "./components/bootstrap/Alert";
import UiAccordion from "./components/bootstrap/Accordion";
import UiBadge from "./components/bootstrap/Badge";
import UiButton from "./components/bootstrap/Button";
import UiModal from "./components/bootstrap/Modal";
import UiButtonGroup from "./components/bootstrap/ButtonGroup";
import UiListGroup from "./components/bootstrap/ListGroup";
import UiMediaObject from "./components/bootstrap/MediaObject";
import UiCards from "./components/bootstrap/Cards";
import UiCarousel from "./components/bootstrap/Carousel";
import UiDropDown from "./components/bootstrap/DropDown";
import UiPopOver from "./components/bootstrap/PopOver";
import UiProgressBar from "./components/bootstrap/ProgressBar";
import UiTab from "./components/bootstrap/Tab";
import UiPagination from "./components/bootstrap/Pagination";
import UiGrid from "./components/bootstrap/Grid";
import UiTypography from "./components/bootstrap/Typography";

/// Plugins
import Select2 from "./components/PluginsMenu/Select2/Select2";
import Nestable from "./components/PluginsMenu/Nestable/Nestable";
import MainNouiSlider from "./components/PluginsMenu/Noui Slider/MainNouiSlider";
import MainSweetAlert from "./components/PluginsMenu/Sweet Alert/SweetAlert";
import Toastr from "./components/PluginsMenu/Toastr/Toastr";
import JqvMap from "./components/PluginsMenu/Jqv Map/JqvMap";

/// Widget
import Widget from "./pages/Widget";

/// Table
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import SummerNote from "./components/Forms/Summernote/SummerNote";
import Pickers from "./components/Forms/Pickers/Pickers";
import jQueryValidation from "./components/Forms/jQueryValidation/jQueryValidation";

/// Pages
import Error404 from "./pages/Error404";
import ChangePassword from "./pages/ChangePassword";

// Categories
import Kenh from "./pages/Categories/Client/Kenh";
import KhuVuc from "./pages/Categories/Client/KhuVuc";
import NhomKhachHang from "./pages/Categories/Client/NhomKhachHang";
import LoaiKhachHang from "./pages/Categories/Client/LoaiKhachHang";
import DonViTinh from "./pages/Categories/Product/DonViTinh";
import NhanHieu from "./pages/Categories/Product/NhanHieu";
import NhaCungCap from "./pages/Categories/Product/NhaCungCap";
import NganhHang from "./pages/Categories/Product/NganhHang";
import { ClientPages } from "./pages/Categories/Client/ClientPages";
import ChitieuChitiet from "./pages/Categories/Target/NganhHang";
import AddRoute from "./pages/Categories/Route/AddRoute";
import Route from "./pages/Categories/Route";
import MonitoringPages from "./pages/Categories/Monitoring/MonitoringPages";

export const routes = [
  /// base name
  { url: "", component: Home },
  /// change password
  { url: "change-password", component: ChangePassword },

  /// pages
  { url: "error-404", component: Error404 },

  // category
  //  -- Client
  { url: "category/client", component: ClientPages },
  // { url: "category/client/chanel", component: ClientPages },
  // ___________________________sai route_______________________________
  { url: "category/client/channel", component: ClientPages },
  { url: "category/client/region", component: ClientPages },
  { url: "category/client/group", component: ClientPages },
  { url: "category/client/type", component: ClientPages },
  // { url: 'category/client/type/new', component: ClientPages },
  // { url: 'category/client/type/:id/edit', component: ClientPages },
  // { url: 'category/client/type/:id/delete', component: ClientPages },
  // -- Product
  { url: "category/product/unit", component: DonViTinh },
  { url: "category/product/brand", component: NhanHieu },
  { url: "category/product/provider", component: NhaCungCap },
  { url: "category/product/industry", component: NganhHang },
  { url: "category/target/target-detail", component: ChitieuChitiet },

  { url: "route/add", component: AddRoute },

  // -- Warehouse
  // { url: "route1", component: Route },
  { url: "Monitoring", component: MonitoringPages },
];
