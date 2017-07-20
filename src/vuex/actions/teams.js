/*eslint-disable*/
import store from '../store'

export function onTeams(teams) {
  console.log('onTeams=>teams', teams)
  console.log('onTeams=>群列表', teams)
  store.commit('updateTeams', teams)
  store.commit('onInvalidTeams', teams.invalid)
}

export function onCreateTeam(team, owner) {
  store.commit('updateTeam', team)
  onTeamMembers({
    teamId: team.teamId,
    members: owner
  })
}

export function onSyncTeamMembersDone() {
  console.log('同步群列表完成')
}

export function onUpdateTeamMember({state, commit}, teamMember) {
  console.log('群成员信息更新了', teamMember)
  const nim = state.nim
  nim.onTeamMembers({
    teamId: teamMember.teamId,
    members: teamMember
  })
}

export function onTeamMembers(obj) {
  console.log('onTeamMembers:收到群成员', obj)
  store.commit('teamMembers', obj)
}

export function getTeamMembers({state, commit}, teamId) {
  const nim = state.nim
  nim.getTeamMembers({
    teamId: teamId,
    done: getTeamMembersDone
  });
}

function getTeamMembersDone(error, obj) {
  console.log(error)
  console.log(obj)
  store.commit('currentTeamMember', obj)
  console.log('获取群成员' + (!error ? '成功' : '失败'));
  if (!error) {
    onTeamMembers(obj);
  }
}

export function getUser({state, commit}, account) {
  const nim = state.nim
  nim.getUsers({
    accounts: account,
    done: getUserDone
  });
}
function getUserDone(error, user) {
  console.log('获取用户名片' + (!error?'成功':'失败'), error, user);
  if (!error && user) {
    store.commit('Users', user)
  }}


export function getTeam({state, commit}, teamId) {
  const nim = state.nim
  nim.getTeam({
    teamId: teamId,
    done: getTeamDone
  });
}

function getTeamDone(error, obj) {
  console.log(error);
  console.log('getTeamDone', obj);
  console.log('获取群' + (!error ? '成功' : '失败'));
  store.commit('currentTeam', obj)
}

// 创建普通群
export function createNormalTeam({state, commit}, obj) {
  const nim = state.nim
  nim.createTeam({
    type: 'normal',
    name: obj.teamName,
    avatar: 'avatar',
    accounts: obj.accounts,
    ps: '我建了一个普通群',
    done: createTeamDone
  })
}

// 创建高级群
export function createAdvancedTeam({state, commit}, obj) {
  const nim = state.nim
  nim.createTeam({
    type: 'advanced',
    name: obj.teamName,
    avatar: 'avatar',
    accounts: obj.accounts,
    intro: '群简介',
    announcement: '群公告',
    /*joinMode: 'needVerify',
    beInviteMode: 'needVerify',
    inviteMode: 'manager',
    updateTeamMode: 'manager',
    updateCustomMode: 'manager',*/
    ps: '我建了一个高级群',
    done: createTeamDone
  });
}

function createTeamDone(error, obj) {
  console.log('创建' + obj.team.type + '群' + (!error ? '成功' : '失败'), error, obj);
  store.commit('createTeam', obj.team)
  if (!error) {
    onCreateTeam(obj.team, obj.owner);
  }
}

export function acceptTeamInvite({state, commit}, obj) {
  const nim = state.nim
  nim.acceptTeamInvite({
    idServer: obj.idServer,
    teamId: obj.teamId,
    from: obj.from,
    done: acceptTeamInviteDone
  })
}

function acceptTeamInviteDone(error, obj) {
  console.log('接受入群邀请' + (!error?'成功':'失败'), error, obj);
}

export function rejectTeamInvite({state, commit}, obj) {
  const nim = state.nim
  nim.rejectTeamInvite({
    idServer: obj.idServer,
    teamId: obj.teamId,
    from: obj.from,
    ps: '就不',
    done: rejectTeamInviteDone
  });
}

function rejectTeamInviteDone(error, obj) {
  console.log('拒绝入群邀请' + (!error?'成功':'失败'), error, obj);
}

export function addTeamMembers({state, commit}, obj) {
  const nim = state.nim
  nim.addTeamMembers({
    teamId: '123',
    accounts: ['a3', 'a4'],
    ps: '加入我们的群吧',
    done: addTeamMembersDone
  });
}

function addTeamMembersDone(error, obj) {
  console.log('入群邀请发送' + (!error?'成功':'失败'), error, obj);
}
