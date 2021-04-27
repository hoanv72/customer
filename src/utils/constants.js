export const LIST_PAGES = {
  dashboard: {
    id: "category-client-type",
    path: "",
    title: "quản lý sản phẩm",
    parent: "client",
  },
  categoryClientType: {
    id: "category-client-type",
    path: "category/client/type",
    title: "quản lý sản phẩm",
    parent: "client",
  },
  categoryClientGroup: {
    id: "category-client-group",
    path: "category/client/group",
    title: "quản lý sản phẩm",
    parent: "client",
  },
  categoryClientRegion: {
    id: "category-client-region",
    path: "category/client/region",
    title: "quản lý sản phẩm",
    parent: "client",
  },
  // categoryClientChanel: {
  //   id: "category-client-chanel",
  //   path: "category/client/chanel",
  //   title: "quản lý sản phẩm",
  //   parent: "client",
  // },
  categoryClientChannel: {
    id: "category-client-channel",
    path: "category/client/channel",
    title: "quản lý sản phẩm",
    parent: "client",
  },
  categoryProductUnit: {
    id: "category-product-unit",
    path: "category/product/unit",
    title: "quản lý sản phẩm",
    parent: "product",
  },
  categoryProductBrand: {
    id: "category-product-brand",
    path: "category/product/brand",
    title: "quản lý sản phẩm",
    parent: "product",
  },
  categoryTarget: {
    id: "category-target",
    path: "category/target",
    title: "chỉ tiêu",
    parent: "client",
  },
  categoryProductProvider: {
    id: "category-product-provider",
    path: "category/product/provider",
    title: "quản lý sản phẩm",
    parent: "product",
  },
  categoryProductIndustry: {
    id: "category-product-industry",
    path: "category/product/industry",
    title: "quản lý sản phẩm",
    parent: "product",
  },
  categoryWarehouse: {
    id: "category-warehouse",
    path: "category/warehouse",
    title: "quản lý kho hàng",
    parent: "warehouse",
  },
  changePassword: {
    id: "change-password",
    path: "change-password",
  },
  client: {
    id: "client",
    path: "client",
  },
  product: {
    id: "product",
    path: "product-menu",
  },
  route: {
    id: "route",
    path: "route",
  },
  // _______config root route__________
  routeRoot: {
    id: "route",
    path: "route",
  },
  // ________________________
  personnel: {
    id: "personnel",
    path: "personnel",
  },
  notFound: {
    id: "not-found",
    path: "not-found",
  },
};

export const COLUMNS_CONFIG = {
  categoryClientType: [
    { name: "code", label: "Mã" },
    { name: "name", label: "Tên" },
    { name: "icon", label: "Icon" },
    { name: "color", label: "Màu sắc" },
  ],
  categoryClientGroup: [
    { name: "code", label: "Mã" },
    { name: "name", label: "Tên" },
  ],
  categoryClientRegion: [
    { name: "code", label: "Mã" },
    { name: "name", label: "Tên" },
  ],
  // categoryClientChanel: [
  //   { name: "code", label: "Mã" },
  //   { name: "name", label: "Tên" },
  // ],
  categoryClientChannel: [
    { name: "code", label: "Mã" },
    { name: "name", label: "Tên" },
  ],
  categoryProductUnit: [
    { name: "code", label: "Mã" },
    { name: "name", label: "Tên" },
  ],
  categoryProductBrand: [
    { name: "code", label: "Mã" },
    { name: "name", label: "Tên" },
  ],
  categoryProductProvider: [
    { name: "code", label: "Mã" },
    { name: "name", label: "Tên" },
  ],
  categoryProductIndustry: [
    { name: "code", label: "Mã" },
    { name: "name", label: "Tên" },
  ],
  categoryTarget: [
    { name: "code", label: "Mã tuyến" },
    { name: "name", label: "Tên tuyến" },
    { name: "group", label: "Nhóm" },
    { name: "personal", label: "Nhân viên" },
    { name: "start_time", label: "Ngày bắt đầu" },
  ],
  client: [
    {
      name: "code",
      label: "Mã",
    },
    {
      name: "name",
      label: "Họ Tên",
    },
    {
      name: "group_id",
      label: "Nhóm",
    },
    {
      name: "type_id",
      label: "Loại",
    },
    {
      name: "contact",
      label: "Người Liên Hệ",
    },
    {
      name: "phone",
      label: "Số điện thoại",
    },
    {
      name: "position",
      label: "Chức Vụ",
    },
  ],
  personnel: [
    {
      name: "username",
      label: "Tên tài khoản",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "password",
      label: "Mật khẩu",
    },
    {
      name: "fullname",
      label: "Họ và Tên",
    },
    {
      name: "position",
      label: "Chức danh",
    },
    {
      name: "address",
      label: "Địa chỉ",
    },
    {
      name: "phone",
      label: "Điện thoại",
    },
    {
      name: "sex",
      label: "Giới tính",
    },
    {
      name: "birthday",
      label: "Sinh nhật",
    },
    {
      name: "part",
      label: "Chức vụ",
    },
    {
      name: "role",
      label: "Vai trò",
    },
  ],
};

export const API_ENDPOINT = {
  categoryClientType: "/client/type",
  categoryClientGroup: "/client/group",
  categoryClientRegion: "/client/region",
  // categoryClientChanel: "/client/channel",
  categoryClientChannel: "/client/channel",
  categoryProductUnit: "/product/unit",
  categoryProductBrand: "/product/brand",
  categoryProductProvider: "/product/provider",
  categoryProductIndustry: "/product/industry",
  categoryListUser: "/client",
  CategoryRoute: "/route",
  categoryClientTarget: "/target",
  client: "",
};
