const moduleA = {
    namespaced: true,
    state: {
      memberId: '',
      memberInfo: '', 
    },
    mutations: {
      saveMemberId (state, data){
        state.memberId = data;
      },
      saveMemberInfo (state, data){
        state.memberInfo = data;
      }
    },
}

export default moduleA
