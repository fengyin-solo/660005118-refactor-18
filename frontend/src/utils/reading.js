/**
 * 识别结果读数的统一取值与单位换算入口。
 * 字段名变更时只需修改本文件，各处展示都从 getModulationReadings 取数。
 */
/** 缺失数值的统一占位样式 */
export const MISSING_TEXT = 'N/A';
/** 速率单位 */
export const RATE_UNIT = 'Baud';
/** 候选分数分段配色阈值（与现有进度条显示样式保持一致） */
const SCORE_HIGH = 0.7;
const SCORE_MID = 0.4;
const COLOR_HIGH = '#66bb6a';
const COLOR_MID = '#ffa726';
const COLOR_LOW = '#ef5350';
function finiteOrNull(value) {
    return typeof value === 'number' && Number.isFinite(value) ? value : null;
}
/** 0~1 的比例换算为百分比整数；缺失时按 0 显示 */
export function ratioToPercent(ratio) {
    const v = finiteOrNull(ratio);
    return Math.round((v ?? 0) * 100);
}
/** 速率读数：换算为整数并拼接 Baud 单位；缺失时显示 N/A */
export function formatRate(value) {
    const v = finiteOrNull(value);
    return v === null ? MISSING_TEXT : `${v.toFixed(0)} ${RATE_UNIT}`;
}
/** 按分数所在区间返回进度条颜色（超出区间的显示样式与原先一致） */
export function scoreColor(score) {
    if (score > SCORE_HIGH)
        return COLOR_HIGH;
    if (score > SCORE_MID)
        return COLOR_MID;
    return COLOR_LOW;
}
/** 从识别结果中集中取数并完成单位换算 */
export function getModulationReadings(modulation) {
    return {
        type: modulation?.type || '-',
        confidencePct: ratioToPercent(modulation?.confidence),
        symbolRateText: formatRate(modulation?.symbolRate),
        hasCandidates: !!modulation?.candidates,
        candidates: (modulation?.candidates ?? []).map((c) => ({
            type: c.type,
            percentage: ratioToPercent(c.score),
            color: scoreColor(c.score)
        }))
    };
}
