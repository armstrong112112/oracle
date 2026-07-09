import type { Post } from '~/entities/market/model/types'
export const blackListPost: Post[] = [
  {
    id: '3',
    type: 'image',
    image: '/icons/market/chatPlaceholder.svg',
    author: 'John',
    timestamp: '3:45 PM',
    blackListContent: `
    NEW REPORT #3787

    <br />
    <br />

<a href="#">@SwitchTheHellraiser</a> suspect · 嫌疑人 · sospechoso · подозреваемый
<a href="#">What does this status mean</a>
<br /><br />
ID: 7578677253 <br />
⚠️ IN REVIEW · 审核中 · EN REVISIÓN · EN COURS D'EXAMEN · <br />
НА РАССМОТРЕНИИ
<br /><br />
<a href="https://oralce.substack.com/p/new-report-3787">https://oralce.substack.com/p/new-report-3787</a> <br /><br />

🛡 TO SUBMIT AN APPEAL, CONTACT US <br />
🛡 要提交申诉，请联系我们 <br />
🛡 ПОДАТЬ АПЕЛЛЯЦИЮ <br />
<br />
<br />
<a href="@OracleList">@OracleList</a>
<br /><br />
🌐 Stay with Oracle no matter what with <a href="#">Oracle on Signal</a>
<br /><br />
👁 Get the best deals at <a href="#">Oracle's Market</a>
  `,
    views: '5.1K',
    username: 'John_Doe',
  },
]
