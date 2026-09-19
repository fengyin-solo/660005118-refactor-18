/**
 * 数值取值与单位换算的共用实现。
 * 各面板显示数值时统一从这里取数：字段名或换算规则调整只需改这一份，
 * 缺失数值与超出范围时的显示样式也能保持一致。
 */

/** 比例值(0~1)换算为百分数(0~100)，缺失时按 0 处理 */
export function toPercent(ratio: number | null | undefined): number {
  return Math.round((ratio || 0) * 100)
}

/** 数值按指定小数位格式化，缺失时显示占位符 */
export function formatFixed(value: number | null | undefined, digits: number, placeholder = 'N/A'): string {
  return value?.toFixed(digits) || placeholder
}

/** 文本缺失时显示占位符 */
export function textOr(value: string | null | undefined, placeholder = '-'): string {
  return value || placeholder
}
