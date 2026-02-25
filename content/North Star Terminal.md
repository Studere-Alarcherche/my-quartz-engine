```dataviewjs
// 1. 数据源抓取
const p = dv.page("Character Sheet-The Player") || dv.pages().find(page => page.file.name === "Character Sheet-The Player");
const dailyNotes = dv.pages("#Daily");

if (p) {
    // --- 🧠 1. EXP 计算 (专注力 -> 经验值) ---
    // 逻辑：读取所有日记的 focus_hours 总和 * 10
    const totalFocus = dailyNotes.focus_hours.array().reduce((a, b) => a + (b || 0), 0);
    const dynamicExp = totalFocus * 10;
    const expRate = Math.min(Math.round((dynamicExp / p.exp_next) * 100), 100);

    // --- 获取最新日记用于状态判断 ---
    const latestDaily = dailyNotes.sort(n => n.file.day, "desc")[0];

    // --- ❤️ 2. HP 计算 (睡眠 -> 生命值) ---
    // 逻辑：默认满血，如果最新日记显示熬夜(<6h)或生病，HP 强制降为 20
    let currentHP = 80; // 基础值
    if (latestDaily) {
        if (latestDaily.sleep_hour < 6 || latestDaily.health === "ill") {
            currentHP = 20;
        } else if (latestDaily.sleep_hour >= 8) {
            currentHP = 100; // 睡够了回满血
        }
    }

    // --- 🔵 3. MP 计算 (能量值 -> 魔法值) [NEW!] ---
    // 逻辑：直接读取日记里的 energy_level (0-100)。如果没有日记，就读取角色卡默认值
    let currentMP = p.mp; 
    if (latestDaily && latestDaily.energy_level !== undefined) {
        currentMP = latestDaily.energy_level;
    }

    // --- 🎨 UI 渲染 (HUD 面板) ---
    const container = dv.el("div", "");
    container.innerHTML = `
    <div style="background: #1a1a1a; padding: 20px; border-radius: 12px; border: 1px solid #333; margin-bottom: 20px;">
        <h2 style="margin-top:0; color: #ffaa00; border-bottom: none; display: flex; align-items: center; gap: 8px;">
            🧬 ${p.class || "认知运动员"} <span style="background: #333; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 0.6em;">LV.${p.level}</span>
        </h2>
        
        <div style="margin-bottom: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 2px;">
                <strong>EXP</strong>
                <span style="color: #888;">${dynamicExp} / ${p.exp_next} (${expRate}%)</span>
            </div>
            <div style="height: 8px; background: #333; border-radius: 4px; overflow: hidden;">
                <div style="width: ${expRate}%; height: 100%; background: #4caf50;"></div>
            </div>
            <div style="font-size: 0.8em; color: #666; margin-top: 2px;">专注累计: ${totalFocus}h</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
            <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; color: ${currentHP <= 30 ? '#ff5555' : '#55ff55'};">
                    <strong>❤️ HP</strong> <span>${currentHP}%</span>
                </div>
                <div style="height: 6px; background: #333; border-radius: 3px; overflow: hidden; margin-top: 4px;">
                    <div style="width: ${currentHP}%; height: 100%; background: ${currentHP <= 30 ? '#ff5555' : '#55ff55'};"></div>
                </div>
            </div>
            
            <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; color: #55aaff;">
                    <strong>🔵 MP</strong> <span>${currentMP}%</span>
                </div>
                <div style="height: 6px; background: #333; border-radius: 3px; overflow: hidden; margin-top: 4px;">
                    <div style="width: ${currentMP}%; height: 100%; background: #55aaff;"></div>
                </div>
            </div>
        </div>
        
        <hr style="border: 0.5px solid #333; margin: 15px 0;">
        
        <div style="display: flex; gap: 15px; font-size: 0.85em;">
            <a class="internal-link" href="Character Sheet-The Player" style="text-decoration: none; color: #aaa; border: 1px solid #444; padding: 4px 10px; border-radius: 6px;">🔼 属性分配</a>
            <a class="internal-link" href="Life OS 岁时记" style="text-decoration: none; color: #aaa; border: 1px solid #444; padding: 4px 10px; border-radius: 6px;">🧹 系统除尘</a>
        </div>
    </div>
    `;
} else {
    dv.paragraph("❌ 载入失败：请检查 Character Sheet-The Player 文件名");
}
```
## 🔴 The Forge
```dataview
TABLE WITHOUT ID
  file.link AS "🚀BATTLEFIELD",
  choice(priority = "P1", "🔴 P1", choice(priority = "P2", "🟡 P2", "🔵 P3")) AS "优先级",
  "<span style='font-family: monospace;'>" + 
  substring("🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩", 0, floor(length(filter(file.tasks, (t) => t.completed)) / length(file.tasks) * 10) * 2) + 
  substring("⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜", 0, (10 - floor(length(filter(file.tasks, (t) => t.completed)) / length(file.tasks) * 10)) * 2) + 
  " " + floor(length(filter(file.tasks, (t) => t.completed)) / length(file.tasks) * 100) + "%"
  + "</span>" AS "📊 进度",
  choice(
    deadline - date(today) < dur(0 days), "💀 已逾期",
    choice(deadline - date(today) < dur(3 days), "🔥 ", "⏳ ") + 
    floor((deadline - date(now)).hours) + "h " + 
    floor((deadline - date(now)).minutes % 60) + "m"
  ) AS "⏲️ DDL",
  length(filter(file.tasks, (t) => !t.completed)) + " 待办" AS "⚔️ 攻坚"
FROM "01_Maps/Active_Projects"
WHERE status = "active"
SORT priority ASC, deadline ASC
```
##  📊 The Flow Audit

``` dataview
TABLE WITHOUT ID
  link(file.name) AS "📅 日期",
  focus_hours + " h" AS "深度算力 (Focus)",
  energy_level AS "MP状态",
  choice(win_the_day, "🏆 胜利", "⚠️ 漂移") AS "系统判定",
  workout AS "肉体锻造",
  sleep_hour + " h" AS "休眠"
FROM "04_Journal"
WHERE date >= date(today) - dur(7 days)
SORT date DESC
```

---

## 🌾 Strategic Seeds
```dataview
LIST seeds
FROM #Daily
WHERE seeds != null
LIMIT 5
SORT file.name DESC
```







