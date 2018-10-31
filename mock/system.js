const Mock = require('mockjs');

const Random = Mock.Random;

Random.extend({
    constRoles() {
        return this.pick(['管理员', '用户', '游客'])
    },
    userName(){
      return this.pick(["chenxm",'xiaolin','xiaodong'])
    },
})

const rolesData= Mock.mock({
  'records': [
    {
      id:'@id',
      name: 'admin',
      roleName: '管理员',
      remark:'备注',
    },
    {
      id:'@id',
      name: 'user',
      roleName: "用户",
      remark:'暂无',
    },
    {
      id:'@id',
      name: 'guest',
      roleName: "游客",
      remark:'xxxxx备注信息',
    },
  ],
})
const usersData= Mock.mock({
  'data|5': [
    {
      id:'@id',
      avator: Random.image('200*100'),
      userName:'@userName',
      name:'@cname',
      phone:/\d{11}/,
      roleName: '@constRoles',
      remark:'备注',
    },
  ],
})
export default {
  [`GET /api/roles/list`](req, res) {
    res.status(200).json({
      data: rolesData,
      code: 200,
      msg: '成功',
    });
  },
  [`GET /api/users/list`](req, res) {
    res.status(200).json({
      data: usersData,
      code: 200,
      msg: '成功',
    });
  },

};
