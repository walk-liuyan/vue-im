/**
 * @module vuex/actions
 */
export function temporaryData({ commit }, newSet) {
  commit('temporaryData', newSet)
}

export function allChartData({ commit }, newSet) {
  commit('allChartData', newSet)
}
