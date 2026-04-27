# 👁️ The Prism System: 认知架构系统哲学 v3.0

> **核心公理（The Core Axioms）：**
> 
> 信息不是知识，拓扑结构才是。
> 
> 我们不再“分类存放”，我们只做“泛滥的链接”。
> 
> 意志力是不可靠的，只有系统是永恒的。
> 
> 这个目录结构不是仓库，它是我的作品集与外扩星系的展区。

## 🌌 系统架构图 (Constellation Architecture)

``` mermaid
graph TD
    %% 定义样式
    classDef kernel fill:#1A1A1A,stroke:#D97736,stroke-width:2px,color:#E9C46A;
    classDef action fill:#2b2b2b,stroke:#e53935,stroke-width:2px,color:#fff;
    classDef cosmos fill:#121213,stroke:#84A59D,stroke-width:2px,color:#fff;
    classDef stream fill:#1e1e1e,stroke:#555,stroke-width:2px,color:#ccc;
    classDef void fill:#000,stroke:#333,stroke-width:2px,color:#666;

    %% 节点定义
    WarRoom("⚔️ LifeOS War Room<br>(战况中枢/算力结算)"):::kernel
    Index("👁️ index.md<br>(观测站大门)"):::kernel
    Sys("00-HQ<br>(底层引擎/协议)"):::void
    Map("01-Atlas<br>(核心星系/永续资产)"):::cosmos
    Proj("02_Active_Projects<br>(锻造炉/交火战线)"):::action
    Jnl("04_Journal<br>(时间线/输入源)"):::stream
    Arc("99-Archive<br>(历史墓地)"):::void

    %% 流程连接
    Jnl -->|"1. 捕获流水 & 算力"| WarRoom
    WarRoom -->|"2. 锁定目标"| Proj
    Jnl -.->|"3. 灵感双链"| Map
    Proj -->|"4. 知识结晶 (Bricks/Seeds)"| Map
    Proj -->|"5. 完结倾倒"| Arc
    Sys -.->|"支撑运转"| WarRoom
    Map -.->|"展示"| Index

    %% 布局
    subgraph The Engine [算力与控制]
    WarRoom
    Sys
    end

    subgraph The Flow [时间与行动]
    Jnl
    Proj
    end

    subgraph The Universe [永恒资产]
    Map
    Index
    end
```



---

## 📂 空间总纲：极致降维的五大星区

为了彻底消灭视觉噪音与认知熵增，系统已进行“星系折叠”。所有的碎化概念（Bricks）与灵感（Seeds）全部收束于 `01-Atlas` 内部。

### 👁️ The Command Center —— 【中枢与大门】 (Global Files)

- **地位**：Root Access (全局视野)。
    
- **内容**：
    
    - `index.md`：对外的数字名片【作品集】，认知星系的观测站。
        
    - `LifeOS War Room.md`：对内的记录总区。自动抓取日记算力，动态显示项目进度。
        
- **心法**：这是每天清晨睁眼后、每晚闭眼前唯一需要凝视的屏幕。
    

### ⚙️ 00-HQ —— 【底层引擎】 (Kernel)

- **地位**：Hidden (绝对后台)。
    
- **隐喻**：物理法则 / 驱动程序。
    
- **内容**：包含所有的 AI 提示词（Protocols）、Dataview 脚本与模板。
    
- **心法**：它是网站网页上的“隐形人”，严禁任何前台知识资产混入此处。
    

### 🌌 01-Atlas —— 【核心星系】 (The Constellations)

- **地位**：Eternal (永恒资产)。
    
- **隐喻**：宇宙 / 知识结晶的最终归宿。
    
- **内容**：
    
    - **MOC 星系**：如 `OF PROUST`、`布拉德雷四重奏`、`教材自编系列`。
        
    - **子文件夹 `Bricks`**：打磨成熟的概念恒星。
        
    - **子文件夹 `Seeds`**：闪光的灵感星尘（随时准备被引力捕捉）。
        
- **心法**：这里没有时间，没有 Deadline。一切均通过 `[[ ]]` 双向链接网状交织。
    

### 🔥 02_Active_Projects —— 【锻造炉】 (The Forge)

- **地位**：Active (当前活跃)。
    
- **隐喻**：兵工厂 / 绞肉机。
    
- **内容**：带有明确 `status: active`、`progress` 和 `deadline` 的具体任务或文章。
    
- **心法**：这是“现在”。严禁堆积，同时交火的战线不得超过 5 条。完成即销毁。
    

### ⏱️ 04_Journal —— 【时间线】 (The Stream)

- **地位**：Input (唯一输入流)。
    
- **隐喻**：航海日志 / 矿区。
    
- **内容**：每日流水、情绪碎片、深加工时间（Focus Hours）的物理记录点。
    
- **心法**：绝对的“零阻力”输入区。不要在此处思考排版，只管倾泻。
    

### 🪦 99-Archive —— 【历史墓地】 (The Graveyard)

- **地位**：Dead (冷冻库)。
    
- **心法**：完成的项目残骸、被废弃的系统旧版本，一律扔进这里。不要让过去拖累现在。
    

---

## 🔄 二、运转飞轮：数据如何升维？

这套 Prism System 遵循极其冷酷的物理学定律：**低维数据输入，高维结构输出。**

### 1. 倾倒 (Capture) -> `04_Journal`

每天在日记里记录时间流逝和碎碎念。遇到任何值得留存的灵感，直接打上 `[[新概念]]` 的双链，让它自动在后台生成一个空壳节点。

### 2. 结算 (Audit) -> `LifeOS War Room`

夜间，将日记喂给 Chronos (AI)。把返回的算力数据和项目同步指令贴回系统。War Room 的雷达会自动更新你今天的生命值（MP）和战线推进情况。

### 3. 燃烧 (Forge) -> `02_Active_Projects`

根据 War Room 的指令，进入对应的项目中疯狂输出。在推进项目的过程中，把提炼出来的核心 SOP 或概念，抽取出来存入 `01-Atlas/Bricks`。

### 4. 升维 (Constellate) -> `01-Atlas`

当项目进度达到 100%，项目本体被扔进 `99-Archive` 销毁。但它产生的 `Bricks` 已经永远留在了 `01-Atlas` 的星空里，成为普鲁斯特或布拉德雷星系的一部分。

---

## ⛔ 三、系统最高防御协议 (SLA)

1. **引力优先原则**：能用 `[[双向链接]]` 解决的关联，绝不新建文件夹。
    
2. **战线清洁原则**：`02_Active_Projects` 中的停滞项目超过两周未推进，强制降级为 `Seeds` 或扔进冷库。
    
3. **双轨部署原则**：
    
    - **网页颜值（前台）**：使用 `npx quartz build` 更新数字花园展示。
        
    - **架构源码（后台）**：必须使用 GitHub Desktop 提交 `Commit` 并 `Push`，确保本地与云端物理结构 100% 吻合。
        

---

> _System Online v3.0. The Forge is hot. The Maps are expanding._
