<template>
  <div>
    <p>
      待完成：
      1、无法获取头像，由于群人数5人，而获取的userInfos只有2人。获取avatar出错。
      尝试getUser，里面没有头像。
      2、踢人
      3、拉人
    </p>
    <b>当前team的currentTeamMember:</b>
    <div v-for="item in currentTeamMember">{{item.account}}</div>
    <b>当前team信息currentTeam:</b>{{currentTeam}}
    <Button @click="addTeamMembers">拉人</Button>
  </div>
</template>
<script type="text/babel">

  export default{
    components: {},
    data() {
      return {
        teamId: '',
        userData: '',
        currentTeamMembersArr: [],
        currentTeamMembersInfo: [],
      }
    },
    computed: {
      /* 获取到当前team的所有用户（下一步 根据用户account 获取所有用户信息的头像）*/
      currentTeamMember() {
        return this.$store.state.currentTeamMember.members
      },
      account() {
        console.log('teamInfo', this.$route.params.teamId)
        return this.$route.params.teamId
      },
      userInfos() {
        return this.$store.state.userInfos
      },
      currentTeam() {
        return this.$store.state.currentTeam
      },
    },
    methods: {
      addTeamMembers() {
       /* const obj = {
          idServer: idServer,
          from: from,
          teamId: teamId,
        }
        console.log(obj)
        this.$store.dispatch('getTeamMembers', obj)*/
      },
    },
    created() {
      this.teamId = this.$route.params.teamId
      this.$store.dispatch('getTeamMembers', this.teamId)
      console.log('created-currentTeamMember', this.currentTeamMember)
      this.$store.dispatch('getTeam', this.teamId)
      this.$store.dispatch('getUser', ['kero'])
    },
  }
</script>
<style lang="scss">


</style>
