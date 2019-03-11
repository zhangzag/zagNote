const moduleA = {
    namespaced: true,
    state: { user: '测试人员' },
    mutations: {
      increment (state) {
        // 这里的 `state` 对象是模块的局部状态
        state.count++
      }
    },
}

export default moduleA