# 📂 Strategic Seed Bank 

```dataview
TABLE WITHOUT ID
  link(file.link, file.name) as "📅 发现日期",
  seeds as "💡 灵感种子"
FROM #Daily
WHERE seeds != null
SORT file.name DESC
```
