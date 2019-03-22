const moduleA = {
    namespaced: true,
    state: { 
      user: '测试人员',
      memberId: '',
      memberInfo: '', 
    },
    mutations: {
      increment (state) {
        // 这里的 `state` 对象是模块的局部状态
        state.count++
      },
      saveMemberId (state, data){
        state.memberId = data;
      },
      saveMemberInfo (state, data){
        state.memberInfo = data;
      }
    },
}

export default moduleA