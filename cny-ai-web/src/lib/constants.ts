import type { RelationshipType, GreetingStyle, DefenseCategory, DefenseStrategy, CardTemplate } from '@/types'

export const RELATIONSHIPS: Array<{ value: RelationshipType; label: string; icon: string }> = [
  { value: 'elder_family', label: '长辈', icon: '👴' },
  { value: 'peer_family', label: '平辈亲戚', icon: '👫' },
  { value: 'friend', label: '朋友', icon: '🤝' },
  { value: 'colleague', label: '同事', icon: '💼' },
  { value: 'boss', label: '领导', icon: '👔' },
  { value: 'client', label: '客户', icon: '🤝' },
  { value: 'teacher', label: '老师', icon: '📚' },
  { value: 'neighbor', label: '邻居', icon: '🏘️' },
]

export const GREETING_STYLES: Array<{ value: GreetingStyle; label: string; icon: string }> = [
  { value: 'formal', label: '正式端庄', icon: '🎩' },
  { value: 'humorous', label: '幽默搞笑', icon: '😄' },
  { value: 'literary', label: '文艺诗意', icon: '📜' },
  { value: 'trendy', label: '网络潮流', icon: '🔥' },
  { value: 'heartfelt', label: '真情实感', icon: '❤️' },
]

export const AWKWARD_QUESTIONS: Array<{ value: DefenseCategory; label: string; question: string; icon: string }> = [
  { value: 'relationship', label: '问对象', question: '有对象了吗？', icon: '💕' },
  { value: 'marriage', label: '催婚', question: '什么时候结婚？', icon: '💍' },
  { value: 'salary', label: '问薪资', question: '一个月挣多少？', icon: '💰' },
  { value: 'children', label: '催生', question: '什么时候要孩子？', icon: '👶' },
  { value: 'job', label: '问工作', question: '工作怎么样？', icon: '💼' },
  { value: 'house', label: '问房子', question: '买房了吗？', icon: '🏠' },
  { value: 'weight', label: '评体重', question: '怎么胖了/瘦了？', icon: '⚖️' },
  { value: 'education', label: '问学历', question: '考研/考公了吗？', icon: '🎓' },
]

export const DEFENSE_STRATEGIES: Array<{ value: DefenseStrategy; label: string; icon: string }> = [
  { value: 'humor', label: '幽默化解', icon: '😂' },
  { value: 'redirect', label: '巧妙转移', icon: '🔄' },
  { value: 'counter', label: '高情商反问', icon: '🤔' },
  { value: 'philosophical', label: '哲学升华', icon: '🧘' },
  { value: 'flattery', label: '彩虹屁反击', icon: '🌈' },
]

export const CARD_TEMPLATES: Array<{ value: CardTemplate; label: string; icon: string; desc: string }> = [
  { value: 'classic', label: '经典红金', icon: '🏮', desc: '传统红底金字' },
  { value: 'modern', label: '现代简约', icon: '✨', desc: '简洁大方' },
  { value: 'cute', label: '可爱卡通', icon: '🐴', desc: '活泼有趣' },
  { value: 'calligraphy', label: '书法国风', icon: '🖌️', desc: '水墨风格' },
]

export const QUICK_FIRE_RESPONSES: Record<DefenseCategory, string[]> = {
  relationship: [
    '缘分这匹马还没跑到我这儿呢 🐴',
    '我在等一个配得上我的人出现～',
    '有的有的，对象是搞事业！',
    '您家有适龄青年可以介绍吗？',
  ],
  marriage: [
    '马上马上，马年一定马上！🐴',
    '等我先挣够彩礼钱哈～',
    '好饭不怕晚，好姻缘不怕等！',
    '您当年是怎么找到姑父/姑妈的？取取经！',
  ],
  salary: [
    '够花，马马虎虎 🐴',
    '比马云少亿点点',
    '都上交给国家了（交税）',
    '跟您说了您也帮不上忙呀～',
  ],
  children: [
    '先把自己养明白再说 😂',
    '等房贷还完就生！',
    '我们家猫不同意再养一个',
    '这个要看天意，急不来的～',
  ],
  job: [
    '还行，马到成功的路上 🐴',
    '在为祖国的GDP努力贡献中！',
    '挺好的，就是钱少事多离家远 😂',
    '正在做一番大事业，敬请期待！',
  ],
  house: [
    '我的房子在元宇宙里，500平 😎',
    '房价什么时候降您通知我一声',
    '租的房子也很温馨啦～',
    '正在攒首付，差的不多了（差99%）',
  ],
  weight: [
    '这叫发福！马年发福是好兆头 🐴',
    '膨胀了膨胀了，实力膨胀！',
    '过年不长肉，白过了！',
    '谢谢关心，我很健康！',
  ],
  education: [
    '在考虑中，容我三思 🤔',
    '社会大学在读，实践出真知！',
    '我选择了另一条赛道，一马当先 🐴',
    '学历是敲门砖，能力才是金钥匙！',
  ],
}
