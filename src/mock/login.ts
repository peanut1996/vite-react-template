import Mock from 'better-mock';

// mock方法,详细的可以看官方文档
const { Random } = Mock;

export default [
  {
    url: '/api/login',
    type: 'post',
    response: () => {
      return {
        code: 0,
        data: {
          name: 'zmj',
        },
        message: 'ok',
      };
    },
  },
];
