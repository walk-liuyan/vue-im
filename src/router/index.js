import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import regist from '../components/regist'
import imWeb from '../components/im_web'
import session from '../components/im/session'
import contacts from '../components/im/Contacts'
import chat from '../components/im/Chat'
import chathistory from '../components/im/ChatHistory'
import sysmsgs from '../components/im/SysMsgs'
import namecard from '../components/im/NameCard'
import namecardremark from '../components/im/NameCardRemark'
import general from '../components/im/General'
import searchuser from '../components/im/SearchUser'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist,
    },
    {
      path: '/im_web',
      name: 'im_web',
      component: imWeb,
      redirect: '/im_web/sysmsgs',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/im_web/session',
          name: 'session',
          components: {
            default: imWeb,
            tabsWrapper: session,
          },
        },
        {
          path: '/im_web/contacts',
          name: 'contacts',
          components: {
            default: imWeb,
            tabsWrapper: contacts,
          },
        },
        {
          path: '/im_web/searchuser/:searchText',
          name: 'searchuser',
          components: {
            default: imWeb,
            contentWrapper: searchuser,
          },
        },
        {
          path: '/im_web/chat/:sessionId',
          name: 'chat',
          components: {
            default: imWeb,
            tabsWrapper: session,
            contentWrapper: chat,
          },
        },
        {
          path: '/im_web/chathistory/:sessionId',
          name: 'chathistory',
          components: {
            default: imWeb,
            tabsWrapper: session,
            contentWrapper: chathistory,
          },
        },
        {
          path: '/im_web/sysmsgs',
          name: 'sysmsgs',
          components: {
            default: imWeb,
            tabsWrapper: session,
            contentWrapper: sysmsgs,
          },
        },
        {
          path: '/im_web/namecard/:userId',
          name: 'namecard',
          components: {
            default: imWeb,
            tabsWrapper: session,
            contentWrapper: namecard,
          },
        },
        {
          path: '/im_web/namecardremark/:userId',
          name: 'namecardremark',
          components: {
            default: imWeb,
            tabsWrapper: session,
            contentWrapper: namecardremark,
          },
        },
        {
          path: '/im_web/general',
          name: 'general',
          components: {
            default: imWeb,
            tabsWrapper: session,
            contentWrapper: general,
          },
        },
      ],
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat,
    },
  ],

})
export default router
