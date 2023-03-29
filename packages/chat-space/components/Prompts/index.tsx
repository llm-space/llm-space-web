import cn from 'classnames';
import { useMemo } from 'react';

import styles from './index.module.less';

const PROMPTS = [
  '量子计算机如何工作',
  '什么是弦理论',
  '黑洞能否发电',
  'AI 伦理问题有哪些',
  '诺贝尔奖创立的原因',
  '马可·波罗的贡献',
  '莫扎特和贝多芬的区别',
  '中世纪哪个城市最繁荣',
  '印象派画家的代表人物',
  '四大发明分别是什么',
  'DNA 双螺旋结构发现者',
  '宇宙大爆炸理论的提出者',
  '人类最早的文字是什么',
  '互联网起源于何时',
  '克隆技术的道德争议',
  '什么是暗物质暗能量',
  '语言学中的普遍语法是',
  '莎士比亚的著名悲剧有哪些',
  '人工智能对就业的影响',
  '宇宙是否有边界',
];

export interface PromptsProps {
  className?: string;
  onSelect?: (prompt: string) => void;
}

export function Prompts({ className, onSelect }: PromptsProps) {
  const randomPrompts = useMemo(
    () => ['南京和北京有哪些区别？用表格输出', ...PROMPTS.sort(() => Math.random() - 0.5).slice(0, 3)],
    []
  );
  return (
    <ul className={cn(styles.container, className)}>
      {randomPrompts.map((prompt, index) => (
        <li key={index} onClick={() => onSelect?.(prompt)}>
          {prompt}
        </li>
      ))}
    </ul>
  );
}
