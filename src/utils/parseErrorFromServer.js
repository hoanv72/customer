const parseErrorFromServer = (payload) => {
  if (!payload) {
    payload = { error: '' };
  }

  const { code } = payload;
  let message = '';
  switch (code) {
    case -2: {
      message = 'Token không hợp lệ';
      break;
    }

    case -1:
      message = 'Không tìm thấy';
      break;

    case 10:
      message = 'Lỗi server';
      break;

    default: {
      message = 'Lỗi không xác định';
      break;
    }
  }

  return {
    code,
    message,
  };
};

export default parseErrorFromServer;
